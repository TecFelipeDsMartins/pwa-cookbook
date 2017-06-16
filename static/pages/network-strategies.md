<span class="requirements">Prérequis: connaissances sur les Service Workers et sur les caches navigateur</span>

Stratégies de gestion de réseau
================================

## Différentes situations de conditions réseau

On a tendance à oublier que la disponibilité du réseau n'est pas quelque-chose de binaire. En réalité, et particulièrement avec l'usage mobile, les conditions réseau peuvent beaucoup varier et présenter un caractère très incertain. On peut regrouper ces situations en trois catégories principales:
- **Faible signal**: l'appareil a connaissance de la mauvaise réception, qu'il s'agisse de Wi-Fi ou de réseaux mobiles. Il y a donc une faible bande-passante ainsi qu'un risque plus élevé d'échec de la requête.
- **Lie-Fi**: l'appareil affiche une connexion fonctionnelle et de bonne qualité, mais en pratique, aucune requête n'aboutit et reste bloquée sur de très longs timeouts. Ces cas de désinformation surviennent souvent à cause de problèmes de configuration réseau ou de matériel défaillant.
- **Déconnecté**: l'appareil ne trouve aucune connexion au réseau, ou les a désactivé (mode avion par exemple). Les requêtes sont immédiatement rejetées, et l'état offline est détectable en JavaScript sur les navigateurs le supportant.

## De la nécessité d'une couche de gestion de réseau

Ces situations de conditions réseau incertaines sont donc variées mais peuvent aussi passer de l'une à l'autre au cours d'une même session. 

Pour palier au problème de faible signal qui occasionne des temps de requêtes longs et irréguliers, la solution la plus directe est [la compensation de latence](#/pages/optimistic-ui). Son principe est simple mais la gestion d'erreurs peut vite se complexifier selon les cas: empilement des requêtes, relances à intervalles croissants, gestion des rollbacks et de la resynchronisation à la récupération de la connexion...

Dans le cas du Lie-Fi, les timeouts par défaut sont souvent insuffisants pour repérer le problème suffisamment rapidement pour ne pas trop perturber le scénario utilisateur. Il faut donc faire diagnostiquer l'état réseau par l'application elle-même, sur la base de ses propres contraintes de fonctionnement.
 
 Enfin, le passage de l'état connecté à déconnecté doit être géré de manière totalement fluide, sans rupture dans le scénario utilisateur autre qu'un simple feedback visuel. C'est typiquement quelque-chose qui doit être géré à un niveau global pour toute l'application.
 
 Pour toutes ces raisons, les PWA s'accompagnent souvent d'une **couche de gestion de réseau** qui vient s'intercaler entre la logique applicative et les requêtes AJAX. Codée en JavaScript au sein du bundle applicatif et des service workers enregistrés, elle joue le rôle de chef d'orchestre en détectant et en gérant de la manière la plus autonome possible les erreurs réseau, et en synchronisant les appels asynchrones de façon à ne pas fausser l'ordre d'exécution peu importe le timing des requêtes.
 
 ## Stratégies communes de gestion du cache
 
 Les codes suivants sont à mettre dans le service worker et utilisent ces fonctions utilitaires :
 
 ```javascript
 function fromNetwork(request) {
   return new Promise(function (resolve, reject) { 
     let timeoutId = setTimeout(reject, TIMEOUT); // Reject in case of timeout.
  
     fetch(request).then(response => {
       clearTimeout(timeoutId);
       resolve(response); // Fulfill in case of success.
     }, reject);  // Reject also if network fetch rejects.
   });
 }
 
 function fromCache(request) {
   return caches.open(CACHE) // Open the cache where the assets were stored
    .then(cache => cache.match(request) // search for the requested resource
    .then(match => match || Promise.reject('no-match')) // reject if not found
 }
 
 function updateCache(request) {
   return caches.open(CACHE) // Open the cache where the assets were stored
   .then(cache => fetch(request)) // fetch the network
   .then(response => cache.put(request, response)) // store response in cache
 }
 ```
 
 ### Cache en fallback
 
 Le Service Worker essaie dans un premier temps de récupérer le contenu depuis le réseau, mais si la requête prend trop de temps, il dessert la version en cache si disponible. 
 
 ```javascript
 self.addEventListener('fetch', event => event.respondWith(
   	 fromNetwork(event.request).catch(() => fromCache(event.request))     
 ));
 ```
 
  ### Cache et update
 
 Le Service Worker retourne directement la version en cache si disponible, mais requête le réseau en parallèle et met à jour ce cache lorsque la requête aboutit.
 
  ```javascript
self.addEventListener('fetch', function(event) {
    // answer immediately, without waiting for the network response
    event.respondWith(fromCache(event.request));
    // prevent the worker from being killed until the cache is updated
    event.waitUntil(updateCache(event.request)); 
});
  ```
 
  ### Cache, update et refresh
 
 Une variante de la stratégie précédente qui met à jour l'UI lorsque la requête réseau aboutit. Le rendu de la page est donc déclenché deux fois, ce qui prédispose cette stratégie aux frameworks utilisant un DOM virtuel pour limiter l'impact de ce nouveau rendu.
 
 ```javascript
 self.addEventListener('fetch', function(event) {
     event.respondWith(fromCache(event.request));
     event.waitUntil(updateCache(event.request).then(refresh)); 
 });

function refresh(response) {
    return self.clients.matchAll()
    .then(clients => clients.forEach(client => {
        // send a message to be handled by the client
        client.postMessage(JSON.stringify({ 
            type: 'refresh', 
            url: response.url 
        }))
    }))
}
```
 
### Precaching

Le Service Worker précharge l'ensemble des ressources à mettre en cache, listées dans un fichier JSON. C'est utile pour disposer immédiatement de l'ensemble du périmètre applicatif en mode offline, mais cela demande beaucoup de requêtes et de bande-passante dès le chargement de la première page.
 
```javascript
  self.addEventListener('install', function(event) {
  	event.waitUntil(Promise.all([
  		caches.open(CACHE),
  		fetch('files-to-cache.json').then(res => res.json())
  	]).then(([cache, files]) => cache.addAll(files)))
  })
```

## Stratégies communes de gestion des erreurs et relances

Les codes suivants sont à utiliser au sein du code applicatif. Il s'agit de traiter les erreurs de requête que les stratégies de cache du Service Worker n'ont pas suffit à régler. 

### Relance au choix de l'utilisateur

Cet exemple basique bloque l'utilisateur en cas d'erreur réseau et lui demande s'il souhaite relancer la requête en échec ou abandonner.

```javascript
function http(...args){
    return fetch(...args).catch(err => {
       	if(confirm(`La requête a échoué: ${err.message} ; Réessayer ?`))
       		return http(...args)
       	else throw err
    })
}
```

Cette boîte de dialogue bloquante est une solution très limitée et agaçante pour l'utilisateur, nous allons donc voir comment améliorer cela.

### Relance automatique avec délai progressif

Ici, les requêtes en échec sont automatiquement relancées en attendant un délai de plus en plus long entre chaque tentative. Dans cet exemple, ce délai s'étend indéfiniment, mais on peut bien sûr ajouter une condition d'arrêt qui rejette la Promise.

```javascript
const wait = time => new Promise(resolve => setTimeout(resolve, time));

function http(url, params, delay=1000){
    return fetch(url, params).catch(err => {
    	 // wait 1 second then increase the delay (fibonacci style)       	
       	return wait(delay).then(() => http(url, params, delay * 21/13))
    })
}
```

### Pile de requêtes en échec

Les deux startégies précédentes ne se soucient pas de l'ordre d'appel des callbacks. S'il est important de traiter les réponses dans l'ordre dans lequel les requêtes ont été effectué, on stocke les requêtes dans une file d'attente et on exécute chaque requête l'une après l'autre. En cas d'échec, on attend 5 secondes avant de réessayer la même requête.

```javascript
const requestQueue = [];

function http(...args){
	return new Promise(resolve => {
		requestQueue.push({ args, resolve }); // add to the queue
		if(requestQueue.length === 1) tryNextRequest() // try immediately if first
	})
}

function tryNextRequest(){
	let request = requestQueue[0]; // try first request in stack
	return request && fetch(...request.args).then(response => {
		request.resolve(response); // success, resolve http() promise
		requestQueue.shift(); // remove successful request from queue
		tryNextRequest() // try the next one in stack
	}).catch(err => wait(5000).then(tryNextRequest)) // fail, try again later
}
```

Cette stratégie convient bien aux modes offline plus complexes où on permet à l'utilisateur d'effectuer certaines actions qui dépendent d'actions précédentes n'ayant pas encore été traitées côté serveur: lorsque la connexion est retrouvée, il est alors essentiel de relancer ces requêtes dans l'ordre.

Comme améliorations, on peut remplacer le délai fixe par un délai progressif comme pour la solution précédente, ou encore détecter les doublons dans la file d'attente. A vous de consolider votre stratégie progressivement.

## Pour aller plus loin

D'autres stratégies avec le code commenté ont été mises à disposition par Mozilla sur [serviceworke.rs](http://serviceworke.rs)

---
[Les caches du navigateur](#/pages/cache-client)
[Les Service Workers](#/pages/service-workers)
[La compensation de latence](#/pages/optimistic-ui)

<span class="requirements">Prérequis: connaissances avancées en JavaScript, connaissances de base sur les échanges HTTP</span>

Usage hors ligne avec les Service Workers
===========================================



## Cache API

La mise en cache classique pilotée par le navigateur et par les headers HTTP `cache-control` et `expires` est toujours très utile, mais la marge de contrôle de ce cache par le développeur reste limitée. 

L'interface Cache de l'API ServiceWorker vient apporter une solution à ce problème, puisqu'elle donne la responsabilité au développeur d'implémenter les mécaniques de mise en cache et de mise à jour. Ce qui permet d'imaginer par la suite différentes [stratégies de gestion du cache réseau](#/pages/network-strategies).

Cette API permet de gérer plusieurs caches nommés spécifiques au domaine sur lequel est inscrit le Service Worker. Le nom du cache peut notamment être utilisé pour le *versionning*, afin de s'assurer que le contenu d'un cache est toujours exploitable après des modifications sur le code du Service Worker. 

Le contenu d'un cache est une collection de paires d'objets requête / réponse. A noter qu'il est possible de stocker plusieurs réponses pour une même requête dans un même cache. 

La [documentation de cette API peut être consultée sur le MDN](https://developer.mozilla.org/fr/docs/Web/API/Cache).

Voici un exemple d'utilisation classique de l'API Cache

```javascript
// à l'interception d'une requête réseau en partance du navigateur
this.addEventListener('fetch', function(event) {  
  	
  event.respondWith(
  	caches.match(event.request) // on cherche dans le cache
    .catch(() => fetch(event.request)) // non trouvé, on requête le réseau
    .then(response => {
      /* une réponse ne peut être lue qu'une seule fois,
     	 on doit donc la clôner pour la stocker en cache */
      const savedResponse = response.clone(); 
     
      // on stocke la réponse en cache pour les futurs appels
      caches.open('v1').then(cache => cache.put(event.request, savedResponse)); 
      
      return response
    })
    .catch(error => {
      // la requête réseau a échoué et le cache est indisponible      
    })
  )
});
```
### Limite de stockage de l'API Cache

Sur la plupart des navigateurs, la limite de stockage est la même que pour celles des caches de données : voir [la section correspondante](#/pages/data-cache)

---
[Stratégies de gestion de cache réseau](#/pages/network-strategies)
[De la nécessité d'une couche de gestion réseau](#/pages/network-management)

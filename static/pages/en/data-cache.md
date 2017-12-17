<span class="requirements">Prerequisite: Basic knowledge of Javascript</span>

# Caches on the client side

Web browsers have different Javascript APIs allowing to store data for a short or long duration, locally on the user's device. Using these caches is obviously essential in order to add offline to a PWA. In addition to that, caches can be used to optimize the application by avoiding redundant request and by implementing strategies for *latency compensation*.

## The different local storage APIs

All browser caches are isolated by browser, user account and domain name. It is not possible to interact with the cache of another domain or another browser. However, on the other hand, these caches are synchronized if different tabs for the same domain are opened.

### LocalStorage

The LocalStorage is a very simple but limited storage. It stores data using key-value pairs structure (associative table like a *hashmap*). Read and writes are performed synchronously. LocalStorage entries are persisted on the user's drive, without any expiration delay. 

```javascript
// fetch
const userPrefs = JSON.parse(localStorage.getItem('userPrefs')) || {};

// save
localStorage.setItem('userPrefs', JSON.stringify(userPrefs));
```

### SessionStorage

SessionStorage is an API which is very similar to LocalStorage with the exception that it stores data temporarily. The cache is in fact cleared when the browser is closed.

```javascript
sessionStorage.setItem('temporary', JSON.stringify(tempData));
```

### IndexedDB

This API provides a substitute to a database that is stored on the user's hard drive. It allows to perform selection requests in Javascript on structured data. It is event-based, works with *web workers* and *service workers*. It is largely [supported nowadays](http://caniuse.com/#feat=indexeddb).



Compte-tenu des bugs d'implémentation dans certains navigateurs, il est recommandé de passer par une bibliothèque servant de couche d'abstraction plutôt que d'utiliser directement l'API.

```javascript
// Avec la bibliothèque Dexie.js
const db = new Dexie('MyDatabase');

// Definition d'un schéma
db.version(1).stores({ friends: 'name, age' });

// Ouvre la base de données
db.open().catch(error => console.error('Oups: ' + error));

// Requête de recherche
db.friends
  .where('age').above(75)
  .each(friend => console.log(friend.name));    		

// Requête d'ajout
db.friends.add({ name: 'Camilla', age: 25 });
```

### Cache API

Dédié aux couples requêtes/réponses. Voir la section [Service Workers](service-workers.md)

## Combien peut-on stocker de données localement ?

La limite de stockage dans ces caches dépend de divers critères : le navigateur, le système d'exploitation, l'espace physique restant sur l'appareil... De plus, les navigateurs peuvent décider de supprimer tous les caches d'une origine lorsque cela s'avère nécessaire. Voici les règles identifiées en août 2016 pour les différents navigateurs, sachant qu'elles sont susceptibles d'évoluer à tout moment:
- **Chrome et Opera** : il y a un quota partagé par toutes les API de stockage et spécifique à chaque nom de domaine
- **Firefox** : il n'y a pas de limite, mais un message de confirmation est affiché à l'utilisateur au delà de 50 Mo
- **Safari Desktop** : illimité et message de confirmation après 5 Mo
- **Safari Mobile** : 50 Mo max
- **Internet Explorer 10+** : maximum 250 Mo avec confirmation à partir de 10 Mo
  
Il est possible de requêter le quota disponible et utilisé en JavaScript via la [Quota Management API](https://www.w3.org/TR/quota-api/) sur les navigateurs qui la supportent.
  
## Bibliothèques notables

- [Store.js](https://github.com/marcuswestin/store.js/) : un wrapper autour des diverses API de stockage simple (hors IndexedDB) ; il choisit le meilleur stockage parmi les disponibles sur le navigateur et fournit quelques nouvelles fonctionnalités (temps d'expiration, événements, opérations push/shift etc...)

- [Dexie.js](http://dexie.org/) : un wrapper minimaliste autour de IndexedDB qui fournit une API simplifiée et lisse les différences d'implémentation des navigateurs.

- [Lovefield](https://github.com/google/lovefield) : une base de données relationnelle sur navigateur maintenue par Google ; elle fournit une API proche de SQL par-dessus IndexedDB.

## Quel stockage utiliser et dans quelles circonstances ?

Pour stocker des ressources adressables par URL, utilisez un [Service Worker et la Cache API](service-workers.md)

Pour du stockage temporaire, le `sessionStorage` est adapté notamment pour décharger certaines informations que vous aviez l'habitude de faire transiter par cookies, et qui encombraient inutilement chaque requête. 

Enfin, pour les autres données dynamiques, cela dépend de leur volume et de leur complexité. S'il n'y en a pas beaucoup (moins de 500 Ko) et qu'elles sont sérialisables en JSON, le `localStorage` est le choix de la simplicité. 

Sinon, utiliser une bibliothèque autour de IndexedDB comme Dexie ou Lovefield vous fournira beaucoup plus de fonctionnalités pour chercher/trier des données. C'est par exemple utile quand la connexion est indisponible et que vous voulez reproduire côté client certaines requêtes normalement faites en back avec les données dont vous disposez localement. 
 
 ---
 
 [Mode hors-ligne et Service Workers](service-workers.md)

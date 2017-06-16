<span class="requirements">Prérequis: aucun</span>

Notifications Push
===================

Il est possible d'émettre des notifications Push en JavaScript, directement via l'application lorsque la page est ouverte, ou bien via un Service Worker enregistré pour votre application web afin d'émettre des notifications même quand le navigateur est fermé. Ces notifications sont multi-plateformes, elles s'adapteront donc à la plate-forme cible: notifications Android ou centre de notifications de Windows 10 par exemple.

## Bonnes pratiques et recommandations

L'usage de notifications peut vite devenir agaçant pour l'utilisateur, c'est pourquoi il convient de respecter certaines bonnes pratiques: 
- les notifications doivent être utiles et compréhensibles
- les notifications doivent être affichées aux moments adéquats, à une fréquence convenable
- l'utilisateur doit pouvoir les activer ou les désactiver via un contrôle dans l'application.
- l'utilisateur doit avoir passé un certain moment à naviguer sur l'application avant de demander l'autorisation d'émettre des notifications

## Notifications web
 
Ces notifications peuvent être émises via le code applicatif, lorsque le navigateur est ouvert et l'application web chargée.

### Permission de l'utilisateur

L'utilisateur doit autoriser les notifications pour le domaine donné avant que l'application ou le Service Worker soient en mesure d'émettre des notifications push.

```javascript
if (window.Notification && Notification.permission !== "granted") {
  Notification.requestPermission(function (status) {
    if (status === "granted") {
      // l'utilisateur a accepté, on peut désormais émettre des notifications
    }
  });
}
```

### Envoyer une notification web

Le constructeur `Notification` permet de créer simplement une notification avec un titre, une icône et un texte descriptif. Une fois créée, la notification sera immédiatement affichée.

```javascript
var notification = new Notification("Bonjour !", {
  lang : "fr", // langue de la notif (BCP 47 language tag).
  body : "Ceci est la description de ma notification",
  tag : "maNotif", // un identifiant pour récupérer la notification plus tard si besoin
  icon : "icon_url.png"
})
```

### Récupérer des évènements sur la notification

Il est possible de détecter en JavaScript quand une notification est affichée (`show`), fermée (`close`), cliquée (`click`) ou en erreur (`error`) :

```javascript
notification.addEventListener("click", function(){
  // l'utilisateur a cliqué sur la notification
}) 
```

## Notifications push via la Push API

https://developer.mozilla.org/en-US/docs/Web/API/Push_API
https://serviceworke.rs/web-push.html


---

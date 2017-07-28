<span class="requirements">Prérequis: connaissance du format JSON</span>

Manifeste d'application web
===========================

Le manifeste d'application est un simple fichier JSON contenant des métadonnées annexes de l'application qui sont utilisées par en améliorer l'intégration par les plates-formes. Pour lier un manifeste à une application, il suffit d'insérer le lien en HTML:

```html
<!-- à insérer dans <head> -->
<link rel="manifest" href="/manifest.json">	
```

Voici un exemple de fichier manifeste:

 <figure class="pull-right">
 	<img style="height: 400px" src="static/img/pwa-manifest-demo.jpg" alt="Résultat du manifeste sur Android">
 	<figcaption>Résultat du manifeste sur Android</figcaption>
 </figure>

```json
{
	"name": "Simple web app demo",
	"short_name": "Demo",
	"icons": [ 
		{ 
			"src": "icon-medium.png",
			"sizes": "96x96"
		}, { 
			"src": "icon-large.png", 
			"sizes": "192x192" 
		}
	],
	"theme_color": "#3F51B5",
	"background_color": "#F5F5F5",
	"display": "standalone",
	"orientation": "portrait",
	"start_url": "/simple-demo/?home=true"
}
```

L'existence d'un manifeste d'application est nécessaire pour pouvoir proposer l'installation de la PWA sur l'appareil. Comme vous pouvez le voir, le manifeste contient diverses information comme le nom, la couleur dominante, les icônes ou encore le mode d'orientation préféré pour l'application.

<figure>
<iframe style="width: 560px; height: 315px;" src="https://www.youtube.com/embed/P7hNedzAjuk" frameborder="0"></iframe>
<figcaption>Démonstration vidéo de l'installation d'une PWA sur Android</figcaption>
</figure>

## Liste des propriétés du manifeste

Le manifeste d'application est un standard évolutif et de nouvelles propriétés viennnent s'ajouter régulièrement. La [liste des propriétés actuellement utilisables peut être retrouvée sur le MDN](https://developer.mozilla.org/fr/docs/Web/Manifest).

## Générateur de manifeste

Pour vous aider à créer rapidement un manifeste pour votre application, il existe [ce générateur](http://www.pwabuilder.com/generator) qui préremplit certains champs et vous guide pour compléter les champs restants.

---

[Intégration avec les plates-formes](#pages/integration)

[Tester votre manifeste avec un outil d'audit](#/pages/audit-tools)

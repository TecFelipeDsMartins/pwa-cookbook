<span class="requirements">Prérequis: expérience avec les chaînes de build, les compilateurs et les minifieurs</span>

Réduire la taille de l'application
===================================

Pour atteindre les objectifs de performance (chargement initial sur un mobile bas de gamme en 3G en moins de 5 secondes), les PWA disposent très souvent d'un setup de build chargé d'empaqueter, optimiser et compresser toutes les dépendances. En sortie de ce processus, on trouve un petit nombre de fichiers paquets aussi appelés **bundles**. Le gain de performance est uniquement valable au premier chargement de l'application, ensuite la mise en cache par le Service Worker prend le relais et assure des chargements quasi-instantanés.

## Empaqueter les ressources avec Webpack

Il existe de nombreux outils et chaînes de build pour les projets front-end, mais l'un d'entre eux s'est imposé récemment comme le plus populaire et le plus complet : [Webpack](https://webpack.js.org/)

<figure>
	<img src="static/assets/webpack.svg" alt="Principe de fonctionnement de Webpack">
	<figcaption>Principe de fonctionnement de Webpack</figcaption>
</figure>

Webpack se distingue par sa polyvalence. Il permet en effet d'empaqueter toutes sortes de fichiers (JavaScript, CSS, images, templates...), là où auparavant il fallait composer soi-même un ensemble d'outils pour avoir un setup de build complet. Sa popularité lui a également permis de disposer d'un vaste écosystème de plugins tiers. Webpack est aujourd'hui utilisé et recommandé par la plupart des frameworks JavaScript : React, Vue, Angular...

````bash
./node_modules/.bin/webpack app/index.js dist/bundle.js

Hash: ff6c1d39b26f89b3b7bb
Version: webpack 2.2.0
Time: 385ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  544 kB       0  [emitted]  [big]  main
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} [built]
   [3] ./app/index.js 278 bytes {0} [built]
````

Si vous avez découplé votre code applicatif en utilisant les [modules ES2015](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/import) et `import` / `export`, Webpack est capable d'effectuer une analyse statique de votre arbre de dépendances et de regrouper le tout en un seul fichier tout en gérant l'ordre d'exécution et les duplicats.

Avec l'outil [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer), il est possible d'analyser a posteriori le contenu d'un bundle et la répartition en taille des différents modules afin d'identifier les modules trop lourds ou superflus.

<figure>
	<img src="static/assets/webpack-bundle-analyzer.gif" alt="Démonstration de l'outil webpack-bundle-analyzer">
	<figcaption>Démonstration de l'outil webpack-bundle-analyzer</figcaption>
</figure>

## Minifier JS et CSS

Webpack intègre par défaut un mode production (`-p`) qui exécute l'outil *UglifyJS* pour minifier le code JavaScript des bundles. C'est une manière très simple de réduire la taille de ces bundles en production.

Si vous souhaitez minifier du code à la norme ES6, ce que UglifyJS ne permet pas pour le moment, vous pouvez utiliser l'outil [babili](https://github.com/babel/babili), un minifieur modulaire basé sur Babel.

Concernant la minification du CSS, il existe [cssnano](http://cssnano.co/) qui est lui aussi modulaire et basé sur PostCSS. Tout comme babili, cet outil écrit en JavaScript s'intègre très bien avec Webpack.

## Activer `gzip`

[gzip](http://www.gnu.org/software/gzip/) est une autre amélioration essentielle pour optimiser la taille de vos bundles, à mettre en place côté serveur cette fois. Cet algorithme de compression remplace les  chaînes de caractères récurrentes dans vos fichiers par des pointeurs. Selon les fichiers, on peut observer des gains très significatifs : parfois moins de 70% de la taille originale en sortie.

## Transpilation et affinage par navigateurs ciblés
  
Il est aujourd'hui très courant de coder son application dans un langage ou une norme plus moderne comme TypeScript ou ES6+. Dans la chaîne de build, un outil appelé *transpilateur* compile le code source et le transforme en JavaScript exploitable par les navigateurs des utilisateurs.

Ces transpilateurs sont généralement configurés par défaut pour produire du code à la norme ES5, qui est bien supportée par la majorité des navigateurs depuis des années. Mais le support JavaScript s'améliore de jour en jour et plusieurs transformations ne sont probablement plus nécessaires pour le panel de navigateurs que vous voulez supporter.

[Babel](https://babeljs.io/), le transpilateur JavaScript le plus connu, a résolu ce problème en recommandant une nouvelle configuration qui s'adapte aux navigateurs ciblés : [`babel-preset-env`](https://github.com/babel/babel-preset-env). 

Dans cette configuration, il vous suffit de lister les navigateurs que vous devez supporter et Babel fera automatiquement le tri des fonctionnalités supportées ou non par l'ensemble de ces navigateurs, pour appliquer uniquement les transformations nécessaires. Cela se traduit par une augmentation des performances et une petite réduction de la taille des bundles.

````javascript
{ // .babelrc
  "presets": [
    ["env", { 
      "targets": { // Liste des environnements ciblés
        "browsers": [
        	"last 2 Chrome versions", // les deux dernières versions de Chrome
        	"Firefox ESR", // la dernière version à support allongé de Firefox
        	"ie >= 9", // Internet Explorer 9 et versions supérieures 
        	"> 1% in FR" // tous les navigateurs à plus de 1% de PDM en France
        ]
      }
    }]
  ]
}
````

Il existe une mécanique similaire pour les feuilles de style avec [Autoprefixer](https://github.com/postcss/autoprefixer) et [doiuse](https://github.com/anandthakker/doiuse), deux outils PostCSS qui reçoivent la même configuration que `babel-preset-env`.

# Images: compression et Data URL

Les images sont souvent les ressources les plus lourdes à télécharger dans un site web, mais on dispose aujourd'hui d'excellents algorithmes de compression. 

Vous pouvez compresser manuellement chacune de vos images, ou utiliser un outil à la chaîne de build tel que [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) qui utilise `imagemin` pour minifier PNG, JPEF, GIF et SVG.

Dans le cas des petites images telles que les pictogrammes, il peut être intéressant de remplacer l'URL vers l'image par le code de cette image sous forme de Data URL. Cela réduit le nombre de requêtes HTTP à effectuer et vous prémunit des éventuelles erreurs de chargement. Le plug-in Webpack [url-loader](https://webpack.js.org/loaders/url-loader/) sert justement à ça et remplacera automatiquement les URL vers de petites images par une Data URL, en dessous d'une certaine taille limite.

# Code splitting: découpe intelligente des bundles

Empaqueter l'intégralité du code applicatif dans un seul bundle n'est pas forcément la meilleure idée. Cela peut donner un bundle très lourd qui bloque le chargement initial de l'application.

Webpack dispose d'une fonctionnalité très appréciée de *code splitting*. Elle permet de produire un ensemble de bundles qui peuvent être chargés à la demande indépendamment l'un de l'autre: pour une certaine route ou suite à un certain évènement utilisateur par exemple.

Il existe des outils faisant automatiquement cette découpe en sous-bundles, mais le faire manuellement et explicitement donne toujours les meilleurs résultats. Des [guides très complets](https://webpack.js.org/guides/code-splitting/) sont disponibles dans la documentation officielle de Webpack pour mettre en place cette fonctionnalité. 

La recommandation est d'éviter les bundles dépassant les 500 Ko.

## Template de configuration Webpack

Voici un exemple de configuration incluant toutes les techniques évoquées ci-dessus (à l'exception de `gzip` qui est à paramétrer côté serveur)

//TODO

---
[Utiliser le cache client](#pages/cache-client)
[Service Workers](#/pages/service-workers)

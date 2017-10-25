<span class="requirements">Prérequis: aucun</span>

L'offre PWA au sein des frameworks web client
==============================================

Addy Osmani a consacré un talk à ce sujet à la Google IO 2017 : 
[Production Progressive Web Apps With JavaScript Frameworks](https://www.youtube.com/watch?v=aCMbSyngXB4)

## React: [create-react-app](https://github.com/facebookincubator/create-react-app)

Les équipes de Facebook ont souvent eu une longueur d'avance en ce qui concerne la conception de Progressive Web Apps avec leur framework React. Ce choix est une valeur sûre mais React s'adresse aux développeurs JavaScript expérimentés et initiés à la programmation réactive fonctionnelle.

Cet outil permettant de démarrer très rapidement un projet React avec tout l'outillage adéquat propose depuis sa version 1.0 une expérience PWA par défaut. Cela comprend notamment un manifeste d'application autogénéré et un Service Worker proposant une stratégie de cache Offline-First.

Pour une solution avec rendu côté serveur, [Next.js](https://learnnextjs.com/) de Zeit est l'option la plus populaire et la plus simple à appréhender. L'équipe souhaite à l'instar de create-react-app proposer une approche Offline-First par défaut. Cela devrait se concrétiser dans la version 3.0 du framework.

## Preact: [Preact CLI](https://github.com/developit/preact-cli)

Preact est une alternative à React beaucoup plus légère (3kb) et basée sur la même API, ce qui permet de réutiliser une bonne partie de l'écosystème et de l'outillage associé à React. Sa faible taille le rend particulièrement bien adapté à l'usage mobile, et son nouvel outil en ligne de commande permet de démarrer en 30 secondes une PWA Preact avec directement un [score de 100/100 sur Lighthouse](https://googlechrome.github.io/lighthouse/viewer/?gist=142af6838482417af741d966e7804346). 
A recommander aux développeurs React souhaitant encore aller plus loin dans l'optimisation et la simplification de leur outillage. 

## Vue.js: [Template PWA](https://github.com/vuejs-templates/pwa)

Vue.js est un framework beaucoup plus facile d'accès comparé à React et Angular. Il copie les meilleures fonctionnalités des frameworks concurrents pour les regrouper dans une solution simple et minimaliste, mais suffisamment modulaire et flexible pour s'adapter aux usages avancés. Vue.js est à conseiller aux débutants et à ceux qui veulent rapidement un résultat, pour la réalisation de preuves de concept par exemple.

Pour démarrer facilement un projet Vue, [divers templates](https://github.com/vuejs-templates) de projet sont proposés via l'outil en ligne de commande `vue-cli`. Le template PWA comme son nom l'indique est dédié aux Progressive Web Apps et a pour but d'automatiser pour vous la mise en place d'un maximum des fonctionnalités propres aux PWA.

De la même manière que Next.js apporte le rendu côté serveur à React, il existe [Nuxt pour Vue](https://nuxtjs.org/) qui propose quasiment les mêmes fonctionnalités et la même approche. Sébastien et Alexandre Chopin, les deux frères français à l'origine de Nuxt, ont fait savoir leur fort intérêt pour les PWA et veulent proposer une expérience Offline-ready par défaut pour tous les projets Nuxt. 

## [Angular Mobile Toolkit](https://mobile.angular.io/)

Google est un acteur majeur dans le domaine des PWA, il n'est donc pas étonnant que l'équipe Angular ait montré de l'intérêt pour le sujet. Si le rendu côté serveur a été évoqué très tôt dans la roadmap du framework, l'usage offline ne fait pas encore partie des fonctionnalités de base proposées par le framework. 

L'offre Angular est un peu plus complexe à décrypter concernant les PWA. Le projet [Angular Mobile Toolkit](https://mobile.angular.io/), actuellement en beta, est ce qui se rapproche le plus d'un setup dédié PWA pour Angular. Mais ils ont curieusement fait ce choix de se focaliser sur le mobile. Même si les besoins en performance et fiabilité réseau se font particulièrement ressentir pour l'usage mobile, et que Android est la plate-forme proposant l'intégration la plus avancée à ce jour pour les PWA, ces dernières n'ont jamais eu vocation à être réservées au mobile. Il convient donc de prendre du recul avant de partir sur cette solution, d'autant que Angular est adapté aux projets de grande envergure.
  
Concernant le rendu côté serveur, le projet [Angular Universal](https://universal.angular.io/) a été intégré à Angular 4.0 et propose une API dédiée au SSR. On peut donc ajouter cette fonctionnalité à tous les projets Angular à partir de cette version, sous réserve que les composants utilisés ne requièrent pas d'API propres aux navigateurs (`window`, `document`, `navigator`...)

A noter que l'équipe de Polymer, un autre framework JS made-in Google, a été très proactive récemment sur le sujet des PWA. Cela peut aussi être une option à envisager, bien que le cadre d'utilisation de Polymer est plus restreint que celui d'autres frameworks généralistes.

---

[Outillage d'audit qualité](audit-tools.md)

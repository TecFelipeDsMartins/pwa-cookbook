<span class="requirements">Prerequisites: basic knowledge about Web languages</span>

# Progressive enhancement

The word *Progressive* in *Progressive Web Apps* is a reference to the **Progressive Enhancement** strategy. over time, this term has gained a wider meaning in the same way that *Responsive* is nowadays used in contexts other than the *Responsive Web Design*.

The objective of this strategy is to make the content and the services accessible to a every audience. In fact, in order to exploit all their potential, PWA resort to diverse technologies and recent API that are only available on recent versions of web browsers. But, the most important aspect of the Web that makes PWA interesting is its **universality** and being open to the largest group of connected users: the internet users.

This is why **it is essential to not discriminate the users and to not introduce a technological break**: all the users no matter what browser they use and their degree of software and hardware obsolescence.

C'est pourquoi **il est essentiel de ne pas discriminer les utilisateurs et d'introduire une fracture technologique**: tous les internautes peu importe leur navigateur et leur dégré d'obscolescence logicielle et matérielle devraient être en mesure d'utiliser le service et d'exploiter le contenu fourni par une PWA.

Contrairement à l'approche dite de dégradation élégante (**Graceful Degradation**), l'amélioration progressive est dite *bottom-up*: on développe par couches successives en commençant par le socle le plus basique et universel, puis en ajoutant progressivement des couches plus complexes, spécifiques et restrictives.

On peut déjà identifier trois couches principales, intimement liées à l'histoire du Web et à ses langages fondamentaux:
- la **couche sémantique (HTML)** : elle permet de décrire et de hiérarchiser le contenu textuel et média de l'application. Le point d'attention à avoir sur cette couche, et souvent négligé, est celui de l'[accessibilité](http://www.accessiweb.org/). Une bonne sémantique est primordiale pour l'accès aux personnes handicapées, mais également pour la consommation du contenu par des agents externes, robots et moteurs d'indexation.
- la **couche visuelle (CSS)** : une fois le contenu décrit, on peut travailler à son agencement, à la lisibilité et et à l'ergonomie de l'application. Il s'agit également d'optimiser l'affichage selon le contexte utilisateur (taille d'écran, orientation, contexte d'utilisation, environnement...) ; ce sont les principes du [Responsive Web Design](https://developers.google.com/web/fundamentals/design-and-ui/responsive/).
- la **couche interactive (JavaScript)** : cette couche particulièrement travaillée dans le cadre des PWA décrit la logique applicative et les comportements face aux évènements utilisateur et système. JavaScript offre beaucoup d'informations sur l'utilisateur et son appareil, ce qui permet d'aller très loin dans l'adaptation, l'optimisation et la personnalisation du service spécifiquement pour ce client.

<figure>
	<img src="../img/progressive-enhancement.jpg" alt="Les trois couches de l'amélioration progressive dans un bonbon M&M's">
	<figcaption>Une représentation imagée des trois couches de l'amélioration progressive</figcaption>
</figure>

 Pour chaque couche, il est nécessaire de tenir compte de l'évolution des langages associés et de fournir des versions alternatives ou dégradées lorsque certaines fonctionnalités ne sont pas supportées. On peut se servir de [polyfills](https://fr.wikipedia.org/wiki/Polyfill) lorsque c'est techniquement possible, ou sinon avoir recours à des solutions de contournement (fallbacks). Des sites tels que [HTML5Please](http://html5please.com/) ou [CanIUse](http://caniuse.com/) répertorient les statistiques de support et les solutions alternatives existantes.
 
 Même si les PWA ne suivent pas toutes une approche stricte de l'amélioration progressive, notamment sur la question de l'indépendance vis-à-vis de JavaScript, cette méthodologie de conception a largement influencé les spécifications et fonctionnalités qui s'articulent autour des PWA, d'où le P pour "Progressive".
 
-----------------------------------------------------

[Qu'est-ce qu'une PWA ?](pwa.md)

[Outillage d'audit](audit-tools.md)

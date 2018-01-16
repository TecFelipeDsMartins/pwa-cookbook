<span class="requirements">Prerequisites: basic knowledge about Web languages</span>

# Progressive enhancement

The word *Progressive* in *Progressive Web Apps* is a reference to the **Progressive Enhancement** strategy. over time, this term has gained a wider meaning in the same way that *Responsive* is nowadays used in contexts other than the *Responsive Web Design*.

The objective of this strategy is to make the content and the services accessible to a every audience. In fact, in order to exploit all their potential, PWA resort to diverse technologies and recent API that are only available on recent versions of web browsers. But, the most important aspect of the Web that makes PWA interesting is its **universality** and being open to the largest group of connected users: the internet users.

This is why **it is essential to not discriminate the users and to not introduce a technological break**: all the users no matter what browser they use and their degree of software and hardware obsolescence must be able to both use services and to exploit the content provided by the PWA.

Unlike **Graceful Degradation**, progressive enhancement is said to be a *bottom-up* strategy. This means that we develop the different layers one by one starting with the most basic and universal, and then we progressively add more complex layers, which are more specific and restrictive.

We can already identify three main layers, initially linked to the history of the web and its fundamental languages:

- The **semantic layer (HTML)**: it allows to describe and to describe the textual and media content of the application and define its hierarchy. We'd like to draw your attention on a matter which is often neglected in this layer: it is the [accessibility](http://www.accessiweb.org/). Good semantics are essential for disabled people, but also for consuming content from external agents, robots and search engines.
- The **visual layer (CSS)**: once the content has been described, we can work on its layout and the readability and the usability of the app. This layer consists also in optimizing the display depending on the user context (screen size, orientation, environment, device...). These principles are defined as the [Responsive Web Design](https://developers.google.com/web/fundamentals/design-and-ui/responsive/).
- The **interactive layer (Javascript)**: this layer which is used a lot in PWA describes the application logic and the behaviors in reaction to the user and system events. Because javaScript provides a lot information on the user and his device, this allows to go very far in the adaptation, the optimization and the customization of the services specifically for each client.

<figure>
	<img src="../img/progressive-enhancement.jpg" alt="Les trois couches de l'amélioration progressive dans un bonbon M&M's">
	<figcaption>A representation of the three layers of progressive enhancement</figcaption>
</figure>

 Pour chaque couche, il est nécessaire de tenir compte de l'évolution des langages associés et de fournir des versions alternatives ou dégradées lorsque certaines fonctionnalités ne sont pas supportées. On peut se servir de [polyfills](https://fr.wikipedia.org/wiki/Polyfill) lorsque c'est techniquement possible, ou sinon avoir recours à des solutions de contournement (fallbacks). Des sites tels que [HTML5Please](http://html5please.com/) ou [CanIUse](http://caniuse.com/) répertorient les statistiques de support et les solutions alternatives existantes.
 
 Même si les PWA ne suivent pas toutes une approche stricte de l'amélioration progressive, notamment sur la question de l'indépendance vis-à-vis de JavaScript, cette méthodologie de conception a largement influencé les spécifications et fonctionnalités qui s'articulent autour des PWA, d'où le P pour "Progressive".
 
-----------------------------------------------------

[Qu'est-ce qu'une PWA ?](pwa.md)

[Outillage d'audit](audit-tools.md)

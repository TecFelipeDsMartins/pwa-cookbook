<span class="requirements">Prerequisites: none</span>

# PWA features in popular JS frameworks

Addy Osmani gave a talk on this subject during Google IO 2017:

[Production Progressive Web Apps With JavaScript Frameworks](https://www.youtube.com/watch?v=aCMbSyngXB4)

## React: [create-react-app](https://github.com/facebookincubator/create-react-app)

Facebook teams are often ahead of the field regarding PWA development with their React framework. This choice is a safe bet but React is used at its best in the hands of experienced Javascript developers who have some knowledge of functional reactive programming.

This framework provides a tool that allows to very quickly setup a React project. Since its version 1.0, this tool provides a PWA experience by default. This notably includes an auto generated app manifest and a Service Worker configured with an offline-first cache strategy.

On the server side, [Next.js](https://learnnextjs.com/) from Zeit is the most popular option and the simplest to apprehend. Following the example of create-react-app, the team wishes to offer an offline-first approach by default. However, It is not yet the case for the version 4.3.0 which is the latest version at the time of writing.

## Preact: [Preact CLI](https://github.com/developit/preact-cli)

Preact is a lightweight alternative (3kb) to React and is baed on the same API, making it very simple to reuse the ecosystem and the tooling associated with React. Its small size makes it particularly well suited for mobiles. In addition to that, its new CLI tool allows to start in 30 seconds a Preact PWA which has a [score of 100/100 on Lighthouse](https://googlechrome.github.io/lighthouse/viewer/?gist=142af6838482417af741d966e7804346).

We recommend it to React developers who want to further optimize and simplify their tooling.

## Vue.js: [PWA Template](https://github.com/vuejs-templates/pwa)

Vue.js is a framework which is more accessible than React and Angular. It takes the best features from concurrent frameworks and merges them into a simple and minimalist solution which is modular and flexible enough to adapt to advanced uses. Vue.js is recommended for beginners and for those who quickly want to get results; such as a POC.

To easily initiate a Vue project, [many templates](https://github.com/vuejs-templates) are made available via the `vue-cli` CLI tool. The PWA template - as its name implies - is dedicated to Progressive Web Apps. Its goal is to help us automate, as much as possible, the setup of PWA features.

In the same way that `Next.js` brings server side rendering to React, [Nuxt for Vue](https://nuxtjs.org/) offers practically the same features and the same approach. Sébastien and Alexandre Chopin, the two brothers behind Nuxt, have announced their interest for PWA and want to offer an offline-ready experience by default on Nuxt projects.

## [Angular Mobile Toolkit](https://mobile.angular.io/)

Google is a major player in PWA, therefore, it is not surprising that the Angluar team showed its interest on the subject. If the server side rendering has appeared very early on the framework's road map, offline feature is not yet natively available in the framework.

Angluar is more complex to decrypt with regard to PWA. The [Angular Mobile Toolkit](https://github.com/angular/mobile-toolkit) project, which is actually in beta, is the closest that we can get to an Angluar PWA setup. unfortunately, they strangely decided to focus on mobile. In fact, even if network quality and processing performance are particularly felt on mobile platforms, and adding the fact that Android is the most advanced PWA platform to this day, PWA were never intended to be mobile only. Thus, it is advised to step back and think this through, especially since Angular is designed for large scale projects.

On the server side, the [Angular Universal](https://universal.angular.io/) project has been incorporated into Angular 4.0 and presents and API dedicated to server side rendering (SSR). We can therefore add this feature to any Angular 4.0+ project, provided that the used components do not require browser specific APIs (`window`, `document`, `navigator`...)

## [Polymer](https://news.polymer-project.org/list/top_stories)

It is to be noted that the team behind Polymer, another JS framework made by Google, is very proactive on PWA. This can also be an option to consider, even though it has more restricted usage possibilities than other generalist frameworks.

---

[Audit tools](audit-tools.md)

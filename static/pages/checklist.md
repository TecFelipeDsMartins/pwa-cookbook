<span class="requirements">Prérequis: survol de toutes les sections précédentes</span>

La check-list des PWA
======================

Un récapitulatif de toutes les actions et fonctionnalités à mettre en place pour une bonne Progressive Web Application, triées par priorité:

## Priorité 1 - Essentiel
- Un [manifeste d'application web](#/pages/manifest) est présent
- L' application et toutes ses ressources sont servies en HTTPS
- L' application a un design responsive adapté à l'usage mobile
- La page d'accueil se charge en hors-connexion grâce à un [Service Worker](#pages/service-workers)
- L' application est testée sur Chrome, Edge, Firefox et Safari

## Priorité 2 - Important
- Chaque page de l'application a sa propre URL, indexable et accessible depuis un nouvel onglet
- Le chargement initial sur un mobile bas de gamme en 3G prend moins de 5 secondes
- Les transitions de page ne sont pas bloquantes, il y a un feedback immédiat même avec les connexions lentes
- L' application fonctionne sur des navigateurs plus anciens (IE 11, Firefox 3), à défaut dans un mode dégradé.
- La navigation est possible en hors-connexion sur tout ou une partie du contenu.

## Priorité 3 - Potentiellement intéressant
- L'application propose des notifications push lorsque c'est pertinent. Ces notifications suivent [les bonnes pratiques](#pages/push-notifications).
- Le CSS critique à l'affichage initial est extrait et ajouté en *inline* dans le HTML du document
- Le contenu applicatif est correctement indexé sur toutes les pages. Utilisez l'outil [Fetch As Google](https://support.google.com/webmasters/answer/6066468) pour le vérifier.
- La navigation par les boutons Précédent / Suivant conserve la position du scroll de l'utilisateur
- Il n'y a pas de tressautements à l'affichage liés aux chargements de contenu (images, AJAX etc.)
- L' application est pleinement utilisable en mode fullscreen

## Priorité 4 - Facultatif
- L' affichage de l'écran "Add to Screen" est intercepté pour être reporté à un moment plus adéquat pour l'utilisateur, selon ses actions en cours. 
- L' application informe l'utilisateur s'il a perdu sa connexion
- Les [métadonnées Schema.org](https://schema.org/) sont renseignées pour une meilleure indexation par les moteurs de recherche
- Des métadonnées destinées aux réseaux sociaux sont fournies quand cela est approprié.
- La gestion de l'historique se fait via la [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- L' inscription et le login se font via la [Credential Management API](https://developers.google.com/web/fundamentals/security/credential-management/)
- Les paiements se font via la [Payment Request API](https://developers.google.com/web/fundamentals/discovery-and-monetization/payment-request/)

 ---
 [Outillage d'audit](#/pages/audit-tools)

<script>
[].forEach.call(document.querySelectorAll("#main .content li"), function(li){
    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = li.textContent
                 .slice(0,50)
                 .replace(/\s/g,"_")
                 .replace(/[^[\w]/g, "");
    cb.checked = localStorage.getItem(cb.value) === "true"
    cb.addEventListener("change", function(){
        localStorage.setItem(cb.value, cb.checked.toString());
    });
	li.insertBefore(cb, li.firstChild);
});
</script>

<style>
#main .content ul {
	padding-left:0;
}

#main .content li {
    list-style: none;
}

#main .content li input[type="checkbox"] {
	margin-right: 1em;	
}

</style>

import CheckListPage from "./components/pages/CheckListPage.vue";
import ExamplesPage from "./components/pages/ExamplesPage.vue";

export const pages = {
	chapters: [
		{
			title: "Introduction",
			sections: [
				{
					title: "A propos de ce cookbook",
					link: "a-propos",
					keywords: "support;auteurs;a propos;aide;question;source;info"
				},
				{
					title: "Qu'est-ce qu'une PWA ?",
					link: "pwa",
					keywords: "pwa;progressive;webapp;kesako;quoi"
				},
				{
					title: "Exemples de PWA",
					link: "examples",
					keywords: "pwa;exemples;démo;client;poc",
					component: ExamplesPage
				},
				{
					title: "Amélioration Progressive",
					link: "progressive-enhancement",
					keywords: "progressive;démarche;approche;stratégie;amélioration"
				},
			]
		},
		{
			title: "Connectivité",
			sections: [
				{
					title: "Réduire la taille de l'application",
					link: "optimisation-bundle",
					keywords:"optimiser;réduire;bundle;taille;lourd;minif;bande-passante;débit"
				},
				{
					title: "Utiliser efficacement le cache client",
					link: "cache-client",
					keywords:"optimiser;économiser;cache;storage;client;enregistrer;bande-passante;débit"
				},
				{
					title: "Usage hors-ligne et Service Workers",
					link: "service-workers",
					keywords:"offline;hors-ligne;service;workers;déconnecté;background;mode;connexion"
				}
			]
		},
		{
			title: "Engagement utilisateur",
			sections: [
				{
					title: "Intégration avec les plates-formes",
					link: "integration",
					keywords:"intégration;mobile;application;installation;notification;engagement;publicité;store;appstore"
				},
				{
					title: "Manifeste Web App",
					link: "manifest",
					keywords:"manifeste;recherche;référencement;mobile;engagement"
				},
				{
					title: "SEO: Optimiser le référencement",
					link: "seo",
					keywords:"seo;recherche;indexation;moteur;lien;référencement"
				},
				{
					title: "Notifications Push",
					link: "push-notifications",
					keywords:"notification;push;engagement;publicité"
				},
			]
		},
		{
			title: "Audit qualité",
			sections: [
				{
					title: "Check-list d'une PWA",
					link: "checklist",
					keywords:"checklist;liste;critères;contraintes;consignes;requirements;obligations;besoins:exigences",
					component: CheckListPage
				},
				{
					title: "Outillage d'audit",
					link: "audit-tools",
					keywords:"outillage;audit;vérifier;contrôler;lighthouse"
				}
			]
		}
	]
};

export const sections = pages.chapters.reduce(
	(sections, chapters) => {
		sections.push(...chapters.sections);
		return sections;
	}
, []);

export function getSectionByLink(link){
	return sections.find(section => section.link === link)
}

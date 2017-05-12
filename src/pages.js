const pages = {
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
					keywords: "pwa;progressive;webapp;kesako;quoi;intro;concept"
				},
				{
					title: "Exemples de PWA",
					link: "examples",
					keywords: "pwa;exemples;démo;client;poc;test;essayer"
				},

			]
		},
		{
			title: "Méthodologie",
			sections: [
				{
					title: "Amélioration Progressive",
					link: "progressive-enhancement",
					keywords: "progressive;démarche;approche;stratégie;amélioration"
				},
				{
					title: "Compensation de latence",
					link: "optimistic-ui",
					keywords: "optimis;timeout;latence;réseau;requête;AJAX;state;méthodo"
				},
				{
					title: "Stratégies de gestion de réseau",
					link: "network-strategies",
					keywords: "réseau;network;cache;requête;AJAX;approche;stratégie;offline;hors-ligne"
				},
			]
		},
		{
			title: "Connectivité",
			sections: [
				{
					title: "Réduire la taille de l'application",
					link: "optimisation-bundle",
					keywords:"optimiser;réduire;bundle;paquet;charge;perf;taille;lourd;minif;débit"
				},
				{
					title: "Utiliser efficacement le cache client",
					link: "cache-client",
					keywords:"optimiser;économiser;cache;storage;client;enregistrer;débit"
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
					keywords:"intégration;mobile;application;installation;notification;engagement;publicité;store;plate-forme"
				},
				{
					title: "Manifeste Web App",
					link: "manifest",
					keywords:"manifeste;recherche;référencement;mobile;engagement;méta"
				},
				{
					title: "SEO: Optimiser le référencement",
					link: "seo",
					keywords:"seo;recherche;indexation;moteur;lien;référencement;google"
				},
				{
					title: "Notifications Push",
					link: "push-notifications",
					keywords:"notification;push;engagement;publicité;natif"
				},
			]
		},
		{
			title: "Audit qualité",
			sections: [
				{
					title: "Check-list d'une PWA",
					link: "checklist",
					keywords:"checklist;liste;critères;contraintes;consignes;requirements;obligations;besoins:exigences"
				},
				{
					title: "Outillage d'audit",
					link: "audit-tools",
					keywords:"outillage;outils;audit;vérifier;contrôler;lighthouse;qualité"
				}
			]
		}
	]
};

const sections = pages.chapters.reduce(
	(sections, chapters) => {
		sections.push(...chapters.sections);
		return sections;
	}
, []);

function getSectionByLink(link){
	return sections.find(section => section.link === link)
}

module.exports = { sections, pages, getSectionByLink };

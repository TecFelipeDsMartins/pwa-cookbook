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
				}
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

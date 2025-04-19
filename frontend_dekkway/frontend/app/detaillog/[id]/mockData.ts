// Données mockées pour le test local
export const mockLogement = {
  type: "Appartement",
  description: "Magnifique appartement moderne avec vue panoramique sur la ville. Entièrement rénové avec des finitions haut de gamme. Cuisine équipée, salon spacieux et chambres confortables.",
  region: "Dakar",
  quartier: "Almadies",
  prix: "450000",
  nombre_de_chambres: 3,
  equipements: {
    "Climatiseur": true,
    "Wifi": true,
    "Piscine": true,
    "Parking": true,
    "Sécurité": true
  },
  latitude: 14.7167,
  longitude: -17.4677,
  medias: [
    {
      fichier: "/images/maison.jpg",
      type: "image",
      date_ajout: "2024-01-15"
    },
    {
      fichier: "public/images/maison1.jpg",
      type: "image",
      date_ajout: "2024-01-15"
    },
    {
      fichier: "public/images/visite.mp4",
      type: "video",
      date_ajout: "2024-01-15"
    }
  ],
  agent: {
    nom: "Diallo",
    prenom: "Fatou",
    photo_profil: "/images/agent.jpg",
    telephone: "+221 77 123 45 67"
  },
  salons: 1,
  cuisines: 1,
  salles_de_bain: 2,
  garage: true,
  adresse: "123 Avenue des Almadies"
};
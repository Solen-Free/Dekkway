// app/api/Logement/route.ts
import { NextResponse } from 'next/server';

interface SearchFilters {
  location?: string;
  prix_min?: number;
  prix_max?: number;
  equipements?: string[];
  keywords: string[];
  chambres?: number;
  type?: string;
}

const mockLogements = [
  {
    id: "1",
    type: "maison",
    prix: 350000,
    nombre_de_chambres: 3,
    equipements: "piscine:true,climatisation:true",
    region: "Thies",
    banniere: "/images/maison.jpg",
    titre: "Belle maison à Thiès",
    quartier: "Grand-Standing, Thiès",
  },
  {
    id: "2",
    type: "appartement",
    prix: 400000,
    nombre_de_chambres: 2,
    equipements: "garage:true,climatiseur:true",
    region: "Dakar",
    banniere: "/images/maison1.jpg",
    titre: "Bel appart",
    quartier: "Yoff, Dakar",
  },
];

function removeDiacritics(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function parseNaturalSearch(searchQuery: string): SearchFilters {
  const normalizedQuery = removeDiacritics(searchQuery);
  const filters: SearchFilters = {
    keywords: [],
  };

  let remainingQuery = normalizedQuery.toLowerCase();

  // 0. Extraction du type de logement
  const typeRegex = /(maison|appartement|studio|villa|chambre)s?\b/i;
  const typeMatch = remainingQuery.match(typeRegex);
  if (typeMatch) {
    filters.type = typeMatch[1].toLowerCase();
    remainingQuery = remainingQuery.replace(typeMatch[0], '');
  }

  // 1. Extraction de la localisation
  const locationRegex = /(?:\s+(?:à|a|au|dans|sur|à la|aux|chez|près de|proche de|à côté de)\s+|\s+)([\w\s-]+)(?:,|$)/i;
  const locationMatch = remainingQuery.match(locationRegex);
  if (locationMatch) {
    filters.location = removeDiacritics(locationMatch[1].trim().toLowerCase());
    remainingQuery = remainingQuery.replace(locationMatch[0], '');
  }

  // 2. Extraction des chambres
  const numberWords: { [key: string]: number } = {
    un: 1, une: 1, deux: 2, trois: 3, quatre: 4,
    cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10
  };

  const chambresMatch = remainingQuery.match(/(\d+|une?|deux|trois|quatre|cinq|six|sept|huit|neuf|dix)\s+chambres?/i);
  if (chambresMatch) {
    const nombre = isNaN(Number(chambresMatch[1]))
      ? numberWords[chambresMatch[1].toLowerCase()]
      : parseInt(chambresMatch[1]);

    if (nombre) {
      filters.chambres = nombre;
      remainingQuery = remainingQuery.replace(chambresMatch[0], '');
    }
  }

  // 3. Extraction du prix (si présent dans la chaîne search)
  interface PriceResult { min?: string; max?: string; }
  const pricePatterns = [
    {
      regex: /(\d+)\s*à\s*(\d+)/,
      handler: (m: RegExpMatchArray): PriceResult => ({ min: m[1], max: m[2] })
    },
    {
      regex: /moins\s+de\s+(\d+)/,
      handler: (m: RegExpMatchArray): PriceResult => ({ max: m[1] })
    },
    {
      regex: /plus\s+de\s+(\d+)/,
      handler: (m: RegExpMatchArray): PriceResult => ({ min: m[1] })
    }
  ];

  for (const pattern of pricePatterns) {
    const match = remainingQuery.match(pattern.regex);
    if (match) {
      const result = pattern.handler(match);
      if (result.min) filters.prix_min = parseInt(result.min);
      if (result.max) filters.prix_max = parseInt(result.max);
      remainingQuery = remainingQuery.replace(match[0], '');
      break;
    }
  }

  // 4. Extraction des équipements
  const equipements: string[] = [];
  const equipmentRegex = /(avec|sans)\s+([^,]+)/gi;
  let eqMatch;
  while ((eqMatch = equipmentRegex.exec(remainingQuery)) !== null) {
    const [fullMatch, operator, items] = eqMatch;
    const prefix = operator.toLowerCase() === 'sans' ? '!' : '';
    items.split(/(?:\s+et\s+|\s+|,)/).forEach(item => {
      equipements.push(`${prefix}${item.trim().toLowerCase()}`);
    });
    remainingQuery = remainingQuery.replace(fullMatch, '');
  }
  if (equipements.length > 0) {
    filters.equipements = equipements;
  }

  // 5. Traitement des mots-clés résiduels
  filters.keywords = remainingQuery
    .replace(/[^a-zà-ÿ0-9\s-]/gi, ' ')
    .split(/\s+/)
    .filter(k => k.length > 2 && !['les', 'des', 'une', 'pour', 'avec', 'dans'].includes(k))
    .map(k => removeDiacritics(k.toLowerCase()));

  return filters;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('search') || '';

  const searchFilters = parseNaturalSearch(searchQuery);

  const filteredData = mockLogements.filter(logement => {
    // 1. Filtre par localisation (si spécifié)
    if (searchFilters.location) {
      const logementLocation = removeDiacritics(
        `${logement.region} ${logement.quartier} ${logement.titre}`
      ).toLowerCase();
      if (!logementLocation.includes(searchFilters.location)) {
        return false;
      }
    }

    // 2. Filtre par prix provenant de la recherche naturelle
    if (searchFilters.prix_min && logement.prix < searchFilters.prix_min) return false;
    if (searchFilters.prix_max && logement.prix > searchFilters.prix_max) return false;

    // 2b. Filtre par prix provenant des paramètres standard (appliqué indépendamment de "search")
    const prixMinQuery = searchParams.get('prix_min');
    const prixMaxQuery = searchParams.get('prix_max');
    if (prixMinQuery && logement.prix < Number(prixMinQuery)) return false;
    if (prixMaxQuery && logement.prix > Number(prixMaxQuery)) return false;

    // 3. Filtre par équipements
    if (searchFilters.equipements) {
      const logementEquipements = new Map(
        logement.equipements.split(',')
          .map(e => e.trim().toLowerCase().split(':'))
          .map(([key, val]) => [key, val === 'true'])
      );
      for (const eq of searchFilters.equipements) {
        const [operator, value] = eq.startsWith('!')
          ? ['!', eq.slice(1).toLowerCase()]
          : ['=', eq.toLowerCase()];
        const eqValue = logementEquipements.get(value);
        if (operator === '!' && eqValue) return false;
        if (operator === '=' && !eqValue) return false;
      }
    }

    // 4. Filtre par type de logement provenant de la recherche naturelle
    if (searchFilters.type && logement.type.toLowerCase() !== searchFilters.type.toLowerCase()) {
      return false;
    }

    // 5. Filtre par mots-clés
    if (searchFilters.keywords.length > 0) {
      const logementText = removeDiacritics(
        `${logement.titre} ${logement.quartier} ${logement.region}`
      ).toLowerCase();
      if (!searchFilters.keywords.every(kw => logementText.includes(kw))) {
        return false;
      }
    }

    // 5. Filtres standards (appliqués indépendamment de la recherche naturelle)
    const typeFilter = searchParams.get('type');
    if (typeFilter && logement.type !== typeFilter.toLowerCase()) return false;

    const chambresFilter = searchParams.get('nombre_de_chambres');
    if (chambresFilter && logement.nombre_de_chambres !== Number(chambresFilter)) return false;

    const regionFilter = searchParams.get('region');
    if (regionFilter && logement.region !== regionFilter) return false;

    return true;
  });

  // Simulation d'un délai pour le chargement
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json(filteredData);
}
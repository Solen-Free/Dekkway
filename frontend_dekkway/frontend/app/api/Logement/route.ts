// app/api/logements/route.ts
import { NextResponse } from 'next/server';

const mockLogements = [
  {
    id: "1",
    type: "maison",
    prix: 350000,
    nombre_de_chambres: 3,
    equipements: "piscine:true,climatisation:true",
    region: "Thies",
    banniere: "./././images/maison.jpg",
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
    banniere: "./././images/maison1.jpg",
    titre: "Bel appart",
    quartier: "Yoff, Dakar",
    
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filteredData = mockLogements.filter(logement => {
    const type = searchParams.get('type');
    const prixMin = searchParams.get('prix_min');
    const prixMax = searchParams.get('prix_max');
    const chambres = searchParams.get('nombre_de_chambres');
    const region = searchParams.get('region');
    const equipements = searchParams.get('equipements');

    return (
      (!type || logement.type === type) &&
      (!prixMin || logement.prix >= Number(prixMin)) &&
      (!prixMax || logement.prix <= Number(prixMax)) &&
      (!chambres || logement.nombre_de_chambres === Number(chambres)) &&
      (!region || logement.region === region) &&
      (!equipements || equipements.split(',').some(eq => 
        logement.equipements.includes(eq)
      ))
    );
  });

  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(filteredData);
}
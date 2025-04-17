// "use client";
// import { useState, useEffect } from "react";
// import Carousel from "@/components/Carousel";
// import Buttons from "@/components/buttons";
// import Card from "@/components/UI/Card";
// import ButtonsBar from "@/components/ButtonsBar";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";

// interface Logement {
//   id: string;
//   banniere: string;
//   titre: string;
//   quartier: string;
//   type: string;
//   prix: number;
//   bedrooms?: number;
//   equipements?: string[];
//   city?: string;
// }

// const Loader = () => (
//   <div className="flex justify-center py-8">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FC9B89]"></div>
//   </div>
// );

// export default function Home() {
//   const [logements, setLogements] = useState<Logement[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedType, setSelectedType] = useState<string | null>(null);
//   const searchParams = useSearchParams();
//   const router = useRouter();
 


//   // Filtrage client-side existant pour les types
//   const filteredLogements = selectedType 
//     ? logements.filter(logement => logement.type === selectedType)
//     : logements;

//   // Nouvelle récupération avec filtres serveur
//   useEffect(() => {
//     const fetchLogements = async () => {
//       try {
//         const params = new URLSearchParams();
//         // if (searchParams.get('type')) {
//         //   params.append('type', searchParams.get('type')!);
//         // }

       

//         // Conversion des paramètres pour le backend Django
//         if (searchParams.get('prix_min')) params.append('prix_min', searchParams.get('prix_min')!);
//         if (searchParams.get('prix_max')) params.append('prix_max', searchParams.get('prix_max')!);
//         if (searchParams.get('nombre_de_chambres')) params.append('nombre_de_chambres', searchParams.get('nombre_de_chambres')!);
//         if (searchParams.get('equipements')) params.append('equipements', searchParams.get('equipements')!);
//         if (searchParams.get('region')) params.append('region', searchParams.get('region')!);
//         if (searchParams.get('type')) params.append('type', searchParams.get('type')!.toLowerCase());

//         const response = await fetch(`/api/Logement?${params.toString()}`);
        
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || "Erreur serveur");
//         }

       
//       const data: Logement[] = await response.json();
      
//       // Formatage du prix sans changer le nom de la propriété
//       const formattedData = data.map(logement => ({
//         ...logement,
//         prix: logement.prix // Conserve le nom 'prix' mais pourrait formater ici
//       }));
  
//         setLogements(formattedData);
        

//       } catch (err: any) {
//         setError(err.message);
//         setTimeout(() => setError(null), 5000);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogements();
//   }, [searchParams]);
//   // Conservation du fonctionnement existant pour les boutons
//   const handleSelectTypeAction = (queryString: string) => {
//     router.push(`/?${queryString}`);
//   };

//   return (
//     <div className="w-full min-h-screen">
//       {/* Section Carousel */}
//       <div className="w-full">
//         <Carousel />
//       </div>
//       <ButtonsBar onSelectTypeAction={(queryString) => router.push(`/?${queryString}`)}
                   
//        />

//       {/* Titre principal */}
//       <div className="flex flex-col items-center mt-6 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#FC9B89] font-bold text-center">
//           Rechercher votre logement dès maintenant !
//         </h1>
//       </div>

//       {/* Section pour les bailleurs */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-start px-4 sm:px-6 lg:px-8 mt-8 gap-4">
//         <Buttons 
//           text="Devenir Bailleur" 
//           fontWeight="font-bold" 
//           textSize="text-xl sm:text-2xl"  
//           href="/InscriptionBailleur"
//         />
//         <h1 className="text-lg sm:text-xl font-bold text-black">
//           <span className="animate-typewriter block">
//             Vous avez la possibilité de vendre vos propriétés sur notre plateforme !
//           </span>
//         </h1>
//       </div>

//       {/* Section des logements récents */}
//       <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 mt-8">
//         <h1 className="font-bold text-[#014F86] text-lg sm:text-xl mb-6">
//           {searchParams.toString() ? "Résultats de recherche" : "Les plus récents"}
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {loading ? (
//             <Loader />
//           ) : error ? (
//             <div className="col-span-full text-center text-red-500">
//               {error}
//             </div>
//           ) : logements.length > 0 ? (
//             logements.map((logement) => (
//               <Card 
//                 key={logement.id}
//                 id={logement.id}
//                 banniere={logement.banniere}
//                 titre={logement.titre}
//                 quartier={logement.quartier}
//                 prix={logement.prix}
//               />
//             ))
//           ) : (
//             <div className="col-span-full text-center text-gray-500">
//               Aucun logement ne correspond à vos critères
//             </div>
//           )}
//         </div>
//       </div>

     
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import Carousel from "@/components/Carousel";
import Buttons from "@/components/buttons";
import Card from "@/components/UI/Card";
import ButtonsBar from "@/components/ButtonsBar";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface Logement {
  id: string;
  banniere: string;
  titre: string;
  quartier: string;
  type: string;
  prix: number;
  nombre_de_chambres: number;
  equipements: string;
  region: string;
}

const Loader = () => (
  <div className="flex justify-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FC9B89]"></div>
  </div>
);

export default function Home() {
  const [logements, setLogements] = useState<Logement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchLogements = async () => {
      try {
        setLoading(true);
        setError(null);

        // Créer des paramètres propres
        const params = new URLSearchParams();
        
        // Garder uniquement les paramètres avec valeurs
        searchParams.forEach((value, key) => {
          if (value && value.trim() !== '') {
            params.append(key, value);
          }
        });

        // Journalisation des paramètres
        console.log('Fetching with params:', params.toString());
        // const response = await fetch(`http://127.0.0.1:8000/rech-logements/?${params.toString()}`);

        const response = await fetch(`/api/Logement?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data: Logement[] = await response.json();
        
        // Journalisation des résultats
        console.log('Received data:', data);
        
        setLogements(data);

      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || "Une erreur est survenue");
        setLogements([]);
      } finally {
        setLoading(false);
      }
    };

    // Délai minimal pour éviter le scintillement
    const timeout = setTimeout(fetchLogements, 300);
    return () => clearTimeout(timeout);
  }, [searchParams]);

  const handleSelectTypeAction = (queryString: string) => {
    const newParams = new URLSearchParams(queryString);
    
    // Supprimer la recherche lors du filtrage manuel
    newParams.delete('search');
    
    router.push(`/?${newParams.toString()}`);
  };

  const getSearchTitle = () => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      return `Résultats pour "${decodeURIComponent(searchQuery)}"`;
    }
    
    const hasFilters = Array.from(searchParams.keys()).some(k => k !== 'page');
    return hasFilters ? "Résultats des filtres" : "Les plus récents";
  };

  return (
    <div className="w-full min-h-screen pt-20"> {/* Ajout de padding pour le header fixe */}
      {/* Section Carousel */}
      <div className="w-full">
        <Carousel />
      </div>

      <ButtonsBar onSelectTypeAction={handleSelectTypeAction} />

      {/* Titre principal */}
      <div className="flex flex-col items-center mt-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#FC9B89] font-bold text-center">
          Recherchez votre logement idéal
        </h1>
      </div>

      {/* Section pour les bailleurs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-start px-4 sm:px-6 lg:px-8 mt-8 gap-4">
        <Buttons 
          text="Devenir Bailleur" 
          fontWeight="font-bold" 
          textSize="text-xl sm:text-2xl"  
          href="/InscriptionBailleur"
        />
        <p className="text-lg sm:text-xl font-bold text-gray-700">
          Proposez vos biens en location sur notre plateforme sécurisée
        </p>
      </div>

      {/* Section des résultats */}
      <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 mt-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-[#014F86] text-lg sm:text-xl">
            {getSearchTitle()}
          </h1>
          {!loading && (
            <span className="text-sm text-gray-500">
              {logements.length} résultat{logements.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <Loader />
          ) : logements.length > 0 ? (
            logements.map((logement) => (
              <Card 
                key={logement.id}
                id={logement.id}
                banniere={logement.banniere}
                titre={logement.titre}
                quartier={logement.quartier}
                prix={logement.prix}
                
              />
            ))
          ) : (
            !error && (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500 mb-4">
                  Aucun résultat ne correspond à vos critères
                </div>
                <button
                  onClick={() => router.push('/')}
                  className="bg-[#FC9B89] text-white px-6 py-2 rounded-full hover:bg-[#FF6B6B] transition-colors"
                >
                  Réinitialiser la recherche
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
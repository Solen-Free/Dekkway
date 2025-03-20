// Services/api.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Interface Logement avec toutes les propriétés nécessaires
export interface Logement {
  id: number;
  image: string;
  nom: string;
  ville: string;
  prix: number;
  description: string;
  type: string;
  caracteristiques: {
    chambres: number;
    salon: number;
    cuisine: number;
    toilettes: number;
    garage: number;
  };
  equipements: string[];
  proprietaire: {
    nom: string;
    logo: string;
  };
  localisation: {
    lat: number;
    lng: number;
  };

}

// Fonction pour récupérer un logement par son ID
export const getLogementById = async (id: number): Promise<Logement> => {
  try {
    const url = `${API_URL}/logements/${id}`;
    console.log("URL de l'API appelée:", url); // Debug
    const response = await axios.get<Logement>(url);
    return response.data;
  } catch (error) {
    console.error("Erreur détaillée:", error); // Log complet
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 
        `Erreur ${error.response?.status}: ${error.response?.statusText}`
      );
    }
    throw new Error("Erreur inconnue");
  }
};

// Fonction pour récupérer tous les logements (optionnelle)
export const getLogements = async (): Promise<Logement[]> => {
  try {
    const response = await axios.get<Logement[]>(`${API_URL}/logements`);
    return response.data;
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
};
// types.ts
export interface PropertyResult {
    id: number;
    title: string;
    price: number;
    bedrooms: number;
    city: string;
    property_type: string;
    description: string;
    surface: number;
    image_urls: string[];
    created_at: string;
    // Ajouter d'autres champs selon votre modèle Django
  }
  
  export interface ApiResponse {
    results: PropertyResult[];
    count: number;
    next: string | null;
    previous: string | null;
  }
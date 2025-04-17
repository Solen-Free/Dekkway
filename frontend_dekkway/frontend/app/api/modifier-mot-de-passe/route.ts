import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Récupérer les données du formulaire
    const { oldPassword, newPassword } = await request.json();
    
    // Récupérer le token d'authentification depuis les cookies ou localStorage
    // Dans un environnement serveur, nous devons extraire le token de la requête
    const authHeader = request.headers.get('cookie');
    let token = '';
    
    if (authHeader) {
      // Extraire le token du cookie si présent
      const tokenMatch = authHeader.match(/token=([^;]+)/);
      if (tokenMatch) token = tokenMatch[1];
    }
    
    // Si pas de token dans les cookies, on ne peut pas continuer
    if (!token) {
      // Dans un environnement client, le token serait dans localStorage
      // Mais comme nous sommes côté serveur, nous devons le recevoir dans la requête
      return NextResponse.json(
        { message: "Vous devez être connecté pour modifier votre mot de passe" },
        { status: 401 }
      );
    }

    // Appeler l'API backend pour changer le mot de passe
    const response = await fetch("http://localhost:8000/password-change/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });

    // Traiter la réponse
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { message: data.old_password || data.new_password || "Erreur lors du changement de mot de passe" },
        { status: response.status }
      );
    }

    // Si tout s'est bien passé, retourner un succès avec le nouveau token
    return NextResponse.json(
      { 
        message: "Mot de passe modifié avec succès",
        token: data.token // Le backend renvoie un nouveau token après changement de mot de passe
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors du changement de mot de passe:", error);
    return NextResponse.json(
      { message: "Une erreur s'est produite lors du traitement de votre demande" },
      { status: 500 }
    );
  }
}
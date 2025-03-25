import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialisation d'OpenAI avec la clé API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Utilisation de la clé API
});

export async function POST(req: NextRequest) {
  try {
    // Récupérer le message envoyé par l'utilisateur
    const { message } = await req.json();

    // Appeler OpenAI pour générer une réponse
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Modèle utilisé
      messages: [{ role: "user", content: message }], // Message de l'utilisateur
    });

    // Retourner la réponse générée par l'IA
    return NextResponse.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('Erreur lors de la requête OpenAI:', error);
    return NextResponse.json({ error: "Erreur lors de la requête" }, { status: 500 });
  }
}

// app/api/mot-de-passe-oublie/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  // Simuler une vérification de l'e-mail dans une base de données
  const userExists = true; // Remplacez par une logique réelle

  if (!userExists) {
    return NextResponse.json(
      { message: "Aucun compte trouvé avec cette adresse e-mail." },
      { status: 404 }
    );
  }

  // Simuler l'envoi d'un e-mail de réinitialisation
  console.log(`E-mail de réinitialisation envoyé à : ${email}`);

  return NextResponse.json(
    { message: "Un e-mail de réinitialisation a été envoyé." },
    { status: 200 }
  );
}
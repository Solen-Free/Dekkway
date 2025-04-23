import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Simuler un délai de 2000 ms
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simule 80% de succès
  const success = Math.random() < 0.8;

  return NextResponse.json(
    {
      success,
      transactionId: success ? `TRX-${Date.now()}` : undefined,
      message: success ? 'Paiement simulé avec succès' : 'Échec de paiement simulé'
    },
    {
      status: success ? 200 : 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    }
  );
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
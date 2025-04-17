// app/api/paiement/route.ts  (si vous voulez l'URL /api/paiement)
export async function POST(request: Request) {
  // Simuler un délai de 2000 ms
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simule 80% de succès
  const success = Math.random() < 0.8;

  const body = JSON.stringify({
    success,
    transactionId: success ? `TRX-${Date.now()}` : undefined,
    message: success 
      ? 'Paiement simulé avec succès' 
      : 'Échec de paiement simulé'
  });

  return new Response(body, {
    status: success ? 200 : 400,
    headers: { 'Content-Type': 'application/json' }
  });
}
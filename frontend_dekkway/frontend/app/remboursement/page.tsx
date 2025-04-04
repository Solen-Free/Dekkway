'use client';

import React from 'react';
import Link from 'next/link';

export default function RemboursementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#014F86] mb-6">Options de remboursement</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Politique de remboursement</h2>
        <p className="text-gray-700 mb-4">
          Chez Dekkway, nous nous engageons à offrir un processus de remboursement transparent et équitable. 
          Les remboursements sont traités conformément à nos politiques d'annulation et aux conditions spécifiques de chaque logement.
        </p>
        
        <div className="mt-6 space-y-6">
          <div className="border-l-4 border-[#014F86] pl-4">
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Remboursements suite à une annulation</h3>
            <p className="text-gray-700">Le montant remboursé dépend de la politique d'annulation applicable à votre réservation et du moment où vous avez annulé. Pour plus de détails, consultez notre <Link href="/annulation" className="text-[#FC9B89] hover:underline">page d'annulation</Link>.</p>
          </div>
          
          <div className="border-l-4 border-[#014F86] pl-4">
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Remboursements en cas de problème</h3>
            <p className="text-gray-700">Si le logement ne correspond pas à la description ou présente des problèmes majeurs, contactez-nous dans les 24 heures suivant votre arrivée. Notre équipe examinera votre demande et pourra vous proposer un remboursement partiel ou total selon la situation.</p>
          </div>
          
          <div className="border-l-4 border-[#014F86] pl-4">
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Remboursements pour circonstances exceptionnelles</h3>
            <p className="text-gray-700">En cas de circonstances exceptionnelles indépendantes de votre volonté (catastrophes naturelles, urgences médicales graves, etc.), nous étudierons votre situation au cas par cas pour déterminer les options de remboursement possibles.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Délais de remboursement</h2>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-[#014F86] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">1</div>
            <div>
              <h3 className="text-lg font-medium text-[#014F86] mb-1">Traitement initial</h3>
              <p className="text-gray-700">Une fois votre demande de remboursement approuvée, notre équipe financière la traite dans un délai de 1 à 3 jours ouvrables.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#014F86] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">2</div>
            <div>
              <h3 className="text-lg font-medium text-[#014F86] mb-1">Délai bancaire</h3>
              <p className="text-gray-700">Après le traitement initial, le délai de réception dépend de votre mode de paiement :</p>
              <ul className="list-disc list-inside mt-2 ml-4 text-gray-700">
                <li>Carte bancaire : 5 à 10 jours ouvrables</li>
                <li>Virement bancaire : 3 à 7 jours ouvrables</li>
                <li>Mobile Money (Orange Money, Wave) : 1 à 3 jours ouvrables</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#014F86] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">3</div>
            <div>
              <h3 className="text-lg font-medium text-[#014F86] mb-1">Confirmation</h3>
              <p className="text-gray-700">Vous recevrez un email de confirmation une fois le remboursement effectué. Si vous n'avez pas reçu votre remboursement après le délai indiqué, n'hésitez pas à contacter notre service client.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Modes de remboursement</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Remboursement sur carte bancaire</h3>
            <p className="text-gray-700">Si vous avez payé par carte bancaire, le remboursement sera effectué sur la même carte. Veuillez noter que certaines banques peuvent prendre jusqu'à 10 jours ouvrables pour traiter le remboursement.</p>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Remboursement par virement bancaire</h3>
            <p className="text-gray-700">Dans certains cas, nous pouvons proposer un remboursement par virement bancaire. Vous devrez alors nous fournir vos coordonnées bancaires complètes.</p>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Remboursement via Mobile Money</h3>
            <p className="text-gray-700">Si vous avez payé via Orange Money ou Wave, le remboursement sera effectué sur le même numéro de téléphone utilisé pour le paiement.</p>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Crédit Dekkway</h3>
            <p className="text-gray-700">Dans certains cas, nous pouvons vous proposer un crédit Dekkway utilisable pour de futures réservations, souvent avec un bonus supplémentaire par rapport au montant du remboursement.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Questions fréquentes sur les remboursements</h2>
        
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Puis-je choisir mon mode de remboursement ?</h3>
            <p className="text-gray-700">En général, le remboursement est effectué via le même mode de paiement que celui utilisé lors de la réservation. Dans certains cas particuliers, notre service client peut vous proposer d'autres options.</p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Que faire si je n'ai pas reçu mon remboursement dans les délais indiqués ?</h3>
            <p className="text-gray-700">Si vous n'avez pas reçu votre remboursement après le délai prévu, veuillez contacter notre service client en fournissant votre numéro de réservation et les détails de votre demande de remboursement.</p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Les frais de service sont-ils remboursables ?</h3>
            <p className="text-gray-700">Les frais de service sont généralement remboursés en cas d'annulation par le propriétaire ou pour des circonstances exceptionnelles. Pour les annulations standard, les frais de service peuvent être retenus selon la politique d'annulation applicable.</p>
          </div>
        </div>
        
        <div className="mt-8">
          <p className="text-gray-700 mb-4">Besoin d'aide supplémentaire concernant votre remboursement ?</p>
          <Link 
            href="/contact" 
            className="bg-[#014F86] text-white px-6 py-3 rounded-md hover:bg-[#013a63] transition-colors inline-block"
          >
            Contactez notre service client
          </Link>
        </div>
      </div>
    </div>
  );
}
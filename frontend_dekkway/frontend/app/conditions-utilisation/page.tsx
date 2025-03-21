"use client"; // Directive pour indiquer que ce composant est un composant client

import React from 'react';

export default function PolitiqueDeConfidentialite() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Titre de la page */}
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#014F86] mb-6">
          Politique de Confidentialité de DEKKWAY
        </h1>
      </div>

      {/* Contenu de la politique de confidentialité */}
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div className="prose prose-sm sm:prose-base text-gray-700 leading-tight">
          {/* Section 1 : Collecte des Informations */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#014F86] mb-4">
            1. Collecte des Informations
          </h2>
          <p className="mb-4">
            Nous collectons plusieurs types d'informations pour fournir, améliorer et personnaliser nos services. Voici les catégories d'informations que nous pouvons collecter :
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            1.1. Informations Personnelles
          </h3>
          <p className="mb-4">
            Les informations personnelles sont des données qui peuvent être utilisées pour vous identifier directement ou indirectement. Cela inclut :
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone</li>
            <li>Adresse postale</li>
            <li>Date de naissance</li>
            <li>Informations de paiement (le cas échéant)</li>
          </ul>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            1.2. Données d'Utilisation
          </h3>
          <p className="mb-4">
            Les données d'utilisation sont des informations collectées automatiquement lorsque vous utilisez DEKKWAY. Cela inclut :
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Pages visitées dans l'application</li>
            <li>Fonctionnalités utilisées</li>
            <li>Durée et fréquence d'utilisation</li>
            <li>Interactions avec d'autres utilisateurs ou avec le contenu</li>
          </ul>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            1.3. Données Techniques
          </h3>
          <p className="mb-4">
            Les données techniques sont des informations sur votre appareil et votre connexion Internet. Cela inclut :
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Adresse IP</li>
            <li>Type de navigateur et version</li>
            <li>Système d'exploitation</li>
            <li>Identifiants uniques de l'appareil (comme l'ID d'appareil)</li>
            <li>Données de géolocalisation (si vous avez activé cette fonctionnalité)</li>
          </ul>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            1.4. Cookies et Technologies Similaires
          </h3>
          <p className="mb-4">
            Nous utilisons des cookies et des technologies similaires pour suivre l'activité sur notre application et stocker certaines informations. Les cookies sont de petits fichiers texte stockés sur votre appareil. Ils nous aident à :
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Améliorer l'expérience utilisateur</li>
            <li>Analyser l'utilisation de l'application</li>
            <li>Personnaliser le contenu et les publicités</li>
          </ul>

          {/* Section 2 : Utilisation des Informations */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#014F86] mb-4">
            2. Utilisation des Informations
          </h2>
          <p className="mb-4">
            Nous utilisons les informations collectées pour les finalités suivantes :
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            2.1. Fournir et Maintenir nos Services
          </h3>
          <p className="mb-4">
            Nous utilisons vos informations pour :
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Vous authentifier et vous permettre d'accéder à votre compte.</li>
            <li>Répondre à vos demandes de support client.</li>
            <li>Vous informer des mises à jour et des nouvelles fonctionnalités.</li>
          </ul>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            2.2. Personnaliser l'Expérience Utilisateur
          </h3>
          <p className="mb-4">
            Nous utilisons vos informations pour :
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Vous suggérer du contenu ou des fonctionnalités adaptés à vos préférences.</li>
            <li>Vous permettre de configurer l'application selon vos besoins.</li>
          </ul>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            2.3. Analyser et Améliorer nos Services
          </h3>
          <p className="mb-4">
            Nous utilisons vos informations pour :
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Comprendre comment les utilisateurs interagissent avec l'application.</li>
            <li>Identifier les domaines à améliorer.</li>
            <li>Tester de nouvelles fonctionnalités.</li>
          </ul>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            2.4. Sécurité et Conformité
          </h3>
          <p className="mb-4">
            Nous utilisons vos informations pour :
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Détecter et prévenir les activités frauduleuses ou abusives.</li>
            <li>Respecter nos obligations légales et réglementaires.</li>
          </ul>

          {/* Section 3 : Partage des Informations */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#014F86] mb-4">
            3. Partage des Informations
          </h2>
          <p className="mb-4">
            Nous ne partageons vos informations personnelles qu'avec votre consentement ou dans les cas suivants :
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            3.1. Avec des Fournisseurs de Services
          </h3>
          <p className="mb-4">
            Nous pouvons partager vos informations avec des tiers qui nous aident à fournir nos services. Cela inclut :
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Hébergeurs pour stocker les données de l'application.</li>
            <li>Analystes pour analyser l'utilisation de l'application.</li>
            <li>Services de paiement pour traiter les transactions financières (le cas échéant).</li>
          </ul>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            3.2. Pour des Raisons Légales
          </h3>
          <p className="mb-4">
            Nous pouvons divulguer vos informations si la loi l'exige ou pour protéger nos droits, notre propriété ou notre sécurité. Cela inclut :
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Répondre à des demandes légales, comme des mandats de perquisition ou des ordonnances du tribunal.</li>
            <li>Protéger nos droits légaux ou ceux de nos utilisateurs.</li>
          </ul>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            3.3. En Cas de Fusion ou d'Acquisition
          </h3>
          <p className="mb-4">
            Si DEKKWAY est impliqué dans une fusion, acquisition ou vente d'actifs, vos informations peuvent être transférées. Nous vous informerons de tout changement de propriétaire ou d'utilisation de vos informations.
          </p>

          {/* Section 4 : Sécurité des Données */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#014F86] mb-4">
            4. Sécurité des Données
          </h2>
          <p className="mb-4">
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos informations contre tout accès non autorisé, altération, divulgation ou destruction. Voici quelques-unes des mesures que nous prenons :
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            4.1. Chiffrement des Données
          </h3>
          <p className="mb-4">
            Nous utilisons des protocoles de chiffrement pour protéger vos informations pendant leur transmission et leur stockage.
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            4.2. Contrôle d'Accès
          </h3>
          <p className="mb-4">
            Nous limitons l'accès à vos informations personnelles aux employés et aux tiers qui ont besoin de ces informations pour fournir nos services.
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            4.3. Surveillance et Détection
          </h3>
          <p className="mb-4">
            Nous surveillons en permanence l'activité sur notre application pour détecter et prévenir les activités suspectes ou malveillantes.
          </p>

          {/* Section 5 : Vos Droits */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#014F86] mb-4">
            5. Vos Droits
          </h2>
          <p className="mb-4">
            En tant qu'utilisateur, vous avez des droits concernant vos données personnelles. Voici les droits que vous pouvez exercer :
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            5.1. Droit d'Accès
          </h3>
          <p className="mb-4">
            Vous pouvez demander une copie des informations que nous détenons sur vous.
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            5.2. Droit de Rectification
          </h3>
          <p className="mb-4">
            Vous pouvez demander la correction de données inexactes ou incomplètes.
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            5.3. Droit à l'Effacement
          </h3>
          <p className="mb-4">
            Vous pouvez demander la suppression de vos données dans certaines circonstances.
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            5.4. Droit d'Opposition
          </h3>
          <p className="mb-4">
            Vous pouvez vous opposer au traitement de vos données pour des raisons spécifiques.
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            5.5. Droit à la Portabilité
          </h3>
          <p className="mb-4">
            Vous pouvez demander à recevoir vos données dans un format structuré et couramment utilisé.
          </p>

          {/* Section 6 : Conservation des Données */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#014F86] mb-4">
            6. Conservation des Données
          </h2>
          <p className="mb-4">
            Nous conservons vos informations personnelles aussi longtemps que nécessaire pour fournir nos services ou pour respecter nos obligations légales. Les données peuvent être conservées plus longtemps si nécessaire pour des raisons légales ou de sécurité.
          </p>

          {/* Section 7 : Cookies et Technologies Similaires */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#014F86] mb-4">
            7. Cookies et Technologies Similaires
          </h2>
          <p className="mb-4">
            Nous utilisons des cookies pour améliorer votre expérience utilisateur. Voici les types de cookies que nous utilisons :
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            7.1. Cookies Essentiels
          </h3>
          <p className="mb-4">
            Ces cookies sont nécessaires au fonctionnement de l'application. Ils vous permettent de naviguer et d'utiliser les fonctionnalités de base.
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            7.2. Cookies de Performance
          </h3>
          <p className="mb-4">
            Ces cookies collectent des informations sur la manière dont vous utilisez l'application, comme les pages visitées et les erreurs rencontrées.
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            7.3. Cookies de Fonctionnalité
          </h3>
          <p className="mb-4">
            Ces cookies permettent à l'application de se souvenir de vos choix (comme votre langue préférée) et de vous offrir une expérience personnalisée.
          </p>

          <h3 className="text-md sm:text-lg font-semibold text-[#014F86] mb-2">
            7.4. Cookies Publicitaires
          </h3>
          <p className="mb-4">
            Ces cookies sont utilisés pour vous montrer des publicités pertinentes en fonction de vos intérêts.
          </p>

          <p className="mb-4">
            Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut limiter certaines fonctionnalités de l'application.
          </p>

          {/* Section 8 : Transferts Internationaux de Données */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#014F86] mb-4">
            8. Transferts Internationaux de Données
          </h2>
          <p className="mb-4">
            Vos informations peuvent être transférées et traitées dans des pays autres que le vôtre, où les lois sur la protection des données peuvent différer. Nous prenons des mesures pour garantir que vos données sont traitées en toute sécurité et conformément à cette politique.
          </p>

          {/* Section 9 : Modifications de la Politique de Confidentialité */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#014F86] mb-4">
            9. Modifications de la Politique de Confidentialité
          </h2>
          <p className="mb-4">
            Nous pouvons mettre à jour cette politique de temps à autre. Nous vous informerons des changements significatifs via une notification dans l'application ou par e-mail. Votre utilisation continue de DEKKWAY après ces modifications constitue votre acceptation de la nouvelle politique.
          </p>

          {/* Annexe : Définitions */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#014F86] mb-4">
            Annexe : Définitions
          </h2>
          <p className="mb-4">
            Voici quelques définitions utiles pour mieux comprendre cette politique :
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>Données personnelles</strong> : Toute information se rapportant à une personne identifiée ou identifiable.</li>
            <li><strong>Cookies</strong> : Petits fichiers texte stockés sur votre appareil pour collecter des informations.</li>
            <li><strong>Responsable du traitement</strong> : L'entité qui détermine les finalités et les moyens du traitement des données.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
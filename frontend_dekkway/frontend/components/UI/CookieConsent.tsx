import React, { useState, useEffect } from 'react';
import { setCookie, getCookie } from '../../utils/cookies';

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà accepté les cookies
    const hasAccepted = getCookie('cookiesAccepted');
    if (!hasAccepted) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    setCookie('cookiesAccepted', 'true', 365); // Valable pour un an
    setShowConsent(false);
  };

  const declineCookies = () => {
    // Stocker le refus dans un cookie qui expire rapidement (1 jour)
    // pour ne pas redemander immédiatement
    setCookie('cookiesDeclined', 'true', 1);
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-50 border-t-2 border-[#014F86]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#014F86] mb-2">Nous utilisons des cookies</h3>
          <p className="text-sm text-gray-600">
            Nous utilisons des cookies pour améliorer votre expérience sur notre site, personnaliser le contenu et les publicités, 
            et analyser notre trafic. Vous pouvez choisir d'accepter ou de refuser l'utilisation des cookies.
          </p>
          <p className="text-sm mt-1">
            <a href="/politique-cookies" className="text-[#FC9B89] hover:underline">
              En savoir plus sur notre politique de cookies
            </a>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-[#014F86] text-white rounded-lg hover:bg-[#FC9B89] transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
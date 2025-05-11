import { setCookie, getCookie } from './cookies';

/**
 * Migre les données de localStorage vers les cookies
 * @param keys Tableau des clés à migrer
 * @param days Nombre de jours avant expiration des cookies
 */
export const migrateLocalStorageToCookies = (keys: string[], days = 7) => {
  keys.forEach(key => {
    try {
      // Vérifier si la donnée existe déjà dans les cookies
      const cookieValue = getCookie(key);
      if (!cookieValue) {
        // Récupérer depuis localStorage
        const localValue = localStorage.getItem(key);
        if (localValue) {
          // Essayer de parser en JSON si possible
          try {
            const parsedValue = JSON.parse(localValue);
            setCookie(key, parsedValue, days);
          } catch {
            // Si ce n'est pas du JSON valide, stocker comme chaîne
            setCookie(key, localValue, days);
          }
        }
      }
    } catch (error) {
      console.error(`Erreur lors de la migration de ${key}:`, error);
    }
  });
};

/**
 * Exécute la migration pour les données courantes de l'application
 */
export const migrateCommonData = () => {
  // Liste des clés couramment utilisées dans l'application
  const commonKeys = [
    'token',
    'user',
    'favorites',
    'reservations',
    'conversation',
    'hasVisitedBefore',
    'currentPropertyId',
    'propertyDetails'
  ];
  
  migrateLocalStorageToCookies(commonKeys);
};
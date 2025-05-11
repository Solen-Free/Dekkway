import Cookies from 'js-cookie';

// Durée par défaut des cookies (7 jours)
const DEFAULT_EXPIRATION = 7;

/**
 * Définit un cookie avec une valeur et une durée d'expiration optionnelle
 * @param name Nom du cookie
 * @param value Valeur à stocker
 * @param days Nombre de jours avant expiration (par défaut: 7 jours)
 */
export const setCookie = (name: string, value: any, days = DEFAULT_EXPIRATION) => {
  // Pour les objets et tableaux, convertir en JSON
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
  
  Cookies.set(name, stringValue, {
    expires: days,
    path: '/',
    sameSite: 'strict',
    // En production, activer secure: true
    // secure: process.env.NODE_ENV === 'production',
  });
};

/**
 * Récupère la valeur d'un cookie
 * @param name Nom du cookie
 * @param parseJson Indique si la valeur doit être parsée comme JSON
 * @returns La valeur du cookie ou null si non trouvé
 */
export const getCookie = (name: string, parseJson = false) => {
  const value = Cookies.get(name);
  
  if (!value) return null;
  
  if (parseJson) {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(`Erreur lors du parsing du cookie ${name}:`, error);
      return value;
    }
  }
  
  return value;
};

/**
 * Supprime un cookie
 * @param name Nom du cookie à supprimer
 */
export const removeCookie = (name: string) => {
  Cookies.remove(name, { path: '/' });
};

/**
 * Vérifie si un cookie existe
 * @param name Nom du cookie
 * @returns true si le cookie existe, false sinon
 */
export const hasCookie = (name: string) => {
  return Cookies.get(name) !== undefined;
};
// Gestionnaire de cache pour les projets
const CACHE_KEY = 'projectsCache';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 heures

export const ProjectsCacheManager = {
  // Sauvegarder les projets dans le cache
  saveProjects: (projects) => {
    try {
      const cacheData = {
        timestamp: Date.now(),
        projects
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du cache :', error);
    }
  },

  // Récupérer les projets du cache
  getCachedProjects: () => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (!cachedData) return null;

      const { timestamp, projects } = JSON.parse(cachedData);
      
      // Vérifier l'expiration du cache
      if (Date.now() - timestamp > CACHE_EXPIRATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return projects;
    } catch (error) {
      console.error('Erreur lors de la récupération du cache :', error);
      return null;
    }
  },

  // Invalider le cache
  invalidateCache: () => {
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch (error) {
      console.error('Erreur lors de la suppression du cache :', error);
    }
  },

  // Vérifier si le cache existe
  hasCachedProjects: () => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (!cachedData) return false;

      const { timestamp } = JSON.parse(cachedData);
      
      // Vérifier si le cache n'est pas expiré
      return Date.now() - timestamp <= CACHE_EXPIRATION;
    } catch (error) {
      console.error('Erreur lors de la vérification du cache :', error);
      return false;
    }
  }
};
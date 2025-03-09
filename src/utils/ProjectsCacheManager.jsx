export class ProjectsCacheManager {
  static CACHE_KEY = 'cached_projects';
  static CACHE_EXPIRY_KEY = 'cached_projects_expiry';

  static saveProjects(projects, expiryTime) {
    if (!projects || !Array.isArray(projects)) return;
    
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(projects));
      
      if (expiryTime) {
        localStorage.setItem(this.CACHE_EXPIRY_KEY, expiryTime.toString());
      }
    } catch (error) {
      console.warn('Impossible de mettre en cache les projets:', error);
    }
  }
  

  static getCachedProjects() {
    try {
      const cachedData = localStorage.getItem(this.CACHE_KEY);
      return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
      console.warn('Erreur lors de la récupération du cache:', error);
      return null;
    }
  }
  

  static getCacheExpiry() {
    try {
      const expiry = localStorage.getItem(this.CACHE_EXPIRY_KEY);
      return expiry ? parseInt(expiry, 10) : null;
    } catch (error) {
      return null;
    }
  }
  

  static isCacheExpired() {
    const expiry = this.getCacheExpiry();
    const now = new Date().getTime();
    
    return !expiry || now > expiry;
  }
  
  static clearCache() {
    localStorage.removeItem(this.CACHE_KEY);
    localStorage.removeItem(this.CACHE_EXPIRY_KEY);
  }
}

export default ProjectsCacheManager;
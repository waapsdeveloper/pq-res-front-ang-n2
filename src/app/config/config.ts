export class Config {
  static apiBaseUrl: string = 'http://127.0.0.1:8000/api/frontend'; // Base URL for API endpoints
  // static apiBaseUrl: string = 'https://pqresapi.spacess.online/api/frontend'; // Base URL for API endpoints
  // static apiBaseUrl: string = 'https://pqresapi.spacess.online/api/frontend'; // Base URL for API endpoints
  // static apiBaseUrl: string = 'https://api.restaurant.axetechsolutions.com/api/frontend'; // Base URL for API endpoints
  static timeout: number = 5000; // Default timeout for API calls in milliseconds
  static restaurant_id: number = 1;

  // Define specific API endpoints
  static endpoints = {
    // User: '/user',
    // createUser: '/user/create',
    // deleteUser: '/user/delete',
  };

  // Other configurations
  static environment: string = 'production'; // Environment setting (e.g., 'development', 'production')

  // Method to get full URL for an endpoint
  static getFullUrl(endpointKey: keyof typeof Config.endpoints): string {
    return `${this.apiBaseUrl}${this.endpoints[endpointKey]}`;
  }
}

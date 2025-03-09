import io from 'socket.io-client';

class WebSocketManager {
  constructor() {
    this.socket = null;
    this.listeners = {};
  }

  connect() {
    if (!this.socket) {
      this.socket = io('http://localhost:5000', {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      this.socket.on('connect', () => {
        console.log('Connecté au serveur WebSocket');
      });

      this.socket.on('disconnect', () => {
        console.log('Déconnecté du serveur WebSocket');
      });

      this.socket.on('connect_error', (error) => {
        console.error('Erreur de connexion WebSocket:', error);
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event, callback) {
    if (!this.socket) {
      this.connect();
    }

    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);

    this.socket.on(event, callback);

    return () => {
      this.off(event, callback);
    };
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);

      if (this.listeners[event]) {
        this.listeners[event] = this.listeners[event].filter(
          (listener) => listener !== callback
        );
      }
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new WebSocketManager();
    }
    return this.instance;
  }
}

export default WebSocketManager.getInstance();
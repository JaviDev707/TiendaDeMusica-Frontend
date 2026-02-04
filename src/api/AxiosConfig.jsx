import axios from 'axios';

// --- INTERCEPTOR DE PETICIÓN ---
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`; // Agrego el token al encabezado Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- INTERCEPTOR DE RESPUESTA ---
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 500) {
        console.warn("Token inválido o expirado detectado en la respuesta. Limpiando...");
        localStorage.removeItem("token");
      }
    }
    return Promise.reject(error);
  }
);
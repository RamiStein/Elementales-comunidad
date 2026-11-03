// =========================================================================
// ELEMENTALES COMUNIDAD - CONFIGURACIÓN DE FIREBASE CLOUD FIRESTORE
// =========================================================================
// Proyecto: elementales-comunidad
// Base de datos en la nube en tiempo real para registro y sincronización de pedidos

const firebaseConfig = {
  apiKey: "AIzaSyBJ2oto0fsI8ge-9E-FLRc1hTvOPr8u2AM",
  authDomain: "elementales-comunidad.firebaseapp.com",
  projectId: "elementales-comunidad",
  storageBucket: "elementales-comunidad.firebasestorage.app",
  messagingSenderId: "170917322828",
  appId: "1:170917322828:web:5044739f679d0f995c14e9"
};

if (typeof window !== 'undefined') {
  window.ELEMENTALES_FIREBASE_CONFIG = firebaseConfig;
}

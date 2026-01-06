//donde se une todo el store de la aplicacion
import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Esto ayuda a que no se borre al recargar
import { createCardSlice, type CardSlice } from './slices/cardSlice';

// Unimos los Slices en un solo Store Maestro
export const useAppStore = create<CardSlice>()(
  persist(
    (...a) => ({
      ...createCardSlice(...a),
    }),
    {
      name: 'app-storage', // Nombre de la "llave" en el navegador
    }
  )
);
import { defineAction } from 'astro:actions';

export const getProperties = defineAction({
  handler: async () => {
    try {

      const urlApi = process.env.API_GET_PROPERTIES ?? '';

      const response = await fetch(urlApi, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
      }

    } catch (error) {
      console.error("Error al obtener las reservas:", error);
      throw error;
    }
  }
});
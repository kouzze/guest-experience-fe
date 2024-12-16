import { defineAction } from 'astro:actions';

export const deleteReservation = defineAction({
  handler: async ({ reservaId, token }) => {
    try {
      const urlApi = process.env.API_DELETE_RESERVATION ?? '';

      const requestBody = {
        id: parseInt(reservaId),
      };

      console.log("requestBody", requestBody)
      console.log("urlApi", urlApi)

      const response = await fetch(urlApi, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Error al borrar la reserva');
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      return { data };

    } catch (error) {
      console.error("Error al borrar la reserva:", error);
      throw error;
    }
  }
});
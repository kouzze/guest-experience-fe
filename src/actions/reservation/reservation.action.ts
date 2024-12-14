import { defineAction } from 'astro:actions';

export const postReservation = defineAction({
  handler: async ({ propertyId, userId, reservationDetails, token }) => {
    try {
      const urlApi = process.env.API_CREATE_RESERVATION ?? '';
      const dateStart = new Date().toISOString().split('T')[0];
      const dateEnd = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
      const price = reservationDetails.price;

      const requestBody = {
        date_start: dateStart,
        date_end: dateEnd,
        total: parseInt(price),
        propertyId: parseInt(propertyId),
        userId: parseInt(userId),
      };

      const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Error al crear la reserva');
      }

      const data = await response.json();
      return { data };

    } catch (error) {
      console.error("Error al crear la reserva:", error);
      throw error;
    }
  }
});
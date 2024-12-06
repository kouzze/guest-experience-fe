import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().min(2),
    password: z.string().min(2),
    remember_me: z.boolean().optional(),
  }),
  handler: async (input, { cookies }) => {
    const { name, email, password, remember_me } = input;

    const urlApi = process.env.API_REGISTER ?? '';

    const response = await fetch(urlApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    }).catch(error => {
      return { ok: false, msg: error.message };
    });

    if (!response.ok || !(response instanceof Response)) {
      return { ok: false, msg: 'Error en la solicitud' };
    }

    const data = await response.json();

    if (remember_me) {
      cookies.set('email', email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        path: '/',
      });
    } else {
      cookies.delete('email', { path: '/' });
    }

    return { ok: true, msg: 'Usuario Creado', data };
  },
});
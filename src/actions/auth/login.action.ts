import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import 'dotenv/config';

export const loginUser = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().min(2),
    password: z.string().min(2),
    remember_me: z.boolean().optional(),
  }),
  handler: async (input, { cookies }) => {
    const { email, password, remember_me } = input;

    const urlApi = process.env.API_LOGIN ?? '';

    const response = await fetch(urlApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).catch(error => {
      return { ok: false, msg: error.message };
    });

    if (!response.ok || !(response instanceof Response)) {
      return { ok: false, msg: 'Error en la solicitud' };
    }

    const data = await response.json();

    if (remember_me) {
      cookies.set('token', data.token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        path: '/',
      });
    } else {
      cookies.set('token', data.token, {
        path: '/',
      });
    }

    return { ok: true, msg: 'Inicio de sesión exitoso', data };
  },
});
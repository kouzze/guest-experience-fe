import { defineAction } from 'astro:actions';

export const logout = defineAction({
  accept: 'json',
  handler: async (_, { cookies }) => {
    cookies.delete('token', { path: '/' });
    cookies.delete('userId', { path: '/' });
    return { ok: true, msg: 'Logout exitoso' };
  }
})
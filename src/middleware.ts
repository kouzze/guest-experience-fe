import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro/middleware';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const privateRoutes = ['/protected'];
const notAuthRoutes = ['/login', '/register']
dotenv.config();

export const onRequest = defineMiddleware(async ({ url, redirect, cookies, locals }, next) => {
  let token = cookies.get('token')?.value ?? '';

  verifyToken(token, locals);

  if (!locals.isLoggedIn && privateRoutes.includes(url.pathname)) {
    return redirect('/');
  }
  if (locals.isLoggedIn && notAuthRoutes.includes(url.pathname)) {
    return redirect('/');
  }

  if (privateRoutes.includes(url.pathname)) {
    return checkAuth(locals, next);
  }
  return next();
});

const verifyToken = (token: string, locals: any) => {
  try {
    const secret = process.env.JWT_TOKEN;
    if (!secret) {
      throw new Error('JWT_SECRET no está definida en las variables de entorno');
    }

    const decoded = jwt.verify(token, secret);
    locals.isLoggedIn = true;
    locals.user = decoded;
  } catch (error) {
    locals.isLoggedIn = false;
  }
};

const checkAuth = (locals: any, next: MiddlewareNext) => {
  if (!locals.isLoggedIn) {
    return new Response('Login necesario', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Bearer' },
    });
  }

  return next();
};
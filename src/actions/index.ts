import { registerUser, loginUser, logout } from './auth';
import { getProperties } from './properties';
import { postReservation } from './reservation';

export const server = {
  registerUser,
  loginUser,
  logout,
  getProperties,
  postReservation
}
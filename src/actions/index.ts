import { registerUser, loginUser, logout } from './auth';
import { getProperties } from './properties';
import { deleteReservation, postReservation } from './reservation';

export const server = {
  registerUser,
  loginUser,
  logout,
  getProperties,
  postReservation,
  deleteReservation
}
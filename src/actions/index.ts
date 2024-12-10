import { registerUser, loginUser, logout } from './auth';
import { getProperties } from './properties';

export const server = {
  //actions

  //Auth
  registerUser,
  loginUser,
  logout,
  getProperties
}
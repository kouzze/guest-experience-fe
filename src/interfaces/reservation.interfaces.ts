
export interface Property {
  id: number;
  name: string;
  description: string;
  location: string;
  price_per_night: string;
  capacity: number;
  createdAt: string;
  status: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface ReservationList {
  id: number;
  date_start: string;
  date_end: string;
  total: string;
  status: string;
  property: Property;
  user: User;
}
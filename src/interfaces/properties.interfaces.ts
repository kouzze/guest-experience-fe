export interface Photo {
  id: number;
  url: string;
  description: string;
}

export interface PropertyList {
  id: number;
  name: string;
  description: string;
  location: string;
  price_per_night: string;
  capacity: number;
  createdAt: string;
  status: string;
  fotos: Photo[];
}
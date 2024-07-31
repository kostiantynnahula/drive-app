export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  ownerId: string;
  organizationId: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  url: string;
  carId: string;
}

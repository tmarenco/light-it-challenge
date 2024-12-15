export interface Patient {
  name: string;
  email: string;
  address: string;
  phone: number;
  photo: File | string;
  id?: number;
}
  
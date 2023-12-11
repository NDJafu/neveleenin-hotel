export interface User {
  id: string;
  username: string;
  role: string;
  avatar: string;
}

export interface Hotel {
  _id?: string;
  hotelName?: string;
  hotelAddress?: string;
  thumbnail?: string;
  images?: [];
  pricing?: string;
  tags?: string[];
}

export interface Room {
  _id?: string;
  roomSize: number;
  thumbnail: string;
  name: string;
  pricing: number;
}

export interface User {
  id: string;
  username: string;
  role: string;
  avatar: string;
}

export interface Hotel {
  _id: string;
  hotelName: string;
  hotelAddress: string;
  thumbnail: string;
  images: string[];
  membershipStatus: string;
  pricing: number;
  price: number;
  tags?: string[];
}

export interface Room {
  _id?: string;
  roomSize: number;
  thumbnail: string;
  name: string;
  pricing: number;
  price: number;
  hotelID: Hotel;
  images?: string[];
}

//Partnership

export type HotelBasicInfo = {
  hotelName: string;
  street: string;
  country: string;
  city: string;
};

export type CreateRoom = {
  name: string;
  price: number;
  roomNumber: number;
  images: string[];
  amenities: string[];
};

export type Service = {
  _id: string;
  name: string;
  description: string;
};

export type Amenity = {
  _id: string;
  name: string;
  description: string;
  category?: string;
};

export type Policy = {
  _id: string;
  name: string;
  description: string;
};

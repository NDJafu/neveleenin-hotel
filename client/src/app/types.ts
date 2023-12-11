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
  thumbNail?: string;
  images?: [];
  pricing?: string;
  tags?: string[];
}

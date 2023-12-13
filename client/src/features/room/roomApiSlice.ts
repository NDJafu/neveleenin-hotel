import { apiSlice } from "../../app/apiSlice";
import { Room } from "../../app/types";

const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query<Room[], string>({
      query: (id) => `/room/getRoomsByHotel/${id}`,
    }),
    getRoomById: builder.query<Room, string>({
      query: (id) => `/room/${id}`,
    }),
  }),
});

export const { useGetRoomsQuery, useGetRoomByIdQuery } = roomApiSlice;

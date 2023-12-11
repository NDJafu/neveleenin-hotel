import { apiSlice } from "../../app/apiSlice";
import { Room } from "../../app/types";

const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query<Room[], string>({
      query: (id) => `/room/getRoomsByHotel/${id}`,
    }),
  }),
});

export const { useGetRoomsQuery } = hotelApiSlice;

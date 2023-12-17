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
    createRoom: builder.mutation({
      query: (room) => ({
        url: "/room/create",
        method: "POST",
        body: { ...room },
      }),
    }),
  }),
});

export const { useGetRoomsQuery, useGetRoomByIdQuery, useCreateRoomMutation } =
  roomApiSlice;

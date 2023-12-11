import { apiSlice } from "../../app/apiSlice";
import { Hotel } from "../../app/types";

const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHotelListings: builder.query<Hotel[], void>({
      query: () => "/hotel/getall",
    }),
    getHotelById: builder.query<Hotel, string>({
      query: (id) => `/hotel/${id}`,
    }),
  }),
});

export const { useGetHotelListingsQuery, useGetHotelByIdQuery } = hotelApiSlice;

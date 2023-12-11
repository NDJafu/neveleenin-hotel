import { apiSlice } from "../../app/apiSlice";
import { Hotel } from "../../app/types";

export const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHotelListings: builder.query<Hotel[], void>({
      query: () => "/hotel/getall",
    }),
  }),
});

export const { useGetHotelListingsQuery } = hotelApiSlice;

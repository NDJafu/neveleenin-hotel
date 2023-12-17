import { apiSlice } from "../../app/apiSlice";
import { Amenity, Hotel, Policy, Service } from "../../app/types";

const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHotelListings: builder.query<Hotel[], void>({
      query: () => "/hotel/getall",
      providesTags: ["hotels"],
    }),
    getHotelById: builder.query<Hotel, string>({
      query: (id) => `/hotel/${id}`,
    }),
    getAllServices: builder.query<Service[], void>({
      query: () => "/service/getall",
    }),
    getAllAmenities: builder.query<Amenity[], void>({
      query: () => "/amenities/getall",
    }),
    getAllPolicies: builder.query<Policy[], void>({
      query: () => "/policy/getall",
    }),
    createHotel: builder.mutation({
      query: (hotel) => ({
        url: "/hotel/create",
        method: "POST",
        body: { ...hotel },
      }),
      invalidatesTags: ["hotels"],
    }),
  }),
});

export const {
  useGetHotelListingsQuery,
  useGetHotelByIdQuery,
  useGetAllServicesQuery,
  useGetAllAmenitiesQuery,
  useGetAllPoliciesQuery,
  useCreateHotelMutation,
} = hotelApiSlice;

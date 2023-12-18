import { apiSlice } from "../../app/apiSlice";
import { Reservation } from "../../app/types";

const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReservationById: builder.query<any, string>({
      query: (id) => `/reservation/${id}`,
    }),
    createReservation: builder.mutation<
      { message: string; reservation: Reservation },
      Reservation
    >({
      query: (reservation) => ({
        url: "/reservation/create",
        method: "POST",
        body: { ...reservation },
      }),
    }),
    deleteReservation: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/reservation/${id}`,
        method: "DELETE",
      }),
    }),
    createPayment: builder.mutation<
      void,
      { reservationID: string; paymentMethod: "CREDIT_CARD" | "CASH" }
    >({
      query: (invoice) => ({
        url: "/invoice/create",
        method: "POST",
        body: { ...invoice },
      }),
    }),
  }),
});

export const {
  useGetReservationByIdQuery,
  useCreateReservationMutation,
  useDeleteReservationMutation,
  useCreatePaymentMutation,
} = bookingApiSlice;

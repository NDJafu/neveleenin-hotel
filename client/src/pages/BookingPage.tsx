import { useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IoIosBed } from "react-icons/io";
import { FaUtensils } from "react-icons/fa6";
import { useGetRoomByIdQuery } from "../features/room/roomApiSlice";
import {
  useCreateReservationMutation,
  useDeleteReservationMutation,
} from "../features/booking/bookingApiSlice";
import { StringFormat } from "firebase/storage";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingParams, setBookingParams] = useSearchParams();
  const nights = bookingParams.get("nights") ?? 1;
  const [contactForm, setContactForm] = useState({
    fullName: "",
    number: "(+84)",
    email: "",
  });
  const { data: room } = useGetRoomByIdQuery(id!);
  const [createReservation] = useCreateReservationMutation();

  function convertToDateType(input: string | null) {
    if (input == null) return;
    const parts = input.split("/");
    return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
  }

  function formatDate(inputDate: string | null) {
    const formattedDate = convertToDateType(inputDate);

    if (formattedDate)
      return formattedDate.toLocaleDateString("en-US", {
        weekday: "short", // E
        day: "2-digit", // dd
        month: "short", // Dec
        year: "numeric", // YYYY
      });
  }

  const confirmReservation = async () => {
    await createReservation({
      roomID: id!,
      guestName: contactForm.fullName,
      email: contactForm.email,
      checkInTime: convertToDateType(bookingParams.get("checkin"))!,
      checkOutTime: convertToDateType(bookingParams.get("checkout"))!,
      totalAmount: Math.round(room?.price! * +nights * 1.1),
    })
      .unwrap()
      .then((response) => navigate(`/payment/${response.reservation._id}`));
  };

  return (
    <div className="w-3/5 mx-auto grid grid-cols-3 gap-4">
      <div className="col-span-full mt-10">
        <h1 className="text-3xl text-neutral-900 font-semibold">
          Contact Details
        </h1>
        <p className="text-sm text-neutral-500 text my-4">
          The contact details will be used to send the e-voucher and for
          refund/reschedule purposes.
        </p>
      </div>
      <div className="col-span-2 py-6 px-4 bg-white rounded-lg flex flex-col gap-5 h-fit">
        <input
          type="text"
          className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none"
          placeholder="Full Name"
          value={contactForm.fullName}
          onChange={(e) =>
            setContactForm((prev) => ({ ...prev, fullName: e.target.value }))
          }
        />
        <input
          type="tel"
          className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none"
          placeholder="Mobile Number"
          value={contactForm.number}
          onChange={(e) =>
            setContactForm((prev) => ({ ...prev, number: e.target.value }))
          }
        />
        <input
          type="email"
          className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none"
          placeholder="Email Address"
          value={contactForm.email}
          onChange={(e) =>
            setContactForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
      <div className="bg-white p-4 flex flex-col divide-y divide-neutral-300 gap-4 rounded-lg">
        <div className="flex items-center gap-2.5 text-neutral-900 font-semibold">
          <img
            src={room?.hotelID.thumbnail ?? room?.hotelID.images?.[0]}
            alt="hotel_img"
            className="w-12 aspect-square rounded"
          />
          {room?.hotelID.hotelName}
        </div>
        <div className="text-neutral-500 pt-4">
          <p>Check in: {formatDate(bookingParams.get("checkin"))}</p>
          <p>Check out: {formatDate(bookingParams.get("checkout"))}</p>
          <p>
            {nights} Nights | {bookingParams.get("rooms")} Room
          </p>
        </div>
        <div className="text-neutral-500 text-sm pt-4 leading-relaxed">
          <p>
            Hotel tax: <span className="float-right">Included</span>
          </p>
          <p>
            Tax and other fees:{" "}
            <span className="float-right">
              US${Math.round(room?.pricing ?? room?.price! * 0.1 * +nights)}
            </span>
          </p>
          <p className="text-neutral-900 text-lg font-semibold">
            Total:{" "}
            <span className="float-right">
              US${Math.round(room?.pricing ?? room?.price! * 1.1 * +nights)}
            </span>
          </p>
        </div>
      </div>
      <div className="col-span-full">
        <h1 className="text-3xl text-neutral-900 font-semibold">
          Room Details
        </h1>
        <p className="text-sm text-neutral-500 text my-4">
          Double check your booking before proceeding to payments.
        </p>
      </div>
      <div className="col-span-2 py-6 px-4 bg-white rounded-lg flex flex-col gap-4 h-fit">
        <div>
          <h3 className="text-neutral-900 text-lg font-medium">{room?.name}</h3>
          <span className="text-sm text-neutral-500">
            This room cannot be canceled/refund
          </span>
          <div className="text-neutral-700 my-2 flex gap-2">
            <BsPeopleFill size={22} /> Guest/room: 2
          </div>
          <div className="text-neutral-700 my-2 flex gap-2">
            <IoIosBed size={22} /> Bed: King Size
          </div>
          <div className="text-neutral-700 my-2 flex gap-2">
            <FaUtensils size={22} /> Breakfast: Not Included
          </div>
        </div>
        <span className="w-full h-[1px] bg-neutral-300" />
        <p className="text-yellow-500 underline">Any special request?</p>
      </div>
      <div className="col-span-2 py-6 px-4 bg-white rounded-lg flex justify-between h-fit items-center">
        <div className="flex flex-col gap-4">
          <p className="text-neutral-900 font-medium">Total:</p>
          <p className="text-xl text-red-500 font-bold">
            US${Math.round(room?.price! * +nights * 1.1)}
          </p>
        </div>
        <div className="flex h-fit gap-2.5 font-semibold">
          <button
            className="bg-blue-200 text-blue-900 px-6 py-3 rounded-full"
            onClick={confirmReservation}
          >
            Continue to payment
          </button>
          <button
            className="bg-red-100 text-red-500 px-6 py-3 rounded-full"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

import { useState } from "react";
import back from "../assets/cvv.svg";
import { BsQuestionCircleFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreatePaymentMutation,
  useDeleteReservationMutation,
  useGetReservationByIdQuery,
} from "../features/booking/bookingApiSlice";
import { Room } from "../app/types";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: reservation } = useGetReservationByIdQuery(id!);
  const [cardInformation, setCardInformation] = useState({
    number: "",
    cardholder: "",
    valid: "",
    cvv: "",
  });
  console.log(reservation);
  const [deleteReservation] = useDeleteReservationMutation();
  const [createPayment] = useCreatePaymentMutation();

  return (
    <div className="mx-auto w-2/5 my-10">
      <div className="bg-white p-4 rounded-lg flex flex-col gap-4 relative">
        <span className="absolute top-4 right-4 text-sm text-neutral-500">
          Reservation/Booking ID: {id}
        </span>
        <h1 className="text-neutral-900 font-semibold text-2xl">
          Credit card/Debit card
        </h1>
        <form
          className="flex flex-wrap gap-4 items-center"
          onSubmit={async (e) => {
            e.preventDefault();
            await createPayment({
              reservationID: id!,
              paymentMethod: "CREDIT_CARD",
            })
              .unwrap()
              .finally(() => navigate("/booking-complete"));
          }}
        >
          <input
            type="text"
            className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none w-2/3"
            placeholder="Card Number"
            value={cardInformation.number}
            onChange={(e) =>
              setCardInformation((prev) => ({
                ...prev,
                number: e.target.value,
              }))
            }
          />
          <input
            type="text"
            className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none w-2/3"
            placeholder="Cardholder Name"
            value={cardInformation.cardholder}
            onChange={(e) =>
              setCardInformation((prev) => ({
                ...prev,
                cardholder: e.target.value,
              }))
            }
          />
          <label className="w-1/3 text-neutral-700">
            Valid till:
            <input
              type="text"
              className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none "
              placeholder="DD/MM/YY"
              value={cardInformation.valid}
              onChange={(e) =>
                setCardInformation((prev) => ({
                  ...prev,
                  valid: e.target.value,
                }))
              }
            />
          </label>
          <label className="w-1/3 text-neutral-700">
            CVV/CVC:
            <input
              type="text"
              className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none"
              placeholder="3-digits Number"
              value={cardInformation.cvv}
              onChange={(e) =>
                setCardInformation((prev) => ({
                  ...prev,
                  cvv: e.target.value,
                }))
              }
            />
          </label>
          <div className="group mt-5 w-fit relative">
            <div className="absolute bottom-11 hidden group-hover:block bg-white drop-shadow rounded-lg px-4 py-2 w-96 text-neutral-500 text-sm transition">
              CVV/CVN, also known as CVC/CID: <br />
              Can be found at the back of VISA/Mastercard/JCB cards (last 3
              digits) <br />
              Or infront of Amex cards (4 digits).
              <img src={back} />
            </div>
            <BsQuestionCircleFill
              size={20}
              className="fill-neutral-500 hover:fill-black transition-colors duration-500"
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-neutral-900 font-semibold text-2xl text-right">
              Price Details
            </h1>
            <p className="text-neutral-700">
              {reservation?.roomID.name},{" "}
              {reservation?.roomID.hotelID.hotelName}
              <span className="float-right">US${reservation?.totalAmount}</span>
            </p>
            <span className="w-full h-[1px] bg-neutral-300" />
            <p className="text-lg font-semibold text-yellow-500">
              Total:
              <span className="float-right">US${reservation?.totalAmount}</span>
            </p>
          </div>
          <button
            className="px-6 py-3 bg-red-100 text-red-500 rounded-full ml-auto font-semibold"
            onClick={async () => {
              await deleteReservation(id!)
                .unwrap()
                .finally(() => navigate(-2));
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-green-100 text-green-700 rounded-full font-semibold"
          >
            Confirm Payment
          </button>
          <p className="text-xs text-neutral-500 ml-auto">
            By clicking the button, you have agreed to Terms & Conditions and
            Privacy Policy of nevelenin.com
          </p>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;

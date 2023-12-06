import { useParams } from "react-router-dom";
import fluent_location from "../assets/location-filled.svg";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { BsCalendar3 } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import GuestOptions from "../components/Detail/GuestOptions";

const HotelDetailsPage = () => {
  const { id } = useParams();
  const [dates, setDates] = useState<DateObject[]>([
    new DateObject(),
    new DateObject().add(1, "days"),
  ]);
  const nights = dates.length > 1 ? dates[1].day - dates[0].day : 0;
  const [guests, setGuests] = useState({
    rooms: 1,
    adults: 1,
    childrens: 0,
  });

  const [showGuestModal, setShowGuestModal] = useState(false);

  const guestString = () => {
    let result = `${guests.rooms} Room`;
    if (guests.rooms > 1) result += "s";
    const numberOfGuests = guests.adults + guests.childrens;
    result += `, ${numberOfGuests} Guest`;
    if (numberOfGuests > 1) result += "s";
    return result;
  };

  return (
    <main className="mx-24">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-4xl text-neutral-900">
            Sussy Amongus Hotel
          </h1>
          <p className="inline-flex items-center text-neutral-500 gap-2">
            <img src={fluent_location} />
            NYC, Queen
          </p>
        </div>
        <p className="text-2xl text-green-700 font-medium">
          170-248$/
          <span className="text-xl text-neutral-500">Night</span>
        </p>
      </div>
      {/* Gallery */}
      <div className="w-full aspect-[3/1] bg-black my-11"></div>
      {/* Date & Guests Picker */}
      <div className="flex justify-center items-center gap-5">
        <div className="flex items-center border-2 border-neutral-500 rounded-full px-2 py-1.5">
          <BsCalendar3 size={20} className="mr-2 fill-neutral-500" />
          <DatePicker
            calendarPosition="top-center"
            inputClass="text-neutral-500 font-semibold outline-none"
            range
            dateSeparator=" - "
            format="MM/DD/YYYY"
            numberOfMonths={2}
            value={dates}
            onChange={(date) => {
              if (date) setDates(date as DateObject[]);
            }}
          />
          <span className="text-white font-semibold bg-neutral-500 px-2 rounded-full">
            {nights} nights
          </span>
        </div>
        <button
          className="border-2 border-neutral-500 rounded-full px-3 py-1.5 text-neutral-500 font-semibold"
          onClick={() => setShowGuestModal(true)}
        >
          {guestString()}
        </button>
        {showGuestModal && (
          <>
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setShowGuestModal(false)}
            />
            <div className="fixed inset-0 flex justify-center items-center">
              <div className="px-8 py-4 w-1/4 h-fit bg-white rounded-lg relative text-neutral-900 font-medium">
                <AiOutlineClose
                  className="absolute right-4"
                  size={24}
                  onClick={() => setShowGuestModal(false)}
                />
                <h3 className="my-6 text-2xl">Room and Guests</h3>
                <GuestOptions
                  value={guests}
                  setValue={setGuests}
                  close={() => setShowGuestModal(false)}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {/* Rooms */}
      <section className="my-8">
        <div className="h-[1px] w-8 bg-yellow-500 mx-auto" />
        <p className="text-yellow-500 text-center">Rooms</p>
        <h2 className="text-neutral-900 font-semibold text-center text-3xl my-1">
          Available Rooms
        </h2>
        <div className="flex flex-col gap-5 py-5 w-2/3 bg-black/5 mx-auto text-2xl">
          <div className="flex flex-col bg-black/5 gap-4">
            <h3>Imposter Room</h3>
            <div className="flex gap-6">
              <div className="aspect-[2/1] h-72 bg-black/5" />
              <div className="flex flex-col gap-5 my-1">
                <h5 className="text-xl text-neutral-700">
                  1 Beds, Double Room
                </h5>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HotelDetailsPage;

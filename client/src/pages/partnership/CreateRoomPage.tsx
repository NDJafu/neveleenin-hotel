import { LiaBedSolid } from "react-icons/lia";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import CreateRoomForm from "../../components/Partnership/CreateRoomForm";
import { removeRoom } from "../../features/partnership/partnershipSlice";

const CreateRoomPage = () => {
  const { hotelName, street, country, city } = useAppSelector(
    (state) => state.partnership.basicInfo
  );
  const dispatch = useAppDispatch();

  const basicInfoIsEmpty =
    hotelName.length == 0 ||
    street.length == 0 ||
    country.length == 0 ||
    city.length == 0;

  if (basicInfoIsEmpty) return <Navigate to="../basic-information" />;

  const { rooms } = useAppSelector((state) => state.partnership);
  const [createRoomActive, setCreateRoomActive] = useState(false);

  return (
    <div className="w-3/5 mx-auto my-10">
      <h1 className="text-3xl font-bold text-neutral-900">Layout & Pricing</h1>
      {!createRoomActive ? (
        <p className="text-neutral-500 my-2">
          Tell us about your first room. After entering all the necessary info,
          you can fill in the details of your other rooms.
        </p>
      ) : (
        <button
          className="text-neutral-700 font-semibold my-2"
          onClick={() => setCreateRoomActive(false)}
        >
          Back to overview
        </button>
      )}
      {!createRoomActive ? (
        !(rooms.length > 0) ? (
          <div className="w-4/5 bg-white text-black/70 flex flex-col justify-center items-center py-12 gap-4 rounded-xl">
            <LiaBedSolid size={64} />
            <p className="w-1/2 text-center">
              No room have been added to your hotel - start adding room to
              describe bed options, layout, and pricing for guests.
            </p>
            <button
              className="bg-blue-200 text-blue-900 px-6 py-3 font-semibold rounded-full"
              onClick={() => setCreateRoomActive(true)}
            >
              Add room
            </button>
          </div>
        ) : (
          <div className="w-4/5 flex flex-col gap-2">
            {rooms.map((room, index) => (
              <div
                key={index}
                className="bg-white rounded-lg flex items-center px-5 h-20 justify-between text-neutral-700 font-medium"
              >
                {room.name}
                <div className="flex gap-2">
                  Number of this type: {room.roomNumber}
                  <button onClick={() => dispatch(removeRoom(index))}>
                    Remove room
                  </button>
                </div>
              </div>
            ))}
            <div className="flex ml-auto gap-2">
              <button
                className="bg-blue-200 text-blue-900 px-6 py-3 font-semibold rounded-full"
                onClick={() => setCreateRoomActive(true)}
              >
                Add another room
              </button>
              <Link
                className="bg-green-100 text-green-700 px-6 py-3 font-semibold rounded-full"
                to="../facilities"
              >
                Continue
              </Link>
            </div>
          </div>
        )
      ) : (
        <CreateRoomForm finish={() => setCreateRoomActive(false)} />
      )}
    </div>
  );
};

export default CreateRoomPage;

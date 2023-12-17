import { useState } from "react";
import {
  addPolicy,
  removePolicy,
} from "../../features/partnership/partnershipSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { useCreateHotelMutation } from "../../features/hotel/hotelApiSlice";
import { useCreateRoomMutation } from "../../features/room/roomApiSlice";
import { Navigate, useNavigate } from "react-router-dom";

const AddPoliciesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [createHotel] = useCreateHotelMutation();
  const [createRoom] = useCreateRoomMutation();
  const { basicInfo, rooms, services, images, policies } = useAppSelector(
    (state) => state.partnership
  );

  const submitRegistration = async () => {
    setLoading(true);
    await createHotel({
      ...basicInfo,
      hotelAddress: [basicInfo.street, basicInfo.city, basicInfo.country].join(
        ", "
      ),
      services,
      policies,
      images,
    })
      .unwrap()
      .then(async (response) => {
        await Promise.all(
          rooms.map(async (room) => {
            await createRoom({
              ...room,
              hotelID: response.hotel._id,
              roomSize: 300,
            });
          })
        )
          .then(() => {
            navigate("../complete");
            setLoading(false);
          })
          .catch((error: any) => {
            setLoading(false);
            console.log(error);
          });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (images.length == 0) return <Navigate to="../photos" />;

  return (
    <div className="w-3/5 mx-auto my-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-neutral-900">Policies</h1>
      <p className="text-neutral-500">
        Specify some basic policies. Do you allow smoking or pets? After this,
        your hotel is created.
      </p>
      <div className="w-4/5 bg-white text-black/70 flex flex-col p-4 gap-4 rounded-xl text-neutral-500">
        <h2 className="text-xl text-neutral-700">Pets</h2>
        <label>Do you allow pets?</label>
        <select
          className="px-6 py-3 border border-neutral-300 rounded-lg outline-none w-1/2 text-neutral-700"
          onChange={(e) => {
            if (e.target.value == "yes") {
              dispatch(addPolicy("657dcde5b7656691f01f51b7"));
            } else {
              dispatch(removePolicy("657dcde5b7656691f01f51b7"));
            }
          }}
        >
          <option value={"no"}>No</option>
          <option value={"yes"}>Yes</option>
        </select>
      </div>
      <div className="w-4/5 bg-white text-black/70 flex flex-col p-4 gap-4 rounded-xl text-neutral-500">
        <h2 className="text-xl text-neutral-700">Smoking</h2>
        <label>Do you allow smoking?</label>
        <select
          className="px-6 py-3 border border-neutral-300 rounded-lg outline-none w-1/2 text-neutral-700"
          onChange={(e) => {
            if (e.target.value == "yes") {
              dispatch(addPolicy("657dcde5b7656691f01f51b8"));
            } else {
              dispatch(removePolicy("657dcde5b7656691f01f51b8"));
            }
          }}
        >
          <option value={"no"}>No</option>
          <option value={"yes"}>Yes</option>
        </select>
        <button
          className="w-fit py-3 px-6 bg-green-100 text-green-700 font-semibold ml-auto rounded-full 
          disabled:bg-black/20 disabled:text-neutral-500"
          onClick={submitRegistration}
          disabled={loading}
        >
          Complete Registration
        </button>
      </div>
    </div>
  );
};

export default AddPoliciesPage;

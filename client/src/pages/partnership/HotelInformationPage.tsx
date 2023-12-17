import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { setBasicInfo } from "../../features/partnership/partnershipSlice";
import { useNavigate } from "react-router-dom";

const HotelInformationPage = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const form = useAppSelector((state) => state.partnership.basicInfo);
  const dispatch = useAppDispatch();

  return (
    <div className="w-3/5 mx-auto my-10">
      <h1 className="text-3xl font-bold text-neutral-900">
        Welcome {currentUser?.username}
      </h1>
      <p className="text-neutral-500 my-2">
        Start by telling us your hotel's name and address
      </p>
      <form
        className="bg-white p-4 rounded-xl flex flex-col gap-2 w-4/5"
        onSubmit={async (e) => {
          e.preventDefault();
          navigate("../create-room");
        }}
      >
        <h2 className="text-xl text-neutral-700">
          What's the name of your hotel?
        </h2>
        <input
          type="text"
          className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none w-1/2"
          placeholder="Hotel Name"
          value={form?.hotelName}
          onChange={(e) =>
            dispatch(setBasicInfo({ ...form, hotelName: e.target.value }))
          }
          required
        />
        <h2 className="text-xl text-neutral-700">
          Where's your hotel located?
        </h2>
        <label className="text-sm text-neutral-500">Street address</label>
        <input
          type="text"
          className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none w-1/2"
          placeholder="e.g 123 Easy Street"
          value={form?.street}
          onChange={(e) =>
            dispatch(setBasicInfo({ ...form, street: e.target.value }))
          }
          required
        />
        <label className="text-sm text-neutral-500">Country/Region</label>
        <input
          type="text"
          className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none w-1/2"
          placeholder="Enter country/region"
          value={form?.country}
          onChange={(e) =>
            dispatch(setBasicInfo({ ...form, country: e.target.value }))
          }
          required
        />
        <label className="text-sm text-neutral-500">City</label>
        <input
          type="text"
          className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none w-1/2"
          placeholder="e.g New York City"
          value={form?.city}
          onChange={(e) =>
            dispatch(setBasicInfo({ ...form, city: e.target.value }))
          }
          required
        />
        <div className="w-1/2">
          <button
            type="submit"
            className="w-fit py-3 px-6 bg-green-100 text-green-700 font-semibold float-right rounded-full"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelInformationPage;

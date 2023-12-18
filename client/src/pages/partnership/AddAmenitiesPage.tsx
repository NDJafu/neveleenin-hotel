import { Link, Navigate } from "react-router-dom";
import Accordion from "../../components/Partnership/amenities/Accordion";
import { useAppSelector } from "../../utils/hooks";

const AddAmenitiesPage = () => {
  const rooms = useAppSelector((state) => state.partnership.rooms);

  if (rooms.length == 0) return <Navigate to="../facilities" />;

  return (
    <div className="w-3/5 mx-auto my-10">
      <h1 className="text-3xl font-bold text-neutral-900">Amenities</h1>
      <p className="text-neutral-500 my-2">
        You're almost done! We just need a few more details about the amenities
        or specific features and services available.
      </p>
      <div className="w-4/5 bg-white text-black/70 flex flex-col p-4 gap-4 rounded-xl text-neutral-500">
        <h2 className="text-xl text-neutral-700">Amenities</h2>
        <p className="text-sm">Tell us about your amenities</p>
        <div className="flex flex-col border divide-y">
          <Accordion trigger="Bathroom item" />
          <Accordion trigger="General amenity" />
          <Accordion trigger="Outdoors and views" />
        </div>
        <Link
          className="bg-green-100 text-green-700 px-6 py-3 font-semibold rounded-full w-fit ml-auto"
          to="../photos"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default AddAmenitiesPage;

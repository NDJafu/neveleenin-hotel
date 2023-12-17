import { Navigate } from "react-router-dom";
import BreakfastSelect from "../../components/Partnership/services/BreakfastSelect";
import ParkingSelect from "../../components/Partnership/services/ParkingSelect";
import PopularFacilitiesSelect from "../../components/Partnership/services/PopularFacilitiesSelect";
import { useAppSelector } from "../../utils/hooks";

const AddServicesPage = () => {
  const rooms = useAppSelector((state) => state.partnership.rooms);

  if (!(rooms.length > 0)) return <Navigate to="../create-room" />;

  return (
    <div className="w-3/5 mx-auto my-10">
      <h1 className="text-3xl font-bold text-neutral-900">
        Facilities & Services
      </h1>
      <p className="text-neutral-500 my-2">
        Now let us know some general details about your property like facilities
        available, internet and parking
      </p>
      <div className="flex flex-col gap-4">
        <ParkingSelect />
        <BreakfastSelect />
        <PopularFacilitiesSelect />
      </div>
    </div>
  );
};

export default AddServicesPage;

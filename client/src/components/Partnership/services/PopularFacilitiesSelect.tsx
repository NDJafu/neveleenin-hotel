import { useGetAllServicesQuery } from "../../../features/hotel/hotelApiSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import {
  addService,
  removeService,
} from "../../../features/partnership/partnershipSlice";
import { Link } from "react-router-dom";

const PopularFacilitiesSelect = () => {
  const dispatch = useAppDispatch();
  const { data: services } = useGetAllServicesQuery();
  const currentServices = useAppSelector((state) => state.partnership.services);

  return (
    <div className="w-4/5 bg-white text-black/70 flex flex-col p-4 gap-4 rounded-xl text-neutral-500">
      <h2 className="text-xl text-neutral-700 col-span-full">
        Facilities That Are Popular with guests
      </h2>
      <p className="col-span-full">
        Guest look for these facilities the most when they're searching for
        hotels
      </p>
      <div className="grid grid-cols-2 gap-6">
        {services?.map((service) => {
          if (service.name != "Breakfast" && service.name != "Parking")
            return (
              <label
                key={service._id}
                className="flex gap-2 items-center border-b border-neutral-300 pb-4"
              >
                <input
                  type="checkbox"
                  value={service._id}
                  checked={currentServices.includes(service._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      dispatch(addService(service._id));
                    } else {
                      dispatch(removeService(service._id));
                    }
                  }}
                />
                {service.name}
              </label>
            );
        })}
      </div>
      <Link
        to="../amenities"
        className="bg-green-100 text-green-700 px-6 py-3 font-semibold rounded-full w-fit ml-auto"
      >
        Continue
      </Link>
    </div>
  );
};

export default PopularFacilitiesSelect;

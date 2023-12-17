import { useState } from "react";
import { useGetAllAmenitiesQuery } from "../../../features/hotel/hotelApiSlice";
import { AiOutlineDown } from "react-icons/ai";
import AmenitiesSelect from "./AmenitiesSelect";

const Accordion = ({ trigger }: { trigger: string }) => {
  const [active, setActive] = useState(false);
  const { data: amenities } = useGetAllAmenitiesQuery();

  return (
    <div
      className={`bg-black/5 group ${active ? "is-active" : ""} duration-500`}
    >
      <div className="flex items-center justify-between p-4 text-black/50">
        <p>{trigger}</p>
        <button onClick={() => setActive(!active)}>
          <AiOutlineDown
            size={24}
            className="group-[.is-active]:rotate-180 duration-500"
          />
        </button>
      </div>
      <div className="overflow-hidden max-h-0 group-[.is-active]:max-h-fit bg-white duration-500 transition-all">
        {amenities?.map((amenity) => {
          if (amenity.category == trigger)
            return <AmenitiesSelect key={amenity._id} {...amenity} />;
        })}
      </div>
    </div>
  );
};

export default Accordion;

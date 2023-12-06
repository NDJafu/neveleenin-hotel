import { BestDeals, Popular } from "../common/Badges";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

export type Hotel = {
  id: string;
  name: string;
  location: string;
  image: string;
  pricing: number;
  tags?: string[];
};

const Hotel = ({ id, name, location, image, pricing, tags }: Hotel) => {
  return (
    <div className="flex gap-8">
      <div className="relative">
        <img src={image} className="object-cover w-52 h-36 rounded-xl" />
        <div className="absolute bottom-1 right-1">
          {tags?.includes("popular") && <Popular />}
          {tags?.includes("best-deal") && <BestDeals />}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-1/2 py-4">
        <h3 className="text-xl text-neutral-900 font-medium">{name}</h3>
        <p className="flex items-center text-neutral-500 gap-2 text-sm font-normal">
          <FaMapLocationDot size={20} /> {location}
        </p>
      </div>
      <div className="flex flex-col gap-8 py-4">
        <p className="text-green-700 text-2xl font-medium">
          {pricing}$/<span className="text-neutral-500 text-xl">Night</span>
        </p>
        <Link
          to={`/detail/${id}`}
          className="px-6 py-3 bg-green-100 text-green-700 font-semibold rounded-full"
        >
          Book now
        </Link>
      </div>
    </div>
  );
};

export default Hotel;
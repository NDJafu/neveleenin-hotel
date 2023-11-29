import SearchFilter from "../components/Listings/SearchFilter";
import example from "../assets/kingford.png";
import { Link, useSearchParams } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";
import { Popular } from "../components/common/Badges";

const BrowseHotelsPage = () => {
  const [params, setParams] = useSearchParams();

  return (
    <div className="flex">
      <SearchFilter />
      <section className="flex flex-col gap-11 w-2/3">
        <div className="flex gap-8">
          <div className="relative">
            <img src={example} className="object-cover w-52 h-36 rounded-xl" />
            <div className="absolute bottom-1 right-1">
              <Popular />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/2 py-4">
            <h3 className="text-xl text-neutral-900 font-medium">Hotel 1</h3>
            <p className="flex items-center text-neutral-500 gap-3 text-sm font-normal">
              <FaMapLocationDot size={18} /> NYC, Queen
            </p>
          </div>
          <div className="flex flex-col gap-8 py-4">
            <p className="text-green-700 text-2xl font-medium">
              100$/<span className="text-neutral-500 text-xl">Night</span>
            </p>
            <Link
              to={""}
              className="px-6 py-3 bg-green-100 text-green-700 font-semibold rounded-full"
            >
              Book now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrowseHotelsPage;

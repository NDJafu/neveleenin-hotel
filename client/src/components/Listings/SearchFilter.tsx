import PriceFilterSlider from "./PriceFilterSlider";
import RatingFilter from "./RatingFilter";
import { BestDeals, Popular } from "../common/Badges";

const SearchFilter = () => {
  return (
    <div className="bg-white p-6 text-neutral-900 w-72 rounded-xl drop-shadow flex flex-col gap-4 mx-5 h-fit sticky top-6">
      <h1 className="text-2xl font-semibold text-center">Filter</h1>
      <PriceFilterSlider />
      <RatingFilter />
      <div className="flex flex-col gap-2">
        <h3 className="text-lg">Group by</h3>
        <Popular />
        <BestDeals />
      </div>
      <button className="text-yellow-500 text-sm underline">
        More Options
      </button>
    </div>
  );
};

export default SearchFilter;

import { useSearchParams } from "react-router-dom";
import PriceFilterSlider from "./PriceFilterSlider";
import RatingFilter from "./RatingFilter";

const SearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="bg-white p-6 text-neutral-900 w-72 rounded-xl drop-shadow flex flex-col gap-4 mx-5">
      <h1 className="text-2xl font-semibold text-center">Filter</h1>
      <PriceFilterSlider
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <RatingFilter
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default SearchFilter;

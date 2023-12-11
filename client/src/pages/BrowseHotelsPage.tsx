import SearchFilter from "../components/Listings/SearchFilter";
import example from "../assets/kingford.png";
import { useSearchParams } from "react-router-dom";
import Hotel from "../components/Listings/Hotel";
import { useGetHotelListingsQuery } from "../features/hotel/hotelApiSlice";
import { Hotel as HotelType } from "../app/types";

const BrowseHotelsPage = () => {
  const [params, setParams] = useSearchParams();
  const { data: hotels, isLoading } = useGetHotelListingsQuery();

  return (
    <div className="flex">
      <SearchFilter />
      <section className="flex flex-col gap-11 w-2/3">
        {isLoading
          ? "Loading..."
          : hotels?.map((hotel: HotelType, index) => (
              <Hotel key={index} {...hotel} />
            ))}
      </section>
    </div>
  );
};

export default BrowseHotelsPage;

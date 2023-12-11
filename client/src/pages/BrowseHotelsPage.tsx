import SearchFilter from "../components/Listings/SearchFilter";
import example from "../assets/kingford.png";
import { useSearchParams } from "react-router-dom";
import Hotel from "../components/Listings/Hotel";
import { useGetHotelListingsQuery } from "../features/hotel/hotelSlice";
import { Hotel as HotelType } from "../app/types";

const BrowseHotelsPage = () => {
  const [params, setParams] = useSearchParams();
  const { data: hotels } = useGetHotelListingsQuery();

  return (
    <div className="flex">
      <SearchFilter />
      <section className="flex flex-col gap-11 w-2/3">
        {hotels && hotels.map((hotel: HotelType) => <Hotel {...hotel} />)}
      </section>
    </div>
  );
};

export default BrowseHotelsPage;

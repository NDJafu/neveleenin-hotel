import SearchFilter from "../components/Listings/SearchFilter";
import example from "../assets/kingford.png";
import { useSearchParams } from "react-router-dom";
import Hotel from "../components/Listings/Hotel";

const BrowseHotelsPage = () => {
  const [params, setParams] = useSearchParams();

  const hotel = {
    id: "1231283273",
    name: "Hotel 1",
    location: "NYC, Queen",
    image: example,
    pricing: 200,
  };

  return (
    <div className="flex">
      <SearchFilter />
      <section className="flex flex-col gap-11 w-2/3">
        <Hotel {...hotel} />
      </section>
    </div>
  );
};

export default BrowseHotelsPage;

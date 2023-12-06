import eurasia from "../../assets/eurasia.png";
import kingford from "../../assets/kingford.png";
import treacy from "../../assets/treacy.png";
import orchid from "../../assets/orchid.png";
import { BestDeals, Popular } from "../common/Badges";

const FeaturedHotels = () => {
  const hotels = [
    {
      name: "Limax Eurasia Hotel",
      price: "$200-$650",
      image: eurasia,
      badge: <Popular />,
    },
    {
      name: "Kingford Hotel",
      price: "$500-$800",
      image: kingford,
      badge: <Popular />,
    },
    {
      name: "Treacy's Hotel",
      price: "$200-$600",
      image: treacy,
      badge: <BestDeals />,
    },
    {
      name: "The Orchid Hotel",
      price: "$100-$330",
      image: orchid,
      badge: <Popular />,
    },
  ];

  return (
    <div className="mt-10 flex overflow-hidden gap-10">
      {hotels.map((hotel, index) => (
        <div key={index}>
          <div className="relative">
            <img src={hotel.image} alt="" />
            {hotel.badge}
          </div>
          <div className="my-6  flex flex-col gap-2 font-medium">
            <h3 className="text-2xl text-neutral-900">{hotel.name}</h3>
            <p className="text-neutral-700 text-xl">{hotel.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedHotels;

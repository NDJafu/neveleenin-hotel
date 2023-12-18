import { RxDimensions } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { Room as RoomProps } from "../../app/types";

const Room = ({
  _id,
  name,
  roomSize,
  pricing,
  price,
  thumbnail,
  images,
}: RoomProps) => {
  const location = useLocation();
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-neutral-900 font-medium">{name}</h3>
      <div className="flex gap-6">
        <img
          src={thumbnail ?? images?.[0]}
          className="aspect-[2/1] h-72 object-cover rounded-2xl"
        />
        <div className="flex flex-col gap-5 my-1 text-neutral-700 flex-grow">
          <h5 className="text-xl">1 Beds, Double Room</h5>
          <div className="flex flex-wrap text-lg">
            <span className="flex items-center gap-2">
              <RxDimensions /> {roomSize}m&#178;
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center">
          <p className="text-green-700 text-2xl font-medium">
            {pricing ?? price}$/
            <span className="text-neutral-500 text-xl">Night</span>
          </p>
          <Link
            to={`/booking/${_id}${location.search}`}
            className="px-6 py-3 bg-green-100 text-green-700 font-semibold rounded-full text-sm"
          >
            Book now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Room;

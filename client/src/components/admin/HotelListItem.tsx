import { Link } from "react-router-dom";
import { useGetHotelListingsQuery } from "../../features/hotel/hotelApiSlice";

const HotelListItem = () => {
  const { data: hotels } = useGetHotelListingsQuery();
  return (
    <tbody>
      {hotels?.map((hotel, index) => (
        <tr key={hotel._id} className="text-neutral-500 font-semibold">
          <td className="pl-5">{index + 1}</td>
          <td className="flex py-4 items-center gap-4">
            <img
              className="w-32 h-16 object-cover rounded"
              src={hotel.thumbnail}
            />
            {hotel.hotelName}
          </td>
          <td>Lorem Ipsum</td>
          <td className="pl-10">2</td>
          <td className="pl-5">{hotel.membershipStatus}</td>
          <td className="text-center text-neutral-700">
            <Link
              to={`edit/${hotel._id}`}
              className="border border-neutral-700 py-1 px-3 rounded"
            >
              Show details
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default HotelListItem;

import HotellListSort from "../../components/admin/HotellListSort";
import HotelListItem from "../../components/admin/HotelListItem";

const ManageHotelPage = () => {
  return (
    <div className="flex flex-col gap-2.5 flex-grow">
      <HotellListSort />
      <div className="bg-white p-4 rounded-xl flex-grow">
        <h1 className="text-neutral-900 font-bold text-lg">Hotels</h1>
        <table className="w-full text-left table-auto">
          <thead className="bg-black/5 text-neutral-500">
            <tr>
              <th className="pl-4 py-4">ID</th>
              <th>Name</th>
              <th>Owner</th>
              <th>Room types</th>
              <th>Member status</th>
              <th className="text-center">Options</th>
            </tr>
          </thead>
          <HotelListItem />
        </table>
      </div>
    </div>
  );
};

export default ManageHotelPage;

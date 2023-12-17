import { BsSun } from "react-icons/bs";
import { useAppSelector } from "../../utils/hooks";
import UserProfile from "../common/UserProfile";

const AdminHeader = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  return (
    <header className="bg-white flex justify-between p-4 font-bold text-lg text-neutral-900 rounded-xl">
      <div className="flex items-center gap-4">
        26th October 2023
        <BsSun size={24} className="fill-yellow-500" />
        7:00AM
      </div>
      <UserProfile {...currentUser!} />
    </header>
  );
};

export default AdminHeader;

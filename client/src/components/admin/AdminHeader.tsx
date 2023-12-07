import { BsSun, BsBell } from "react-icons/bs";
import { useAppSelector } from "../../utils/hooks";

const AdminHeader = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  return (
    <header className="bg-white flex justify-between p-4 font-bold text-lg text-neutral-900 rounded-xl">
      <div className="flex items-center gap-4">
        26th October 2023
        <BsSun size={24} className="fill-yellow-500" />
        7:00AM
      </div>
      <div className="flex items-center text-neutral-900 font-semibold gap-4">
        <span>Welcome! {currentUser!.username}</span>
        <img
          src={currentUser!.avatar}
          width={36}
          height={36}
          className="border-4 border-neutral-500/20 rounded-full"
        />
        <BsBell size={24} />
      </div>
    </header>
  );
};

export default AdminHeader;

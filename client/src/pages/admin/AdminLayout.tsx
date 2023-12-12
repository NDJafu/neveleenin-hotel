import Logo from "../../components/common/Logo";
import { Outlet } from "react-router-dom";
import AdminNav from "../../components/admin/AdminNav";
import AdminHeader from "../../components/admin/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="grid grid-cols-8">
      <aside className="bg-green-100 h-screen flex flex-col items-center p-4 gap-4">
        <Logo />
        <AdminNav />
      </aside>
      <main className="flex flex-col gap-2.5 col-span-7 bg-[#E3E3E3] py-2.5 px-4">
        <AdminHeader />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

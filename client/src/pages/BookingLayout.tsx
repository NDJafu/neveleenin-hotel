import { Outlet } from "react-router-dom";
import Logo from "../components/common/Logo";
import Footer from "../components/common/Footer";

const BookingLayout = () => {
  return (
    <div className="w-full bg-[#FAFAFA]">
      <header className="px-40 py-4 bg-green-100/75">
        <Logo />
      </header>
      <Outlet />
      <Footer />
    </div>
  );
};

export default BookingLayout;

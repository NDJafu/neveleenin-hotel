import Logo from "./Logo";
import location from "../../assets/location-filled.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky px-16 h-32 bg-gradient-to-b from-green-50 from-50% to-transparent">
      <div className="h-2/3 flex gap-6 items-center justify-between">
        <Logo />
        <div className="ml-11 my-8 inline-flex items-center relative flex-grow">
          <img className="absolute left-4" src={location} alt="" />
          <input
            className="pl-14 h-12 border w-2/3 border-neutral-300 rounded-full text-sm outline-none font-medium"
            placeholder="Search for the location you want!"
          />
        </div>

        <nav className="px-4 flex gap-12 text-neutral-500 text-sm">
          <Link to={""}>About Us</Link>
          <Link to={""}>Article</Link>
          <Link to={""}>Browse Hotel</Link>
        </nav>
        <div className="flex gap-4 text-green-700 font-semibold text-sm">
          <button className="bg-green-100 px-6 py-3 rounded-full">
            Sign Up
          </button>
          <button className="bg-green-100 px-6 py-3 rounded-full">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;

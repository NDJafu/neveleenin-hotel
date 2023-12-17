import Logo from "./Logo";
import locationImg from "../../assets/location-filled.svg";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../utils/hooks";
import UserProfile from "./UserProfile";

const Header = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  return (
    <header className="sticky px-16 h-32 bg-gradient-to-b from-green-50 from-50% to-transparent">
      <div className="h-2/3 flex gap-6 items-center justify-between">
        <Logo />
        <div className="ml-11 my-8 inline-flex items-center relative flex-grow">
          <img className="absolute left-4" src={locationImg} alt="" />
          <input
            name="search"
            className="pl-14 h-12 border w-2/3 border-neutral-300 rounded-full text-sm outline-none font-medium"
            placeholder="Search for the location you want!"
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                if (query.length === 0) {
                  params.delete("q");
                  setParams(params, { replace: true });
                } else {
                  params.set("q", query);
                  setParams(params, { replace: true });
                }
              }
            }}
            onChange={(e) => {
              setQuery(e.target.value);
              console.log(query);
            }}
            value={query}
          />
        </div>

        <nav className="px-4 flex gap-12 text-neutral-500 text-sm">
          <Link to="">About Us</Link>
          <Link to="">Article</Link>
          <Link to="/browse">Browse Hotel</Link>
        </nav>

        {!currentUser ? (
          <div className="flex gap-4 text-green-700 font-semibold text-sm">
            <Link
              to="/register"
              className="bg-green-100 px-6 py-3 rounded-full"
            >
              Sign Up
            </Link>
            <Link to="/login" className="bg-green-100 px-6 py-3 rounded-full">
              Login
            </Link>
          </div>
        ) : (
          <UserProfile {...currentUser} />
        )}
      </div>
    </header>
  );
};

export default Header;

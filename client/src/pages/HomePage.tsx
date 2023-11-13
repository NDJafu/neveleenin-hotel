import CyanMintBlob from "../components/common/CyanMintBlob";
import Logo from "../components/common/Logo";
import hero from "../assets/hero.png";
import location from "../assets/location-filled.svg";
import forward from "../assets/ios-forward-fill.svg";
import { Link } from "react-router-dom";
import ThisComponentIsSponsorByTheseBrands from "../components/irrelevant/ThisComponentIsSponsorByTheseBrands";

const HomePage = () => {
  return (
    <div>
      <CyanMintBlob />
      <img className="absolute right-0 -z-10" src={hero} alt="" />
      <nav className="py-10 px-32 w-full inline-flex justify-between">
        <Logo />
        <div className="inline-flex gap-14 font-semibold text-sm items-center">
          <div className="inline-flex gap-6 h-fit">
            <div className="py-2 px-4 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-full text-neutral-100">
              <Link to={""}>About Us</Link>
            </div>
            <div className="py-2 px-4 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-full text-neutral-100">
              <Link to={""}>Article</Link>
            </div>
            <div className="py-2 px-4 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-full text-neutral-100">
              <Link to={""}>Browse Hotels</Link>
            </div>
          </div>
          <button className="py-3 px-6 rounded-full bg-green-100 text-green-700">
            Sign Up!
          </button>
        </div>
      </nav>
      <section className="my-24 mx-32 w-1/3">
        <h1
          className="text-5xl text-neutral-900 font-semibold"
          style={{ WebkitTextStroke: "1px #1B1C57" }}
        >
          Find The Perfect Place For Your{" "}
          <span className="font-sans text-transparent">Dream</span>
          <br />
          Easily Here
        </h1>
        <p className="mt-6 text-neutral-500 w-4/5">
          Everything you need about finding your place to stay will be here,
          where it will be easier for you
        </p>
        <div className="w-4/5 my-8 inline-flex items-center relative">
          <img className="absolute ml-6" src={location} alt="" />
          <input
            className="pl-14 h-14 border border-neutral-300 rounded-full w-full text-sm outline-none font-medium"
            placeholder="Search for the location you want!"
          />
          <button className="absolute right-1 px-4 py-3 bg-green-500 text-white rounded-full inline-flex gap-1 font-semibold">
            Search
            <img src={forward} alt="" />
          </button>
        </div>
        <p className="font-normal text-neutral-500">
          Our Partnership {"(Not Real)"}
        </p>
        {/* Kono bangumi wa goran no suponsaa no teikyou de okurishimasu!. */}
        <ThisComponentIsSponsorByTheseBrands />
      </section>
    </div>
  );
};

export default HomePage;

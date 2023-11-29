import CyanMintBlob from "../components/common/CyanMintBlob";
import Logo from "../components/common/Logo";
import hero from "../assets/hero.png";
import location from "../assets/location-filled.svg";
import forward from "../assets/ios-forward-fill.svg";
import { Link } from "react-router-dom";
import ThisComponentIsSponsorByTheseBrands from "../components/irrelevant/ThisComponentIsSponsorByTheseBrands";
import FeaturedHotels from "../components/irrelevant/FeaturedHotels";
import ArticlesGrid from "../components/irrelevant/ArticlesGrid";
import Footer from "../components/common/Footer";

const HomePage = () => {
  return (
    <div>
      <CyanMintBlob />
      <img className="absolute right-0 -z-10" src={hero} alt="" />
      {/*Homepage Header */}
      <nav className="py-10 px-32 w-full inline-flex justify-between">
        <Logo />
        <div className="inline-flex gap-14 font-semibold text-sm items-center">
          <div className="inline-flex gap-6 h-fit">
            <div className="py-2 px-4 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-full text-neutral-100">
              <Link to="">About Us</Link>
            </div>
            <div className="py-2 px-4 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-full text-neutral-100">
              <Link to="">Article</Link>
            </div>
            <div className="py-2 px-4 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-full text-neutral-100">
              <Link to="browse">Browse Hotels</Link>
            </div>
          </div>
          <Link
            to="register"
            className="py-3 px-6 rounded-full bg-green-100 text-green-700"
          >
            Sign Up!
          </Link>
        </div>
      </nav>
      {/* Hero Banner */}
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
      {/* Recommendation */}
      <section className="mt-32 mx-32">
        <div className="inline-flex items-center gap-2">
          <div className="w-8 h-[1px] bg-yellow-500"></div>
          <span className="text-yellow-500 text-sm">Our Recommendation</span>
        </div>
        <div className="ml-10">
          <div className="flex justify-between items-center">
            <h2 className="text-neutral-900 text-3xl font-semibold">
              Featured Hotel
            </h2>
            <div className="inline-flex gap-4">
              <button className="py-3 px-4 bg-neutral-300 rounded-full">
                <img className="invert rotate-180" src={forward} alt="" />
              </button>
              <button className="py-3 px-4 bg-green-500 rounded-full">
                <img src={forward} alt="" />
              </button>
            </div>
          </div>
          <FeaturedHotels />
        </div>
      </section>
      {/* Articles */}
      <section className="mt-32 mx-32">
        <div className="w-full gap-2 text-center capitalize">
          <div className="w-8 h-[1px] bg-yellow-500 mx-auto"></div>
          <span className="text-yellow-500 text-sm">
            See tips and trick from our partnership
          </span>
          <h2 className="mt-1 text-neutral-900 text-3xl font-semibold">
            Find out more about
            <br />
            finding and booking hotel
          </h2>
          <button className="mt-6 px-4 py-3 bg-green-500 text-white rounded-full font-semibold">
            More Articles
          </button>
        </div>
        <ArticlesGrid />
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;

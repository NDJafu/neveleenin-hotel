import { Link } from "react-router-dom";
import gradient from "../../assets/gradient.png";

const HotelRegisterBanner = () => {
  return (
    <section
      className="mx-32 mt-36 h-80
      rounded-[32px]
      flex flex-col gap-8 justify-center items-center bg-center bg-cover"
      style={{
        backgroundImage: `url(${gradient})`,
      }}
    >
      <h1 className="text-3xl text-center text-neutral-900 font-semibold capitalize">
        Expand Your Market <br /> Register your business to nevelenin & gain
        more customers.
      </h1>
      <Link
        to="/register?redirect=/partnership/register"
        className="px-4 py-3 bg-green-500 text-white font-semibold rounded-full"
      >
        Join Us Now
      </Link>
    </section>
  );
};

export default HotelRegisterBanner;

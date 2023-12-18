import { Link } from "react-router-dom";

const BookingCompletePage = () => {
  return (
    <div className="w-1/2 mx-auto my-40">
      <h1 className="text-5xl text-neutral-900 font-bold">
        Thank you for booking at Neveleenin
      </h1>
      <p className="text-neutral-500 my-20">
        We hope your trip go swimmingly well, and may return to us for more.{" "}
        <br />
        But for now, you can browse more of what we can offer or check out your
        reservation detail while preparing for your relaxing trip. If a problems
        occurs within your reservation order, feels free to check our FAQ and
        contact us to resolve your issues.
      </p>
      <div className="flex gap-4">
        <Link
          to="/browse"
          className="px-6 py-3 bg-green-100 text-green-700 rounded-full"
        >
          Continue browsing
        </Link>
        <Link
          to="/browse"
          className="px-6 py-3 bg-blue-100 text-blue-900 rounded-full"
        >
          Check your reservation
        </Link>
      </div>
    </div>
  );
};

export default BookingCompletePage;

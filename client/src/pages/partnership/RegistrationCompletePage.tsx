import { Link } from "react-router-dom";

const RegistrationCompletePage = () => {
  return (
    <div className="flex flex-col gap-8 my-12 items-center">
      <h1 className="text-3xl font-bold text-neutral-900">
        Hotel Registration Completed
      </h1>
      <p className="text-neutral-500 my-2 ">
        You can now head back to listings page to see your hotel.
      </p>
      <Link
        className="w-fit py-3 px-6 bg-green-100 text-green-700 font-semibold rounded-full"
        to="/browse"
      >
        Go to listings
      </Link>
    </div>
  );
};

export default RegistrationCompletePage;

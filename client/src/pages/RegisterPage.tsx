import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import femboy from "../assets/femboy.mp4";
import registerBG from "../assets/login.png";

const FemboyRNG = () => {
  const theShot = Math.floor(Math.random() * 6) + 1;
  switch (theShot) {
    case 1:
      return (
        <video
          className="h-full absolute top-0 left-0 -z-10 brightness-75"
          src={femboy}
          autoPlay={true}
          loop
        />
      );
    case 2:
      return (
        <iframe
          className="absolute top-0 left-0 -z-10"
          width="50%"
          height="100%"
          src="https://www.youtube.com/embed/56NUTCOeUUg?si=i9gS8lkRzGb0yhe0&autoplay=1&controls=0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      );
    default:
      return (
        <img
          className="w-2/5 h-full object-cover object-left absolute top-0 left-0 -z-10 brightness-75"
          src={registerBG}
        />
      );
  }
};

const RegisterPage = () => {
  return (
    <div className="w-full h-screen p-4">
      <div className="text-white text-base gap-3 inline-flex items-center font-bold">
        <img src={logo} alt="neveleenin" />
        <span>Neveleenin</span>
      </div>
      <FemboyRNG />
      <div className="absolute right-0 w-[63%] inset-y-0 bg-white rounded-l-3xl px-4 flex flex-col justify-center">
        <h1 className="text-center text-4xl font-semibold">
          Create your account
        </h1>
        <form className="flex flex-col text text-neutral-500 mt-16 w-1/2 mx-auto gap-10">
          <label className="flex flex-col gap-1" htmlFor="username">
            Username
            <input
              className="bg-neutral-300 py-3 px-6 rounded-lg outline-none"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username here"
            />
          </label>
          <label className="flex flex-col gap-1" htmlFor="email">
            Email
            <input
              className="bg-neutral-300 py-3 px-6 rounded-lg outline-none"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email here"
            />
          </label>
          <label className="flex flex-col gap-1" htmlFor="password">
            Password
            <input
              className="bg-neutral-300 py-3 px-6 rounded-lg outline-none"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password here"
            />
          </label>
          <button className="bg-green-100 text-green-700 w-2/5 p-4 font-semibold text-lg rounded-lg mx-auto">
            Sign up
          </button>
          <span>
            Already have an account?{" "}
            <Link className="text-neutral-900 underline" to={"/register"}>
              Log in
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

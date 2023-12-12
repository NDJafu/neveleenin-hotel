import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import femboy from "../assets/femboy.mp4";
import registerBG from "../assets/login.png";
import { useState } from "react";
import { useAppSelector } from "../utils/hooks";
import { useRegisterMutation } from "../features/auth/authApiSlice";

const FemboyRNG = ({ firstShot }: { firstShot: number }) => {
  switch (firstShot) {
    case 1:
      return (
        <video
          className="h-full absolute top-0 left-0 -z-10 brightness-75"
          src={femboy}
          autoPlay={true}
          loop={true}
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
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [register, { isLoading }] = useRegisterMutation();
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const theShot = Math.floor(Math.random() * 6) + 1;
  const [firstShot, setFirstShot] = useState(theShot);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password.trim() == registerForm.confirmPassword.trim()) {
      await register({ ...registerForm })
        .unwrap()
        .then(() => {
          navigate("/login");
        })
        .catch((error) => alert(error.data.error));
    } else {
      alert("Confirm password doesn't match!");
    }
    setRegisterForm({ username: "", password: "", confirmPassword: "" });
  };

  if (currentUser) {
    navigate(-1);
  }

  return (
    <div className="w-full h-screen p-4">
      <div className="text-white text-base gap-3 inline-flex items-center font-bold">
        <img src={logo} alt="neveleenin" />
        <span>Neveleenin</span>
      </div>
      <FemboyRNG firstShot={firstShot} />
      <div className="absolute right-0 w-[63%] inset-y-0 bg-white rounded-l-3xl px-4 flex flex-col justify-center">
        <h1 className="text-center text-4xl font-semibold">
          Create your account
        </h1>
        <form
          className="flex flex-col text text-neutral-500 mt-16 w-1/2 mx-auto gap-10"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col gap-1" htmlFor="username">
            Username
            <input
              className="bg-neutral-300 py-3 px-6 rounded-lg outline-none"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username here"
              value={registerForm.username}
              onChange={(e) => {
                setRegisterForm((prev) => ({
                  ...prev,
                  username: e.target.value,
                }));
              }}
            />
          </label>
          <label className="flex flex-col gap-1" htmlFor="email">
            Password
            <input
              className="bg-neutral-300 py-3 px-6 rounded-lg outline-none"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password here"
              value={registerForm.password}
              onChange={(e) => {
                setRegisterForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
          </label>
          <label className="flex flex-col gap-1" htmlFor="password">
            Confirm Password
            <input
              className="bg-neutral-300 py-3 px-6 rounded-lg outline-none"
              type="password"
              name="cPassword"
              id="cPassword"
              placeholder="Enter your password again here"
              value={registerForm.confirmPassword}
              onChange={(e) => {
                setRegisterForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }));
              }}
            />
          </label>
          <button
            type="submit"
            className="bg-green-100 text-green-700 w-2/5 p-4 font-semibold text-lg rounded-lg mx-auto"
            disabled={isLoading}
          >
            Sign up
          </button>
          <span>
            Already have an account?{" "}
            <Link
              className="text-neutral-900 underline"
              to={"/login" + location.search}
            >
              Log in
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

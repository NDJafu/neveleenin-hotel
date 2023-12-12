import { Link, useNavigate } from "react-router-dom";
import loginBG from "../assets/login.png";
import logo from "../assets/logo.svg";
import { useAppSelector } from "../utils/hooks";
import { useEffect, useRef, useState } from "react";
import { useLoginMutation } from "../features/auth/authApiSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const usernameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameInput.current?.focus();
  }, []);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ ...loginForm })
      .unwrap()
      .then(() => {
        if (currentUser?.role == "admin") {
          navigate("/admin");
        } else {
          navigate(-1);
        }
      })
      .catch((error) => alert(error.data.error));
    setLoginForm({ username: "", password: "" });
  };

  if (currentUser) {
    navigate(-1);
  }

  return (
    <div
      className="w-full h-screen p-4"
      style={{
        background: `linear-gradient(
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.6)
        ),url(${loginBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="text-white text-base gap-3 inline-flex items-center font-bold">
        <img src={logo} alt="neveleenin" />
        <span>Neveleenin</span>
      </div>
      <div className="absolute right-20 inset-y-20 w-2/5 bg-white rounded-3xl px-4 py-20">
        <h1 className="text-center text-4xl font-semibold">
          Log in to Neveleenin
        </h1>
        <form
          className="flex flex-col text text-neutral-500 mt-16 w-3/4 mx-auto gap-10"
          onSubmit={submitForm}
        >
          <label className="flex flex-col gap-1" htmlFor="username">
            Username
            <input
              className="bg-neutral-300 py-3 px-6 rounded-lg outline-none"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username here"
              ref={usernameInput}
              value={loginForm.username}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, username: e.target.value }))
              }
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
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </label>
          <button
            type="submit"
            className="bg-green-100 text-green-700 w-2/5 p-4 font-semibold text-lg rounded-lg mx-auto"
            disabled={isLoading}
          >
            Login
          </button>
          <span>
            Don't have an account?{" "}
            <Link className="text-neutral-900 underline" to={"/register"}>
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

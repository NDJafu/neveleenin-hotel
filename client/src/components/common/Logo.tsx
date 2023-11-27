import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-neutral-900 text-base gap-3 inline-flex items-center font-bold"
    >
      <img src={logo} alt="neveleenin" />
      <span>Neveleenin</span>
    </Link>
  );
};

export default Logo;

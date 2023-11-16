import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mx-32 my-24 flex gap-20 justify-stretch">
      <div className="flex-grow">
        <Logo />
        <p className="w-1/2 mt-4 mb-6 text-neutral-700 text-sm">
          We provide information about properties such as hotel and Airbnb to
          help people find their perfect place
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-neutral-900 text-lg font-semibold mb-2">
          Property
        </h4>
        <Link className="text-neutral-500 text-sm" to={""}>
          Hotel
        </Link>
        <Link className="text-neutral-500 text-sm" to={""}>
          Airbnb
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-neutral-900 text-lg font-semibold mb-2">Article</h4>
        <Link className="text-neutral-500 text-sm" to={""}>
          New Article
        </Link>
        <Link className="text-neutral-500 text-sm" to={""}>
          Airbnb
        </Link>
        <Link className="text-neutral-500 text-sm" to={""}>
          Most Read
        </Link>
        <Link className="text-neutral-500 text-sm" to={""}>
          Tips & Tricks
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-neutral-900 text-lg font-semibold mb-2">Contact</h4>
        <Link className="text-neutral-500 text-sm w-48 truncate" to={""}>
          Khu 48 Bùi thị Xuân, khu nuôi đĩ điếm quán nhậu và đủ loại thành phần
        </Link>
        <Link className="text-neutral-500 text-sm" to={""}>
          (671) 555-0110
        </Link>
        <Link className="text-neutral-500 text-sm" to={""}>
          info@neveleenin.com
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

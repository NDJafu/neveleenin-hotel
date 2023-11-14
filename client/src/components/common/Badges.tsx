import fire from "../../assets/fire-filled.svg";
import wallet from "../../assets/entypo_wallet.svg";

const Popular = () => {
  return (
    <div
      className="py-2 px-4
      absolute bottom-4 left-4
      inline-flex
    bg-red-100 text-red-500
      rounded-full
      text-sm font-medium
      gap-2.5"
    >
      <img src={fire} alt="" />
      Popular
    </div>
  );
};

export { Popular };

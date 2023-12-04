import traveloka from "../../assets/traveloka_logo.png";
import tiketdotcom from "../../assets/tiket_logo.png";
import airbnb from "../../assets/airbnb_logo.png";
import tripadvisor from "../../assets/tripadvisor_logo.png";

const ThisComponentIsSponsorByTheseBrands = () => {
  return (
    <div className="inline-flex gap-8">
      <img src={traveloka} alt="traveloka" />
      <img src={tiketdotcom} alt="tiketdotcom" />
      <img src={airbnb} alt="airbnb" />
      <img src={tripadvisor} alt="tripadvisor" />
    </div>
  );
};

export default ThisComponentIsSponsorByTheseBrands;

import { NavLink, Outlet, useLocation } from "react-router-dom";

const style = ({ isActive }: { isActive: boolean }) =>
  `${
    isActive
      ? "bg-black/5 border-b-4 border-green-500"
      : "border-b-4 border-neutral-500 "
  } p-4 flex-1 text-center text-black/75 text-sm`;

const PartnershipSteps = () => {
  const location = useLocation();

  return (
    <>
      <div
        className={`w-3/5 mx-auto flex gap-1 ${
          location.pathname.split("/").includes("complete") && "hidden"
        }`}
      >
        <NavLink className={style} to="basic-information">
          Basic Information
        </NavLink>
        <NavLink className={style} to="create-room">
          Layout & Pricing
        </NavLink>
        <NavLink className={style} to="facilities">
          Facilities & Services
        </NavLink>
        <NavLink className={style} to="amenities">
          Amenities
        </NavLink>
        <NavLink className={style} to="photos">
          Photos
        </NavLink>
        <NavLink className={style} to="policies">
          Policies
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default PartnershipSteps;

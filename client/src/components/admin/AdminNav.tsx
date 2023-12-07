import React from "react";
import {
  BsBuildingFill,
  BsFlagFill,
  BsHouseFill,
  BsPeopleFill,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  const activeNav = ({ isActive }: { isActive: boolean }) =>
    `flex gap-2 p-2 items-center w-fit rounded-lg ${
      isActive && "bg-neutral-500/10"
    }`;
  return (
    <nav className="w-full text-neutral-900 font-bold flex flex-col gap-2">
      <NavLink to="/admin" end className={activeNav}>
        <BsHouseFill size={24} />
        Dashboard
      </NavLink>
      <NavLink to="manage-hotel" className={activeNav}>
        <BsBuildingFill size={24} />
        Manage hotels
      </NavLink>
      <NavLink to="manage-user" className={activeNav}>
        <BsPeopleFill size={24} />
        Manage users
      </NavLink>
      <NavLink to="report" className={activeNav}>
        <BsFlagFill size={24} />
        Reports
      </NavLink>
    </nav>
  );
};

export default AdminNav;

import React from "react";
import { Link } from "react-router-dom";

type ProfileProps = {
  role: string;
};

const ProfileDropdown = React.forwardRef(
  (props: ProfileProps, ref: React.Ref<HTMLDivElement>) => {
    const { role } = props;
    return (
      <div
        className="absolute right-1/5 top-12 px-2 py-2 w-4/5
         bg-white drop-shadow rounded-md
          text-base text-neutral-700
          flex flex-col"
        ref={ref}
      >
        <Link to="." className="hover:bg-black/5 px-4 py-2 rounded">
          Your Profile
        </Link>
        <Link to="." className="hover:bg-black/5 px-4 py-2 rounded">
          Reservations
        </Link>
        {role == "owner" && (
          <Link
            to="."
            className="hover:bg-black/5 px-4 py-2 rounded border-t border-neutral-500"
          >
            Manage hotels
          </Link>
        )}
      </div>
    );
  }
);

export default ProfileDropdown;

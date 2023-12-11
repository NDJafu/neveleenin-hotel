import React from "react";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../../features/auth/authApiSlice";

type ProfileProps = {
  role: string;
};

const ProfileDropdown = React.forwardRef(
  (props: ProfileProps, ref: React.Ref<HTMLDivElement>) => {
    const { role } = props;
    const [logout, { isLoading }] = useLogoutMutation();
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
            className="hover:bg-black/5 px-4 py-2 rounded border-t border-neutral-300"
          >
            Manage hotels
          </Link>
        )}
        <button
          className="hover:bg-black/5 px-4 py-2 rounded border-t border-neutral-300 disabled:text-neutral-700"
          onClick={() => logout()}
          disabled={isLoading}
        >
          Log out
        </button>
      </div>
    );
  }
);

export default ProfileDropdown;

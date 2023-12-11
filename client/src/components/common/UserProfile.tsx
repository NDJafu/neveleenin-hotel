import ProfileDropdown from "./ProfileDropdown";
import { FaBell } from "react-icons/fa";
import { User } from "../../app/types";
import { useEffect, useRef, useState } from "react";

const UserProfile = (user: User) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !avatarRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div className="flex items-center text-neutral-900 font-semibold gap-4 relative">
      <span>Welcome! {user.username}</span>
      <img
        src={user.avatar}
        width={36}
        height={36}
        className="border-4 border-neutral-500/20 rounded-full hover:cursor-pointer hover:brightness-50"
        onClick={() => setOpen(!open)}
        ref={avatarRef}
      />
      {!!open && <ProfileDropdown {...user} ref={menuRef} />}
      <FaBell size={24} />
    </div>
  );
};

export default UserProfile;

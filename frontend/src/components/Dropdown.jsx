import React, { useState } from "react";
import { axiosRequest } from "api";
import { useNavigate } from "react-router-dom";

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const onClick = async () => {
    const response = await axiosRequest.post("/logout");
    if (response.status === 200) {
      navigate("/");
    }
  };

  return (
    <div className="">
      <button className="block overflow-none dark:hover:shadow-white dark:hover:shadow-sm bg-white rounded-full w-14 h-14 shadow-md hover:shadow-xl" onClick={toggleDropdown}>
        <img
          className="overflow-none rounded-full"
          src="/images/profile_avatar.jpg"
          alt="avatar"
        />
      </button>
      {isOpen && (
        <ul className="absolute mt-2  dropdown-menu rounded-md overflow-hidden no-wrap whitespace-nowrap shadow-md">
          <div className="p-1 bg-white  dark:hover:bg-white dark:hover:text-black dark:bg-gray-600 font-semibold hover:bg-red-400 hover:text-white dark:">
            <button
              onClick={onClick}
              type="button"
              id="dropdownDefault"
              data-dropdown-toggle="dropdown"
            >
            Logout
            </button>
          </div>
        </ul>
      )}
    </div>
  );
}

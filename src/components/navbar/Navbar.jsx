import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openQuery, setOpenQuery] = useState(false);

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          IT Department
        </Link>

        {/* Right Menu */}
        <ul className="flex items-center gap-6">

          {/* Home */}
          <li>
            <Link to="/" className="hover:text-gray-200">Home</Link>
          </li>

          {/* Profile Dropdown */}
          <li className="relative">
            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="hover:text-gray-200"
            >
              Profile ▼
            </button>

            {openProfile && (
              <ul className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-48 py-2">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/profile/details">Student Details</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/profile/department">Department</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/profile/query">Query Addressal</Link>
                </li>
                {/* Sign Out */}
                <li className="px-4 py-2 hover:bg-gray-100 border-t">
                  <button className="w-full text-left text-red-600">
                    Sign Out
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

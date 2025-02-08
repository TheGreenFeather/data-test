import React from "react";
import { Link } from "react-router";
import { Home, User, Settings } from "lucide-react";

const Navbar = () => {
  const navItems = [
    { name: "Admin", path: "/", icon: <Settings className="w-5 h-5" /> },
    { name: "Teacher", path: "/teacher", icon: <User className="w-5 h-5" /> },
    { name: "Student", path: "/student", icon: <Home className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Classroom Management</h1>
        <ul className="flex gap-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors ${
                      isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

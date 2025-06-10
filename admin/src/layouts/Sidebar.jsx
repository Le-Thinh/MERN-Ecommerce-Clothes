import React, { useState } from "react";
import { menuOther, menuSidebar } from "../assets";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState("");

  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? "" : menuName));
  };

  return (
    <div>
      <aside className="fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 w-[290px] -translate-x-full lg:translate-x-0">
        <div className="py-8 flex items-center justify-start gap-4">
          <a href="/">
            <img
              className="w-[40px] h-[40px] object-contain"
              src="./logo-bird.ico"
              alt=""
            />
          </a>
          <h3 className="text-[#ea1b25] font-semibold text-2xl">
            ChillnFree Admin
          </h3>
        </div>
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          <nav className="mb-6">
            <div className="flex flex-col gap-4">
              <h2 className="mb-4 text-xs uppercase flex leading-[20px] text-gray-400 dark:text-[#d0d5dd] justify-start">
                Menu
              </h2>
              <ul className="flex flex-col gap-4">
                {menuSidebar.map((item, index) => (
                  <li key={index}>
                    <button
                      className={`menu-item group cursor-pointer lg:justify-start dark:text-[#d0d5dd] hover:bg-gray-200 dark:hover:bg-white/10 ${
                        openMenu === item.name
                          ? "text-[#ea1b25] bg-gray-100 dark:bg-white/10"
                          : "text-[#344054]"
                      }`}
                      onClick={() => toggleMenu(item.name)}
                    >
                      <span className="menu-item-icon-size">{item.icon}</span>
                      <span
                        className={`menu-item-text font-medium dark:text-[#d0d5dd] ${
                          openMenu === item.name
                            ? "text-[#ea1b25]"
                            : "text-[#344054]"
                        } ml-2`}
                      >
                        {item.name}
                      </span>
                      {item.children && (
                        <svg
                          className={`ml-auto w-5 h-5 transition-transform duration-200 dark:text-[#d0d5dd] ${
                            openMenu === item.name ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>

                    {item.children?.map((child, idx) => (
                      <div
                        key={idx}
                        className={`transition-all dark:text-[#d0d5dd]  duration-300 overflow-hidden ${
                          openMenu === item.name ? "max-h-40 mt-2" : "max-h-0"
                        }`}
                      >
                        <ul className="space-y-1 ml-9">
                          <li className="hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg">
                            <a className="menu-dropdown-item" href="/">
                              {child.Child.name || "Unnamed"}
                            </a>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
              <h2 className="text-xs uppercase flex leading-[20px] text-gray-400 justify-start">
                Others
              </h2>
              <ul className="flex flex-col">
                {menuOther.map((item, index) => (
                  <li key={index}>
                    <button
                      className={`menu-item group cursor-pointer lg:justify-start hover:bg-gray-200 dark:text-[#d0d5dd] dark:hover:bg-white/10 ${
                        openMenu === item.name
                          ? "text-[#ea1b25] bg-gray-100 dark:bg-white/10"
                          : "text-[#344054]"
                      }`}
                      onClick={() => toggleMenu(item.name)}
                    >
                      <span className="menu-item-icon-size dark:text-[#d0d5dd] ">
                        {item.icon}
                      </span>
                      <span
                        className={`menu-item-text font-medium dark:text-[#d0d5dd] ${
                          openMenu === item.name
                            ? "text-[#ea1b25]"
                            : "text-[#344054]"
                        } ml-2`}
                      >
                        {item.name}
                      </span>
                      {item.children && (
                        <svg
                          className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                            openMenu === item.name ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>

                    {item.children?.map((child, idx) => (
                      <div
                        key={idx}
                        className={`transition-all duration-300 overflow-hidden ${
                          openMenu === item.name ? "max-h-40 mt-2" : "max-h-0"
                        }`}
                      >
                        <ul className="space-y-1 ml-9">
                          <li className="hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg">
                            <a className="menu-dropdown-item" href="/">
                              {child.Child.name || "Unnamed"}
                            </a>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

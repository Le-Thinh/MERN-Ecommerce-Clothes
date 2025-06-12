import React, { useCallback, useEffect, useRef, useState } from "react";
import { menuOther, menuSidebar } from "../assets";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../contexts";

const Sidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? menuSidebar : menuOther;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType,
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key].scrollHeight,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <svg
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
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
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`] || 0}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  // return (
  //   <div>
  //     <aside className="fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 w-[290px] -translate-x-full lg:translate-x-0">
  //       <div className="py-8 flex items-center justify-start gap-4">
  //         <a href="/">
  //           <img
  //             className="w-[40px] h-[40px] object-contain"
  //             src="./logo-bird.ico"
  //             alt=""
  //           />
  //         </a>
  //         <h3 className="text-[#ea1b25] font-semibold text-2xl">
  //           ChillnFree Admin
  //         </h3>
  //       </div>
  //       <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
  //         <nav className="mb-6">
  //           <div className="flex flex-col gap-4">
  //             <h2 className="mb-4 text-xs uppercase flex leading-[20px] text-gray-400 dark:text-[#d0d5dd] justify-start">
  //               Menu
  //             </h2>
  //             <ul className="flex flex-col gap-4">
  //               {menuSidebar.map((item, index) => (
  //                 <li key={index}>
  //                   {item.subItems ? (
  //                     // Parent with dropdown
  //                     <div
  //                       className={`menu-item group cursor-pointer lg:justify-start dark:text-[#d0d5dd] hover:bg-gray-200 dark:hover:bg-white/10 ${
  //                         openMenu === item.name
  //                           ? "text-[#ea1b25] bg-gray-100 dark:bg-white/10"
  //                           : "text-[#344054]"
  //                       }`}
  //                       onClick={() => toggleMenu(item.name)}
  //                     >
  //                       <span className="menu-item-icon-size">{item.icon}</span>
  //                       <span
  //                         className={`menu-item-text font-medium dark:text-[#d0d5dd] ${
  //                           openMenu === item.name
  //                             ? "text-[#ea1b25]"
  //                             : "text-[#344054]"
  //                         } ml-2`}
  //                       >
  //                         {item.name}
  //                       </span>
  //                       <svg
  //                         className={`ml-auto w-5 h-5 transition-transform duration-200 dark:text-[#d0d5dd] ${
  //                           openMenu === item.name ? "rotate-180" : ""
  //                         }`}
  //                         viewBox="0 0 20 20"
  //                         fill="none"
  //                         xmlns="http://www.w3.org/2000/svg"
  //                       >
  //                         <path
  //                           d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
  //                           stroke="currentColor"
  //                           strokeWidth="1.5"
  //                           strokeLinecap="round"
  //                           strokeLinejoin="round"
  //                         />
  //                       </svg>
  //                     </div>
  //                   ) : (
  //                     // Direct link item
  //                     <Link
  //                       to={item.path}
  //                       className={`menu-item group cursor-pointer lg:justify-start dark:text-[#d0d5dd] hover:bg-gray-200 dark:hover:bg-white/10 ${
  //                         openMenu === item.name
  //                           ? "text-[#ea1b25] bg-gray-100 dark:bg-white/10"
  //                           : "text-[#344054]"
  //                       }`}
  //                       onClick={() => toggleMenu(item.name)}
  //                     >
  //                       <span className="menu-item-icon-size">{item.icon}</span>
  //                       <span
  //                         className={`menu-item-text font-medium dark:text-[#d0d5dd] ${
  //                           openMenu === item.name
  //                             ? "text-[#ea1b25]"
  //                             : "text-[#344054]"
  //                         } ml-2`}
  //                       >
  //                         {item.name}
  //                       </span>
  //                     </Link>
  //                   )}

  //                   {/* Dropdown subItems */}
  //                   {item.subItems?.map((child, idx) => (
  //                     <div
  //                       key={idx}
  //                       className={`transition-all dark:text-[#d0d5dd] duration-300 overflow-hidden ${
  //                         openMenu === item.name ? "max-h-40 mt-2" : "max-h-0"
  //                       }`}
  //                     >
  //                       <ul className="space-y-1 ml-9">
  //                         <li className="hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg">
  //                           <Link
  //                             className="menu-dropdown-item"
  //                             to={child.path}
  //                           >
  //                             {child.name || "Unnamed"}
  //                           </Link>
  //                         </li>
  //                       </ul>
  //                     </div>
  //                   ))}
  //                 </li>
  //               ))}
  //             </ul>

  //             <h2 className="text-xs uppercase flex leading-[20px] text-gray-400 justify-start">
  //               Others
  //             </h2>
  //             <ul className="flex flex-col">
  //               {menuOther.map((item, index) => (
  //                 <li key={index}>
  //                   <button
  //                     className={`menu-item group cursor-pointer lg:justify-start hover:bg-gray-200 dark:text-[#d0d5dd] dark:hover:bg-white/10 ${
  //                       openMenu === item.name
  //                         ? "text-[#ea1b25] bg-gray-100 dark:bg-white/10"
  //                         : "text-[#344054]"
  //                     }`}
  //                     onClick={() => toggleMenu(item.name)}
  //                   >
  //                     <span className="menu-item-icon-size dark:text-[#d0d5dd] ">
  //                       {item.icon}
  //                     </span>
  //                     <span
  //                       className={`menu-item-text font-medium dark:text-[#d0d5dd] ${
  //                         openMenu === item.name
  //                           ? "text-[#ea1b25]"
  //                           : "text-[#344054]"
  //                       } ml-2`}
  //                     >
  //                       {item.name}
  //                     </span>
  //                     {item.children && (
  //                       <svg
  //                         className={`ml-auto w-5 h-5 transition-transform duration-200 ${
  //                           openMenu === item.name ? "rotate-180" : ""
  //                         }`}
  //                         viewBox="0 0 20 20"
  //                         fill="none"
  //                         xmlns="http://www.w3.org/2000/svg"
  //                       >
  //                         <path
  //                           d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
  //                           stroke="currentColor"
  //                           strokeWidth="1.5"
  //                           strokeLinecap="round"
  //                           strokeLinejoin="round"
  //                         />
  //                       </svg>
  //                     )}
  //                   </button>

  //                   {item.children?.map((child, idx) => (
  //                     <div
  //                       key={idx}
  //                       className={`transition-all duration-300 overflow-hidden ${
  //                         openMenu === item.name ? "max-h-40 mt-2" : "max-h-0"
  //                       }`}
  //                     >
  //                       <ul className="space-y-1 ml-9">
  //                         <li className="hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg">
  //                           <a className="menu-dropdown-item" href="/">
  //                             {child.Child.name || "Unnamed"}
  //                           </a>
  //                         </li>
  //                       </ul>
  //                     </div>
  //                   ))}
  //                 </li>
  //               ))}
  //             </ul>
  //           </div>
  //         </nav>
  //       </div>
  //     </aside>
  //   </div>
  // );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="./logo-bird.ico"
                alt="Logo"
                width={40}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="./logo-bird.ico"
                alt="Logo"
                width={40}
                height={40}
              />
            </>
          ) : (
            <img src="./logo-bird.ico" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(menuSidebar, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(menuOther, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

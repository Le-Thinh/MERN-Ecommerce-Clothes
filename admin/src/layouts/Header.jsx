import React, { useEffect, useState } from "react";
import NotificationDropDown from "../components/header/NotificationDropDown";
import UserDropDown from "../components/header/UserDropDown";
import ThemeToggleButton from "../components/common/ThemeToggleButton";
import { useSidebar } from "../contexts";
import { useRef } from "react";
import { Link } from "react-router";
import { searchProduct } from "../api/product.api";

const Header = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearchProduct = async (keySearch) => {
    if (!keySearch.trim()) return;

    try {
      setSearching(true);
      const res = await searchProduct(keySearch);
      setSearchResults(res.data || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleToggle = () => {
    console.log("Toggle clicked");
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (inputRef.current?.value) {
        handleSearchProduct(inputRef.current.value);
      } else {
        setSearchResults([]); // Clear when input is empty
      }
    }, 500); // debounce 500ms

    return () => clearTimeout(delayDebounce);
  }, [inputRef.current?.value]);

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <button
            className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.22 7.28a.75.75 0 0 1 1.06-1.06L12 10.94l4.72-4.72a.75.75 0 1 1 1.06 1.06L13.06 12l4.72 4.72a.75.75 0 1 1-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L10.94 12 6.22 7.28Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.58 1A.75.75 0 0 1 1.33.25h13.33a.75.75 0 0 1 0 1.5H1.33A.75.75 0 0 1 0.58 1Zm0 10a.75.75 0 0 1 .75-.75h13.33a.75.75 0 0 1 0 1.5H1.33a.75.75 0 0 1-.75-.75ZM1.33 5.25a.75.75 0 0 0 0 1.5h6.67a.75.75 0 0 0 0-1.5H1.33Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          <Link to="/" className="lg:hidden">
            <img
              className="dark:hidden"
              src="./images/logo/logo.svg"
              alt="Logo"
            />
            <img
              className="hidden dark:block"
              src="./images/logo/logo-dark.svg"
              alt="Logo"
            />
          </Link>

          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm12 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <div className="hidden lg:block">
            <form>
              <div className="relative">
                <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                  <svg
                    className="fill-gray-500 dark:fill-gray-400"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.04 9.37C3.04 5.88 5.88 3.04 9.38 3.04s6.33 2.84 6.33 6.33c0 3.5-2.84 6.33-6.33 6.33S3.04 12.87 3.04 9.37Zm6.33-7.83c-4.33 0-7.83 3.5-7.83 7.83 0 4.33 3.5 7.83 7.83 7.83 1.89 0 3.63-.67 5.01-1.78l2.82 2.82a.75.75 0 1 0 1.06-1.06l-2.82-2.82a7.81 7.81 0 0 0 1.78-5.01c0-4.33-3.5-7.83-7.83-7.83Z"
                      fill=""
                    />
                  </svg>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search or type command..."
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                />
                <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                  <span>⌘</span>
                  <span>K</span>
                </button>
              </div>
              {searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-[430px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
                  {searchResults.map((item) => (
                    <div
                      key={item._id}
                      className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        window.location.href = `/product/detail/${item._id}`;
                      }}
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">
                        {item.product_description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>

        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <div className="flex items-center gap-2 2xsm:gap-3">
            <ThemeToggleButton />
            <NotificationDropDown />
          </div>
          <UserDropDown />
        </div>
      </div>
    </header>
  );
};

export default Header;

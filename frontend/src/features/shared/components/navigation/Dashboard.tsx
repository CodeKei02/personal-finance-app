import { NavLink, useLocation } from "react-router-dom";
import { useRef, useCallback } from "react";
import { typography } from "@/styles/typography";
import { useUiStore } from "@/store/useUiStore";
import { dashboardInfo } from "./constants/dashboardInfo";
import { useClickOutside } from "@/features/shared/hooks/useClickOutside";

export const Dashboard = () => {
  const isOpen = useUiStore((state) => state.isOpen);
  const toggleMenu = useUiStore((state) => state.toggleMenu);
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(() => {
    if (isOpen) toggleMenu();
  }, [isOpen, toggleMenu]);

  useClickOutside(sidebarRef, handleClickOutside);

  return (
    <div
      ref={sidebarRef}
      className={`w-full h-[60px]  ${
        isOpen ? "lg:w-[300px]" : "lg:w-[80px]"
      } bg-greyDark fixed -bottom-1 z-1000 rounded-tl-[10px] rounded-tr-[10px] lg:min-h-screen lg:top-0 lg:bottom-0
      lg:flex lg:flex-col lg:rounded-none lg:rounded-br-3 lg:rounded-tr-5 lg:rounded-br-5 lg:overflow-hidden lg:transition-all lg:duration-500 lg:ease-[cubic-bezier(0.01,0.98,0,0.98)]`}
      style={{
        fontSize: typography.textPreset3.size,
      }}
    >
      {!isOpen ? (
        <NavLink
          to="/finance/overview"
          className="logo logo--small hidden lg:block lg:mt-8 lg:cursor-pointer "
        >
          <img src="/images/logo-small.svg" alt="finance-logo" />
        </NavLink>
      ) : (
        <NavLink
          to="/finance/overview"
          className="logo logo--large hidden lg:block lg:mt-8 lg:cursor-pointer"
        >
          <img src="/images/logo-large.svg" alt="finance-logo" />
        </NavLink>
      )}

      <ul className="flex justify-around items-center py-3.5 list-none lg:flex-col lg:justify-between  lg:mt-10">
        {dashboardInfo.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={item.id}
              className={`w-15 md:w-20 h-12 lg:w-full flex items-center justify-center lg:justify-start ${
                isActive
                  ? "bg-white border-b-[5px] border-green rounded-tl-[10px] rounded-tr-[10px] lg:rounded-tl-none lg:rounded-br-[10px] transition-colors duration-300 md:border-b-[5px] lg:border-none"
                  : ""
              }`}
              style={{ marginTop: "10px" }}
            >
              <NavLink
                to={item.path}
                className="no-underline text-center lg:flex lg:items-center lg:gap-4 lg:px-4 lg:mb-2 lg:h-10 "
              >
                <item.image
                  className={`w-6 h-6 ${
                    isActive ? "text-greyDark" : "text-white"
                  }`}
                />
                <p
                  className={` ${
                    isActive ? "text-greyDark" : "text-white"
                  } hidden md:block text-[.5rem] lg:text-[1rem] ${
                    isOpen ? "lg:block" : "lg:hidden"
                  }`}
                >
                  {item.title}
                </p>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => toggleMenu()}
        className="hidden lg:flex lg:absolute lg:bottom-14 lg:gap-6  lg:items-center border-0 bg-transparent text-white cursor-pointer"
        style={{ marginLeft: "1rem" }}
      >
        <div className="svgImage">
          <img
            src="/images/icon-minimize-menu.svg"
            alt="arrow"
            className="w-4 h-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        </div>
        <p
          className={`transition-opacity duration-100 ease-in-out text-beigeNormal font-extrabold ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          Minimize Menu
        </p>
      </button>
    </div>
  );
};

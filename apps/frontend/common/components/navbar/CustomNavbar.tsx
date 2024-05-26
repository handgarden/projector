"use client";
import { PROJECT_PATH } from "../../path/ProjectPath";
import { ROOT_PATH } from "../../path/RootPath";
import { CustomNavbarLinkItem } from "./CustomNavbarLinkItem";
import { ProjectorIcon } from "../icon/ProjectorIcon";
import { GoHome } from "react-icons/go";
import { RiSlideshow2Line } from "react-icons/ri";
import { mclsx } from "../../../utils/mclsx";
import { CgProfile } from "react-icons/cg";
import { PROFILE_PATH } from "../../path/ProfilePath";
import { useIsDark } from "../../hook/useIsDark";
import { useEffect, useRef, useState } from "react";
import { CustomNavbarThemeSwitcher } from "./CustomNavbarThemeSwitcher";

export function CustomNavbar() {
  const isDark = useIsDark();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFocus = () => {
      setIsMenuOpen(true);
    };
    const handleBlur = () => {
      setIsMenuOpen(false);
    };

    const nav = navRef.current;
    if (nav) {
      navRef.current.addEventListener("mouseenter", handleFocus);
      navRef.current.addEventListener("mouseleave", handleBlur);
    }

    return () => {
      if (nav) {
        nav.removeEventListener("mouseenter", handleFocus);
        nav.removeEventListener("mouseleave", handleBlur);
      }
    };
  }, [navRef]);

  return (
    <nav className={mclsx("min-h-full", "min-w-14 ")} ref={navRef}>
      <div
        className={mclsx(
          "absolute top-0 left-0 flex flex-col justify-between h-lvh ",
          isDark ? "border-r-gray-800 bg-black" : "border-r-gray-200 bg-white",
          "border-r-1 ",
          isMenuOpen ? "w-40" : "w-14",
          "z-20",
          "overflow-hidden",
          "transition-all duration-200 ease-in-out"
        )}
      >
        <div>
          <div
            className={mclsx(
              "py-3 border-b-1",
              isDark ? "border-b-gray-800" : "border-b-gray-200"
            )}
          >
            <ProjectorIcon />
          </div>
          <ul
            className={mclsx(
              "border-b-1",
              isDark ? "border-b-gray-800" : "border-b-gray-200"
            )}
          >
            <CustomNavbarLinkItem
              exact
              icon={<GoHome />}
              path={ROOT_PATH.root}
              label="Home"
              open={isMenuOpen}
            />
            <CustomNavbarLinkItem
              icon={<RiSlideshow2Line />}
              path={PROJECT_PATH.root}
              label="Projects"
              open={isMenuOpen}
            />
          </ul>
        </div>
        <div>
          <ul
            className={mclsx(
              "border-y-1",
              isDark ? "border-y-gray-800" : "border-y-gray-200"
            )}
          >
            <CustomNavbarThemeSwitcher open={isMenuOpen} />
            <CustomNavbarLinkItem
              icon={<CgProfile />}
              path={PROFILE_PATH.root}
              label="Profile"
              open={isMenuOpen}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}

import { Outlet } from "react-router";
import logo_brown from "./assets/logo/jaman_brown.svg";
import { useState } from "react";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToTop = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (location: string): void => {
    const element = document.getElementById(location);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn(`Element with id "${location}" not found.`);
    }
  };

  return (
    <>
      <nav className="w-full bg-[#fdf1e3] flex items-center justify-between px-6 py-4 fixed top-0 left-0 z-20">
        {/* Logo */}
        <button
          className="hover:text-[#e8492b] transition cursor-pointer"
          onClick={scrollToTop}
        >
          <img src={logo_brown} alt="JaMan logo" className="w-10" />
        </button>

        {/* Hamburger button */}
        <button
          className="text-3xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menu midden */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-8 text-[#342626]">
          <button
            className="hover:text-[#e8492b] transition cursor-pointer"
            onClick={() => scrollToSection("sprint0")}
          >
            Sprint 0
          </button>

          <button
            className="hover:text-[#e8492b] transition cursor-pointer"
            onClick={() => scrollToSection("sprint1")}
          >
            Sprint 1
          </button>

          <button
            className="hover:text-[#e8492b] transition cursor-pointer"
            onClick={() => scrollToSection("sprint2")}
          >
            Sprint 2
          </button>

          <button
            className="hover:text-[#e8492b] transition cursor-pointer"
            onClick={() => scrollToSection("sprint3")}
          >
            Sprint 3
          </button>

          <button
            className="hover:text-[#e8492b] transition cursor-pointer"
            onClick={() => scrollToSection("sprint4")}
          >
            Sprint 4
          </button>

          <button
            className="hover:text-[#e8492b] transition cursor-pointer"
            onClick={() => scrollToSection("sprint5")}
          >
            Sprint 5
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#fdf1e3] flex flex-col items-center py-6 space-y-4 md:hidden">
            <button
              className="hover:text-[#e8492b] transition cursor-pointer"
              onClick={() => {
                scrollToSection("sprint0");
                setMenuOpen(false);
              }}
            >
              Sprint 0
            </button>
            <button
              className="hover:text-[#e8492b] transition cursor-pointer"
              onClick={() => {
                scrollToSection("sprint1");
                setMenuOpen(false);
              }}
            >
              Sprint 1
            </button>
            <button
              className="hover:text-[#e8492b] transition cursor-pointer"
              onClick={() => {
                scrollToSection("sprint2");
                setMenuOpen(false);
              }}
            >
              Sprint 2
            </button>
            <button
              className="hover:text-[#e8492b] transition cursor-pointer"
              onClick={() => {
                scrollToSection("sprint3");
                setMenuOpen(false);
              }}
            >
              Sprint 3
            </button>
            <button
              className="hover:text-[#e8492b] transition cursor-pointer"
              onClick={() => {
                scrollToSection("sprint4");
                setMenuOpen(false);
              }}
            >
              Sprint 4
            </button>
            <button
              className="hover:text-[#e8492b] transition cursor-pointer"
              onClick={() => {
                scrollToSection("sprint5");
                setMenuOpen(false);
              }}
            >
              Sprint 5
            </button>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
}

export default Nav;

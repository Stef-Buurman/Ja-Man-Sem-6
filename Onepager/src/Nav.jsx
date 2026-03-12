import logo_brown from "./assets/logo/jaman_brown.svg";
import { useState } from "react";

const scrollToTop = (e) => {
    e.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

function Nav() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full bg-[#fdf1e3] flex items-center justify-between px-6 py-4 fixed top-0 left-0 z-20">

            {/* Logo */}
            <a href="#top" onClick={scrollToTop}>
                <img src={logo_brown} alt="JaMan logo" className="w-10"/>
            </a>

            {/* Hamburger button */}
            <button
                className="text-3xl md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

                {/* Menu midden */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-8 text-[#342626]">
                    <a href="#sprint0" className="hover:text-[#e8492b] transition">
                        Sprint 0
                    </a>

                    <a href="#sprint1" className="hover:text-[#e8492b] transition">
                        Sprint 1
                    </a>

                    <a href="#sprint2" className="hover:text-[#e8492b] transition">
                        Sprint 2
                    </a>
                </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#fdf1e3] flex flex-col items-center py-6 space-y-4 md:hidden">

                    <a href="#sprint0" onClick={() => setMenuOpen(false)}>Sprint 0</a>
                    <a href="#sprint1" onClick={() => setMenuOpen(false)}>Sprint 1</a>
                    <a href="#sprint2" onClick={() => setMenuOpen(false)}>Sprint 2</a>

                </div>
            )}

        </nav>
    );
}

export default Nav;
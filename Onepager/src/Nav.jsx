import arrow from "./assets/arrow.svg";

function Nav() {
    return (
            <nav className="w-full bg-[#fdf1e3] flex items-center px-10 py-6 fixed top-0 left-0 z-11">

                {/* Logo links */}
                <a href="#jaman">
                    <img src="/jaman_brown.svg" alt="JaMan logo" className="w-12"/>
                </a>

                {/* Menu midden */}
                <div className="absolute left-1/2 -translate-x-1/2 flex space-x-8 text-[#342626]">
                    <a href="#sprint0" className="hover:text-white transition">
                        Sprint 0
                    </a>

                    <a href="#sprint1" className="hover:text-white transition">
                        Sprint 1
                    </a>

                    <a href="#sprint2" className="hover:text-white transition">
                        Sprint 2
                    </a>
                </div>
            </nav>
    );
}

export default Nav;
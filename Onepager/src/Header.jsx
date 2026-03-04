import arrow from "./assets/arrow.svg";

function Header() {
    return (
        <header id="jaman" className="fixed top-0 left-0 w-full h-screen bg-[#fdf1e3] flex flex-col z-0">

            <nav className="w-full bg-[#fdf1e3] flex items-center px-10 py-6 fixed top-0 left-0 z-10">

                {/* Logo links */}
                <a href="#top">
                    <img src="/jaman_brown.svg" alt="JaMan logo" className="w-12 mb-6"/>
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

            {/* Center content */}
            <div id="top" className="flex flex-col justify-center items-center flex-grow text-center">
                <img src="/jaman_brown.svg" alt="JaMan logo" className="w-64 mb-6"/>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 w-full flex justify-center">
                <img
                    src={arrow}
                    alt="Scroll down"
                    className="w-24 opacity-80 hover:opacity-100"
                />
            </div>

        </header>
    );
}

export default Header;
import arrow from "./assets/arrow.svg";
import logo_brown from "./assets/logo/jaman_brown.svg";

function Header() {
    return (
        <header id="jaman" className="fixed top-0 left-0 w-full h-screen bg-[#fdf1e3] flex flex-col z-0">

            {/* Center content */}
            <div className="flex flex-col justify-center items-center flex-grow text-center">
                <img src={logo_brown} alt="JaMan logo" className="w-40 sm:w-52 md:w-64"/>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 w-full flex justify-center">
                <img
                    src={arrow}
                    alt="Scroll down"
                    className="w-16 sm:w-20 md:w-24"
                />
            </div>

        </header>
    );
}

export default Header;
import arrow from "./assets/arrow.svg";

function Header() {
    return (
        <header id="jaman" className="fixed top-0 left-0 w-full h-screen bg-[#fdf1e3] flex flex-col z-0">

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
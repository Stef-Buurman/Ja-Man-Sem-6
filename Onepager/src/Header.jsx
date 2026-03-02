function Header() {
    return (
        <header id="jaman" className="h-screen bg-neutral-900 text-white flex flex-col relative">

            <nav className="w-full flex items-center px-10 py-6 absolute top-0 left-0 sticky z-10">

                {/* Logo links */}
                <a href="#top">
                    <h2 className="text-2xl font-bold tracking-wide">
                        JaMan
                    </h2>
                </a>

                {/* Menu midden */}
                <div className="absolute left-1/2 -translate-x-1/2 flex space-x-8 text-gray-300">
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
                <h1 className="text-7xl font-bold tracking-widest mb-6">
                    JaMan
                </h1>

                <p className="text-lg text-gray-400">
                    Ons project portfolio
                </p>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 text-gray-400 text-3xl w-full text-center">
                ▼
            </div>

        </header>
    );
}

export default Header;
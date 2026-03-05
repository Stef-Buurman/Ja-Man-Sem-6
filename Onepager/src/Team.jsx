import paola from "./assets/team/Paola.png";
import rick from "./assets/team/Rick.png";
import stef from "./assets/team/Stef.png";
import stefan from "./assets/team/Stefan.png";
import wout from "./assets/team/Wout.png";

function Team1() {
    const team = [
        {name: "Stefan", role: "CMGT", img: stefan},
        {name: "Rick", role: "CMGT", img: rick},
        {name: "Wout", role: "CMD", img: wout},
        {name: "Paola", role: "CMD", img: paola},
        {name: "Stef", role: "INF", img: stef},
    ];

    return (
        <section className="py-20 bg-[#342626] h-screen">

            <h2 className="text-4xl font-bold text-center mb-12 text-[#fdf1e3]">
                Ons Team
            </h2>

            <div className="flex flex-col items-center gap-10">
                {/* eerste rij */}
                <div className="grid grid-cols-3 gap-32">
                    {team.slice(0,3).map((member, index) => (
                        <div key={index} className="text-center transition hover:-translate-y-2 duration-300">
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-54 h-60 object-cover"
                            />
                            <p className="text-[#fdf1e3] text-sm">{member.role}</p>
                        </div>
                    ))}
                </div>

                {/* tweede rij */}
                <div className="grid grid-cols-2 gap-32">
                    {team.slice(3,5).map((member, index) => (
                        <div key={index} className="text-center transition hover:-translate-y-2 duration-300">
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-54 h-60 object-cover"
                            />
                            <p className="text-[#fdf1e3] text-sm">{member.role}</p>
                        </div>
                    ))}
                </div>

            </div>

            {/* Waardes */}
            <div className="mt-10 px-10 text-[#fdf1e3] text-2xl font-bold flex items-center justify-center">

                <p className="py-6">Plezier</p>
                <div className="w-16 h-px bg-[#fdf1e3] mx-4"></div>

                <p className="py-6">Betrouwbaarheid</p>
                <div className="w-16 h-px bg-[#fdf1e3] mx-4"></div>

                <p className="py-6">Vriendschap</p>
                <div className="w-16 h-px bg-[#fdf1e3] mx-4"></div>

                <p className="py-6">Loyaliteit</p>
                <div className="w-16 h-px bg-[#fdf1e3] mx-4"></div>

                <p className="py-6">Rechtvaardigheid</p>

            </div>

        </section>
    );
}

export default Team1;
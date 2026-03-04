import paola from "./assets/team/Paola.png";
import rick from "./assets/team/Rick.png";
import stef from "./assets/team/Stef.png";
import stefan from "./assets/team/Stefan.png";
import wout from "./assets/team/Wout.png";

function Team1() {
    const team = [
        { name: "Wout", role: "CMD", img: wout },
        { name: "Rick", role: "CMGT", img: rick },
        { name: "Stef", role: "INF", img: stef },
        { name: "Paola", role: "CMD", img: paola },
        { name: "Stefan", role: "CMGT", img: stefan },
    ];

    return (
        <section className="relative py-20 bg-[#342626]">

            <h2 className="text-4xl font-bold text-center mb-12 text-[#fdf1e3]">
                Ons Team
            </h2>

            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex justify-center px-10 snap-x snap-mandatory">

                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="min-w-[250px] snap-center flex-shrink-0 text-center transition hover:-translate-y-2 duration-300"
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-52 h-60 object-cover rounded-2xl mx-auto mb-4 shadow-lg"
                            />

                            <p className="text-[#fdf1e3] text-sm">{member.role}</p>
                        </div>
                    ))}

                </div>
            </div>

        </section>
    );
}

export default Team1;
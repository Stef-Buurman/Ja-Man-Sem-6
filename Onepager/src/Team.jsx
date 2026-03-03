import paola from "./assets/team/Paola.jpeg";
import rick from "./assets/team/Rick.jpeg";
import stef from "./assets/team/Stef.jpeg";
import stefan from "./assets/team/Stefan.jpeg";
import wout from "./assets/team/Wout.jpeg";

function Team1() {
    const team = [
        { name: "Paola", role: "Team", img: paola },
        { name: "Rick", role: "Team", img: rick },
        { name: "Stef", role: "Team", img: stef },
        { name: "Stefan", role: "Team", img: stefan },
        { name: "Wout", role: "Team", img: wout },
    ];

    return (
        <section className="py-20">

            <h2 className="text-4xl font-bold text-center mb-12">
                Ons Team
            </h2>

            <div className="flex justify-center gap-4">
                {team.map((member, index) => (
                    <div
                        key={index}
                        className=""
                    >
                        <img
                            src={member.img}
                            alt={member.name}
                            className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-lg"
                        />

                        <p className="font-semibold text-lg">{member.name}</p>
                        <p className="text-gray-400 text-sm">{member.role}</p>
                    </div>
                ))}
            </div>

        </section>
    );
}

export default Team1;
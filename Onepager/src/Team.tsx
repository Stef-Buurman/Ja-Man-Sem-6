import paola from "./assets/team/Paola.png";
import rick from "./assets/team/Rick.png";
import stef from "./assets/team/Stef.png";
import stefan from "./assets/team/Stefan.png";
import wout from "./assets/team/Wout.png";

function Team1() {
  const team = [
    { name: "Stefan", role: "CMGT", img: stefan },
    { name: "Rick", role: "CMGT", img: rick },
    { name: "Wout", role: "CMD", img: wout },
    { name: "Paola", role: "CMD", img: paola },
    { name: "Stef", role: "INF", img: stef },
  ];

  return (
    <section className="py-20 bg-[#342626] min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#fdf1e3]">
        Ons Team
      </h2>

      <div className="flex flex-col items-center gap-10">
        {/* eerste rij */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
          {team.slice(0, 3).map((member, index) => (
            <div key={index} className="text-center">
              <img
                src={member.img}
                alt={member.name}
                className="w-40 h-48 md:w-52 md:h-60 object-cover"
              />

              <p className="text-[#fdf1e3] text-sm mt-2">{member.role}</p>
            </div>
          ))}
        </div>

        {/* tweede rij */}
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
            {team.slice(3, 5).map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-40 h-48 md:w-52 md:h-60 object-cover"
                />

                <p className="text-[#fdf1e3] text-sm mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Waardes */}
      <div className="mt-12 px-6 text-[#fdf1e3] text-lg md:text-2xl font-bold flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-6 md:gap-12 lg:gap-24">
        <p>Plezier</p>
        <p>Betrouwbaarheid</p>
        <p>Vriendschap</p>
        <p>Loyaliteit</p>
        <p>Rechtvaardigheid</p>
      </div>
    </section>
  );
}

export default Team1;

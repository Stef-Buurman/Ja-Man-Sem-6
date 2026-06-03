import { useState } from "react";
import paola from "./assets/team/Paola.png";
import rick from "./assets/team/Rick.png";
import stef from "./assets/team/Stef.png";
import stefan from "./assets/team/Stefan.png";
import wout from "./assets/team/Wout.png";
import milan from "./assets/team/Milan.png";
import villagerSound from "./assets/sounds/villager-sound.mp3";

function Team1() {
  const needed = [3, 5, 4, 1, 2];

  const baseTeam = [
    { id: 1, name: "Stefan", role: "CMGT", img: stefan },
    { id: 2, name: "Rick", role: "CMGT", img: rick },
    { id: 3, name: "Wout", role: "CMD", img: wout },
    { id: 4, name: "Paola", role: "CMD", img: paola },
    { id: 5, name: "Stef", role: "INF", img: stef },
  ];

  const milanMember = { id: 6, name: "Milan", role: "Chief Vibes Officer", img: milan };

  const [current, setCurrent] = useState<number[]>([]);
  const [showMilan, setShowMilan] = useState(false);

  const arraysEqual = (a: number[], b: number[]) => a.length === b.length && a.every((value, index) => value === b[index]);

  const handleClick = (id: number) => {
    if (id === 4) {
      const audio = new Audio(villagerSound);

      audio.volume = 1.0;

      audio.play().catch((error) => {
        console.error("Could not play sound:", error);
      });
    }

    setCurrent((prev) => {
      let next: number[];

      if (needed[0] === id) {
        next = [id];
      } else if (prev.length === needed.length) {
        if (prev.includes(id)) {
          next = prev.filter((item) => item !== id);
        } else {
          next = prev;
        }
      } else {
        next = [...prev, id];
      }

      setShowMilan(arraysEqual(next, needed));

      return next;
    });
  };

  const team = showMilan ? [...baseTeam, milanMember] : baseTeam;

  return (
    <section className="py-20 bg-[#342626] min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#fdf1e3]">Ons Team</h2>

      <div className="flex flex-col items-center gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
          {team.slice(0, 3).map((member) => (
            <div key={member.id} className="text-center" onClick={() => handleClick(member.id)}>
              <img src={member.img} alt={member.name} className="w-40 h-48 md:w-52 md:h-60 object-cover" />

              <p className="text-[#fdf1e3] text-sm mt-2">{member.role}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center w-full">
          <div className={"grid grid-cols-1 gap-20" + (showMilan ? " md:grid-cols-3" : " sm:grid-cols-2")}>
            {team.slice(3).map((member) => (
              <div key={member.id} className="text-center" onClick={() => handleClick(member.id)}>
                <img src={member.img} alt={member.name} className="w-40 h-48 md:w-52 md:h-60 object-cover" />

                <p className="text-[#fdf1e3] text-sm mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

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

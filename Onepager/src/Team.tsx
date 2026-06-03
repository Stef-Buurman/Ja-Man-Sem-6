import { useState } from "react";
import paola from "./assets/team/Paola.png";
import rick from "./assets/team/Rick.png";
import stef from "./assets/team/Stef.png";
import stefan from "./assets/team/Stefan.png";
import wout from "./assets/team/Wout.png";
import milan from "./assets/team/Milan.png";
import villagerAccept1 from "./assets/sounds/Villager_accept1.ogg";
import villagerAccept2 from "./assets/sounds/Villager_accept2.ogg";
import villagerAccept3 from "./assets/sounds/Villager_accept3.ogg";
import villagerDeath from "./assets/sounds/Villager_death.ogg";
import villagerDeny1 from "./assets/sounds/Villager_deny1.ogg";
import villagerDeny2 from "./assets/sounds/Villager_deny2.ogg";
import villagerDeny3 from "./assets/sounds/Villager_deny3.ogg";
import villagerHurt1 from "./assets/sounds/Villager_hurt1.ogg.mp3";
import villagerHurt2 from "./assets/sounds/Villager_hurt2.ogg.mp3";
import villagerHurt3 from "./assets/sounds/Villager_hurt3.ogg.mp3";
import villagerHurt4 from "./assets/sounds/Villager_hurt4.ogg.mp3";
import villagerIdle1 from "./assets/sounds/Villager_idle1.ogg";
import villagerIdle2 from "./assets/sounds/Villager_idle2.ogg";
import villagerIdle3 from "./assets/sounds/Villager_idle3.ogg";
import villagerTrade1 from "./assets/sounds/Villager_trade1.ogg";
import villagerTrade2 from "./assets/sounds/Villager_trade2.ogg";
import villagerTrade3 from "./assets/sounds/Villager_trade3.ogg";

function Team1() {
  const needed = [3, 5, 4, 1, 2];
  const villagerSounds = [
    villagerAccept1,
    villagerAccept2,
    villagerAccept3,
    villagerDeath,
    villagerDeny1,
    villagerDeny2,
    villagerDeny3,
    villagerHurt1,
    villagerHurt2,
    villagerHurt3,
    villagerHurt4,
    villagerIdle1,
    villagerIdle2,
    villagerIdle3,
    villagerTrade1,
    villagerTrade2,
    villagerTrade3,
  ];
  const baseTeam = [
    { id: 1, name: "Stefan", role: "CMGT", img: stefan },
    { id: 2, name: "Rick", role: "CMGT", img: rick },
    { id: 3, name: "Wout", role: "CMD", img: wout },
    { id: 4, name: "Paola", role: "CMD", img: paola },
    { id: 5, name: "Stef", role: "INF", img: stef },
  ];

  const playRandomVillagerSound = () => {
    const randomIndex = Math.floor(Math.random() * villagerSounds.length);
    const randomSound = villagerSounds[randomIndex];

    const audio = new Audio(randomSound);
    audio.volume = 1.0;

    audio.play().catch((error) => {
      console.error("Could not play sound:", error);
    });
  };

  const milanMember = { id: 6, name: "Milan", role: "Chief Vibes Officer", img: milan };

  const [current, setCurrent] = useState<number[]>([]);
  const [showMilan, setShowMilan] = useState(false);

  const arraysEqual = (a: number[], b: number[]) => a.length === b.length && a.every((value, index) => value === b[index]);

  const handleClick = (id: number) => {
    if (id === 4) {
      playRandomVillagerSound();
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

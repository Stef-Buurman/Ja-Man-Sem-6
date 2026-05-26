import logo_white from "./assets/logo/jaman_white.svg";
import Usertests from "./assets/images/Usertests.jpg";
import PrototypeUpdate from "./assets/images/PrototypeUpdate.png";
import PrototypeUpdateSearchbar from "./assets/images/PrototypeUpdateSearchbar.jpg";
import WireframesHeatmap from "./assets/images/WireframesHeatmapFloor3.png";
import WireframesStart from "./assets/images/WireframesStart.png";
import WireframesStartHeatmap from "./assets/images/WireframesStartHeatmap.png";
import WireframesStep1 from "./assets/images/WireframesStep1.png";

function Sprint4() {
  return (
      <section id="sprint4" className="overflow-visible relative">

        {/* Usertests */}
        <section className="py-24 bg-[#fdf1e3] text-[#342626]">
          <h1 className="text-2xl sm:text-4xl font-bold text-center mb-12">
            SPRINT 4
          </h1>
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-start gap-10 md:gap-20">
            <div className="w-full md:w-3/5 text-left space-y-6 sm:space-y-10">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Usertests
              </h2>
              <div className="space-y-6">
                <p>
                  Voor het verbeteren van ons project hebben wij gebruikerstests uitgevoerd. Tijdens deze
                  tests zijn wij met meerdere gebruikers door potentiële scenario's gelopen zoals het
                  zoeken van lokalen, het genereren van routes en het aanklikkan van iconen.
                </p>
                <p>
                  Uit de resultaten bleek dat de basisfunctionaliteiten zoals het genereren van routes tussen
                  lokalen goed werkten. Gebruikers konden met gemak routes bekijken vanaf een gekozen startpunt
                  tot een andere gekozen locatie. Ook werd de heatmap als interessant en bruikbaar ervaren, vooral
                  als deze gebruikt kan worden bij grote gebouwen met veel studieruimtes.
                </p>
                <p>
                  Daarnaast kwamen er ook verbeterpunten naar voren:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Toiletten kan je niet opzoeken</li>
                  <li>Bepaalde locaties zoals de trap kan je niet aanklikken</li>
                  <li>De live locatie en de directie indicator werken niet goed</li>
                  <li>De filter optie kan versoepeld worden</li>
                  <li>Foutmeldingen bij het zoeken zijn niet juist</li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-2/5 flex-shrink-0">
              <img
                  src={Usertests}
                  alt="Usertests plan"
                  className="rounded-2xl shadow-xl w-full object-cover my-16"
              />
            </div>
          </div>
        </section>

        {/* Prototype updates */}
        <section className="py-24 bg-[#342626] text-[#fdf1e3] space-y-6 sm:space-y-10">
          <div className="max-w-5xl mx-auto px-6 flex gap-10 mb-16 items-center">
            {/* Afbeelding links */}
            <div className="flex-2">
              <img
                  src={PrototypeUpdate}
                  alt="Prototype update"
                  className="rounded-2xl shadow-xl w-full object-cover"/>
            </div>
            {/* Tekst rechts */}
            <div className="space-y-6 flex-1">
              <h2 className="text-3xl  sm:text-4xl font-bold">Prototype update</h2>
              <p>
                Op basis van de gebruikerstesten eerder deze sprint hebben wij ons prototype verder
                verbeterd en uitgebreid. De kaart die eerst alleen bruikbaar was voor de derde verdieping,
                is nu bijna klaar voor het hele gebouw. We hebben verdiepingen 0 tot en met 2 toegevoegd
                en missen nu alleen nog maar de verdiepingen 4 tot en met 6.
              </p>
              <p>
                Daarnaast hebben wij nooduitgangen toegevoegd aan de applicatie. Nu kan de applicatie
                niet alleen gebruikt worden voor standaard navigeren, maar ook voor het vinden
                van nooduitgangen tijdens potentieel gevaarlijke situaties.
              </p>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-6 flex gap-10 items-center">

            {/* Tekst rechts */}
            <div className="space-y-6  flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold">Rolstoeltoegankelijkheid</h2>
              <p>
                Ook hebben wij aandacht besteed aan toegankelijkheid voor gebruikers. Ze kunnen nu kiezen
                voor een roelstoelvriendelijke optie tijdens het invullen van de roete. Deze roete zal
                dan in plaats van naar de trappen, automatisch langs liften gaan.
              </p>
            </div>

            {/* Afbeelding links */}
            <div className="space-y-6 flex-2">
              <img
                  src={PrototypeUpdateSearchbar}
                  alt="Extra aandacht rolstoeltoegankelijkheid"
                  className="rounded-2xl shadow-xl w-full object-cover"/>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 flex gap-10 mb-16 items-center">
            <div className="space-y-6 flex-1">
              <h2 className="text-3xl  sm:text-4xl font-bold">Iteraties</h2>
              <p>
                Tijdens het itereren hebben wij ook geëxperimenteerd met het inschatten van de live
                locatie en een richtingsindicator. Uit de gebruikerstesten blijkt het echter alleen
                dat deze functies nog niet betrouwbaar genoeg wertken, waardoor wij hebben besloten
                om deze voor nu te schrappen.
              </p>
            </div>
          </div>
        </section>

        {/* Wireframes */}
        <section className="pb-40 pt-24 z-10 bg-[#beddfc] text-[#342626]">

          {/* TEXT */}
          <div className="max-w-3xl mx-auto px-6 text-center space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold">Wireframes update</h2>

            <p className="text-base sm:text-lg leading-relaxed">
              In de vorige sprint hebben wij wireframes gemaakt die vooral diende als een eerste schets van
              het eindproduct. Deze waren nog niet definitief en waren bedoeld om de basisstructuur en functionaliteiten te verkennen
            </p>

            <p className="text-base sm:text-lg leading-relaxed">
              Deze sprint hebben wij nieuwe wireframes gemaakt die verder uitgebreid zijn. De nieuwe
              wireframes geven een veel completer beeld waarbij alle belangrijke schermen en functionaliteiten
              aanwezig zijn en uitgewerkt zijn. Ze vormen een definitieve richting voor
              hoe de applicatie eruit zal komen te zien en zullen.
            </p>

            <p className="text-base sm:text-lg leading-relaxed">
              In de uitwerking van deze wireframes is er meer consistentie onstaan, met een beter
              uitgedachte gebruikersflow.
            </p>
          </div>

          {/* IMAGES */}
          <div className="max-w-6xl mx-auto px-6 mt-16 flex flex-wrap justify-center gap-8">

            <div className="w-[200px]">
              <img
                  src={WireframesStart}
                  alt="Startscherm"
                  className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
              />
            </div>

            <div className="w-[200px]">
              <img
                  src={WireframesStep1}
                  alt="Stap 1 route bevinden"
                  className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
              />
            </div>

            <div className="w-[200px]">
              <img
                  src={WireframesStartHeatmap}
                  alt="Startscherm heatmaps"
                  className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
              />
            </div>

            <div className="w-[200px]">
              <img
                  src={WireframesHeatmap}
                  alt="Heatmap overzicht"
                  className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
              />
            </div>

          </div>
        </section>

        {/* Logo */}
        <section className="pb-40 pt-24 z-10 bg-[#e8492b] text-[#fdf1e3]">
          <div className="max-w-5xl mx-auto px-6 text-center space-y-6 sm:space-y-10">
            <div className="flex flex-col justify-center items-center text-center">
              <img
                  src={logo_white}
                  alt="JaMan logo"
                  className="w-40 sm:w-56 md:w-64 mb-6"
              />
            </div>
          </div>
        </section>
      </section>
  );
}

export default Sprint4;

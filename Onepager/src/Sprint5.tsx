import logo_white from "./assets/logo/jaman_white.svg";
import Usertests from "./assets/images/Usertests.jpg";
import PrototypeUpdate from "./assets/images/Sprint5/ApplicationUpdate.png";
import PrototypeUpdateSearchbar from "./assets/images/PrototypeUpdateSearchbar.jpg";
import WireframesHeatmap from "./assets/images/WireframesHeatmapFloor3.png";
import WireframesStart from "./assets/images/WireframesStart.png";
import WireframesStartHeatmap from "./assets/images/WireframesStartHeatmap.png";
import WireframesStep1 from "./assets/images/WireframesStep1.png";
import Scamper from "./assets/images/SCAMPER.png";

function Sprint5() {
  return (
      <section id="sprint5" className="overflow-visible relative">

        {/* Usertests */}
        <section className="py-24 bg-[#342626] text-[#fdf1e3]">
          <h1 className="text-2xl sm:text-4xl font-bold text-center mb-12">
            SPRINT 5
          </h1>
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-start gap-10 md:gap-20">
            <div className="w-full md:w-3/5 text-left space-y-6 sm:space-y-10">
              <h2 className="text-3xl sm:text-4xl font-bold">
                ....
              </h2>
              <div className="space-y-6">
                ....
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
        <section className="py-24 bg-[#beddfc] text-[#342626] space-y-6 sm:space-y-10">
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
        <section className="pb-40 pt-24 z-10 bg-[#e8492b] text-[#fdf1e3]">

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

        {/* Ontwerprichtlijnen */}
        <section className="py-24 bg-[#fdf1e3] text-[#342626]">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-start gap-10 md:gap-20">
            <div className="w-full md:w-3/5 text-left space-y-6 sm:space-y-10">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Onze ontwerprichtlijnen
              </h2>
              <div className="space-y-6">
                <p>

                  Om een oplossing te ontwerpen die écht aansluit bij de praktijk, hebben we zeven
                  richtlijnen opgesteld. Deze zijn direct voortgekomen uit onze verschillende onderzoeken
                  en methodes:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Een helder begin en eindpunt: Gebruikers moeten bij het navigeren precies weten waar hun route start en stopt. (Uit: Crazy 8's en Smart en Social Fest)</li>
                  <li>Bruikbaar voor iedereen: De tool moet werken voor álle studenten, ongeacht hun opleiding of de HR-locatie waar ze zich bevinden. (Uit: Benchmarking interviews)</li>
                  <li>Eenvoudig te onderhouden: Het systeem moet up-to-date blijven en makkelijk beheerd kunnen worden door een vaste 'wayfinding keeper'. (Uit: Interview met Mijksenaar)</li>
                  <li>Digitaal en analoog versterken elkaar: De applicatie werkt pas echt goed als deze nauw samenwerkt met de fysieke borden in het gebouw. (Uit: Interview met Mijksenaar en benchmarking)</li>
                  <li>Snel je lokaal vinden: Studenten moeten zonder gezoek en binnen no-time bij het juiste lokaal kunnen komen. (Uit: Interviews met studenten)</li>
                  <li>Snel een studieplek spotten: De digitale interface moet direct inzichtelijk maken waar er op dat moment nog een rustige werkplek vrij is. (Uit: Interviews met studenten)</li>
                  <li>Consistent en betrouwbaar: Het systeem moet elke dag exact hetzelfde werken, zodat gebruikers er blind op kunnen vertrouwen. (Uit: Values in Design I)</li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-3/5 text-left space-y-6 sm:space-y-10">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Toegepaste methodes
              </h2>
              <div className="space-y-6">
                <p>
                  Om van al onze losse data en ingevingen tot een concreet concept te komen,
                  hebben we drie verschillende methodes ingezet:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>SCAMPER (Ideegeneratie): Met deze brainstormtechniek hebben we out-of-the-box nagedacht over ons product. Door bestaande ideeën aan te passen of te combineren, kwamen we bijvoorbeeld op functies zoals AR-navigatie en checkpoints met QR-codes.</li>
                  <li>Concept Mapping (Concepting): Hiermee hebben we de relaties tussen onze doelgroep, de knelpunten en onze oplossingen visueel gestructureerd. Het hielp ons inzien dat digitale hulpmiddelen (zoals de app en kiosk) en analoge borden complementair zijn en elkaar moeten aanvullen.</li>
                  <li>COCD Box (Convergeren): Na het brainstormen moesten we keuzes maken. Met deze methode hebben we alle ideeën gecategoriseerd op basis van haalbaarheid en originaliteit (Now, Wow, How). Zo filterden we de meest realistische en vernieuwende functies voor ons uiteindelijke prototype.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center overflow-visible">
            <img
                src={Scamper}
                alt="Usertests plan"
                className="mx-auto rounded-2xl shadow-xl w-full md:w-3/5 object-cover my-16
    transform transition-transform duration-300 hover:scale-110"
            />
          </div>
        </section>

        {/* Logo */}
        <section className="pb-40 pt-24 z-10 bg-[#342626] text-[#fdf1e3]">
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

export default Sprint5;

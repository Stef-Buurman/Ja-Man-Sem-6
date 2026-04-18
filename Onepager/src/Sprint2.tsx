import deliveryRobotImg from "./assets/images/delivery.png";
import deliveryHumanImg from "./assets/images/delivery_human.png";
import logo_white from "./assets/logo/jaman_white.svg";
import UserPersonaImg from "./assets/images/userpersona.png";
import HeatmapsImg from "./assets/images/heatmaps.png";
import Stats_Wayfinding from "./assets/images/stats_wayfinding.png";
import Stats_Werkplekken from "./assets/images/stats_werkplekken.png";
import Prototype from "./assets/images/prototype.png";

function Sprint2() {
  return (
      <section id="sprint2" className="overflow-visible relative">
        <section className="pb-40 pt-24 z-10 bg-[#342626] text-[#fdf1e3]">
          <h1 className="text-2xl sm:text-4xl font-bold text-center mb-12">
            SPRINT 2
          </h1>
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-10 md:gap-20">

              {/* Sticky afbeelding */}
              <div className="relative md:flex-[5]">
                <div>
                  <img
                      src={UserPersonaImg}
                      alt="Gebruikers persona"
                      className="rounded-xl shadow-xl w-full object-cover"
                  />
                </div>
              </div>

              {/* Scroll tekst content */}
              <div className="md:flex-[2] space-y-6 sm:space-y-8 md:space-y-10 text-[#fdf1e3] text-base sm:text-lg leading-relaxed">
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Gebruikerspersona
                </h3>

                <p>
                  Om een concreet beeld te krijgen van onze doelgroep hebben wij een interview
                  uitgevoerd met verschillende CMI studenten. De inzichten die we hiermee opgedaan hebben, hebben wij daarna
                  gebruikt om een gebruikerspersona samen te stellen. Dit is volgens ons de CMI student waar wij ons op richten.
                </p>
              </div>
            </div>
          </div>
        </section>
          <section
              id="ontwerpvraag-verandering"
              className="py-2 bg-[#beddfc] text-[#342626] z-20 md:sticky md:top-12"
          >
              <div className="max-w-6xl mx-auto px-4 space-y-6 sm:space-y-10">
                  <div className="max-w-5xl mx-auto px-4 py-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                          {/* RIGHT SIDE - BEFORE / AFTER */}
                          <div className="space-y-10 text-center">
                              {/* BEFORE */}
                              <div className="border border-[#342626]/20 rounded-2xl p-6 shadow-sm">
                                  <h3 className="text-sm uppercase tracking-widest opacity-60 mb-4">
                                      Oude ontwerpvraag
                                  </h3>
                                  <p className="text-base leading-relaxed opacity-90">
                                      Hoe kunnen we de interactie en het vertrouwen tussen mensen
                                      en een robot verbeteren, zodat deze robot op een inclusieve
                                      en transparante manier studenten en bezoekers helpt bij het
                                      CMI gebouw, en tegelijkertijd een{" "}
                                      <span style={{position: "relative", display: "inline-block", color: "red", fontWeight: "bold",}}>sociale verbinding
                                      <span
                                          style={{
                                              position: "absolute",
                                              top: "90%",
                                              left: "7%",
                                              width: "90%",
                                              borderTop: "2px solid red",
                                              transform: "rotate(-7deg) translateY(-50%)",
                                              transformOrigin: "left center",
                                          }}
                                          ></span></span>
                                      {" "}
                                      stimuleert?
                                  </p>
                              </div>

                              {/* ARROW */}
                              <div className="flex flex-col items-center gap-1 opacity-70">
                                  <span className="text-xs uppercase tracking-wider">Van</span>
                                  <span className="text-3xl animate-bounce">↓</span>
                                  <span className="text-xs uppercase tracking-wider">Naar</span>
                              </div>

                              {/* AFTER */}
                              <div className="border border-[#342626]/30 rounded-2xl p-6 shadow-md scale-[1.02]">
                                  <h3 className="text-sm uppercase tracking-widest opacity-80 mb-4">
                                      Nieuwe ontwerpvraag
                                  </h3>
                                  <p className="text-base leading-relaxed font-medium">
                                      Hoe kunnen we studenten en docenten op locatie Wijnhaven via
                                      een gebruiksvriendelijke applicatie helpen om:
                                  </p>
                                  <ul className="list-disc pl-6 space-y-1 font-medium">
                                      <li>
                                          moeiteloos hun weg te vinden in het complexe gebouw
                                      </li>
                                      <li>
                                          én snel inzicht te geven in de beschikbaarheid van rustige werkplekken?
                                      </li>
                                  </ul>
                              </div>
                          </div>
                          {/* LEFT SIDE - EXPLANATION */}
                          <div>
                              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                  Ontwerpvraag verandering
                              </h2>

                              <div className="space-y-4 leading-relaxed">
                                  <p>
                                      Uit ons onderzoek bleek dat veel studenten niet bereid zijn
                                      om hun vragen te stellen aan robots. Daarom hebben wij ervoor
                                      gekozen om dit weg te laten uit onze visie en ons meer te
                                      storten op applicaties en slimme omgevingen.
                                  </p>

                                  <p>
                                      Ook hebben wij ervoor gekozen om het sociale aspect van
                                      onze ontwerpvraag aan te kant te zetten. Wij denken dat
                                      lastig zou zijn om sociale interactie te implementeren in
                                      een product waarvan wij denken dat studenten liever
                                      productiviteit en effectiviteit verwachten.
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          {/* Heatmaps */}
          <section
              id="heatmaps"
              className="py-16 bg-[#e8492b] z-20 md:sticky md:top-12 text-[#fdf1e3]"
          >
              <div className="max-w-5xl mx-auto px-6 flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row gap-10 md:gap-20">

                      {/* Sticky afbeelding */}
                      <div className="relative">
                          <div>
                              <img
                                  src={HeatmapsImg}
                                  alt="Heatmaps prototype"
                                  className="rounded-xl shadow-xl w-full object-cover"
                              />
                          </div>
                      </div>

                      {/* Scroll tekst content */}
                      <div className="md:flex-[2] space-y-6 sm:space-y-8 md:space-y-10 text-[#fdf1e3] text-base sm:text-lg leading-relaxed">
                          <h3 className="text-2xl sm:text-3xl font-bold">
                              Heatmaps
                          </h3>
                          <p>
                              Uit onze eigen ervaringen nemen wij aan dat CMI studenten moeite hebben
                              met het vinden van rustige plekken om te studeren. Hierom hebben wij een
                              prototype gemaakt die dit probleem op lost.
                          </p>
                      </div>
                  </div>
                  <div className="pt-10">
                      <p className="text-base sm:text-lg leading-relaxed" >
                          Het idee van heatmaps is dat wij met sensoren de drukte en het
                          geluidsniveau kunnen zien. Dit kunnen wij dan in real-time aan studenten
                          laten zien waardoor zij gemakkelijk een rustige studeerplek kunnen vinden.
                      </p>
                  </div>
              </div>
          </section>

          {/* Enquete */}
          <section
              id="enquete"
              className="py-16 bg-[#fdf1e3] z-20 md:sticky md:top-12 text-[#e8492b]"
          >
              <div className="max-w-5xl mx-auto px-6 text-center space-y-6 sm:space-y-10 text-[#342626]">
                  <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col md:flex-[1]">
                          <div className="bg-[#342626]">
                              <img
                                  src={Stats_Wayfinding}
                                  alt="Uitkomsten wayfinding"
                                  className="rounded-2xl shadow-xl w-full object-cover"
                              />
                          </div>
                          <div className="bg-[#342626]">
                              <img
                                  src={Stats_Werkplekken}
                                  alt="Uitkomsten werkplekken"
                                  className="rounded-xl shadow-xl w-full object-cover"
                              />
                          </div>
                      </div>
                      <div className="flex flex-col space-y-6 sm:space-y-10">
                          <h2 className="text-4xl sm:text-4xl font-bold">Fieldresearch</h2>
                         <div className="space-y-2">
                             <p className="text-base sm:text-xl leading-relaxed md:flex-[1] text-left">
                                 Om onze aannames vast te stellen hebben wij een enquête afgenomen bij
                                 studenten en docenten van de Hogeschool Rotterdam.

                                 Hieruit blijkt dat:
                             </p>
                             <ul className="list-disc pl-6 space-y-2 text-left text-base sm:text-xl">
                                 <li>Studenten van het CMI moeite hebben met de weg vinden in ons gebouw.</li>
                                 <li>De kwaliteit van werkplekken laag zijn.</li>
                                 <li>Er een grote vraag is naar een route-tool.</li>
                                 <li>Er een grote vraag is naar een drukte-indicator.</li>
                             </ul>
                         </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* Prototype */}
          <section
              id="prototype"
              className="py-16 bg-[#342626] z-20 md:sticky md:top-12 text-[#fdf1e3]"
          >
              <div className="max-w-5xl mx-auto px-6 text-center space-y-6 sm:space-y-10">
                  <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col space-y-6 sm:space-y-10">
                          <h2 className="text-4xl sm:text-4xl font-bold">Prototype</h2>
                          <div className="space-y-4 leading-relaxed space-y-2">
                              <p className="text-base sm:text-xl leading-relaxed md:flex-[1] text-left">
                                  Na het onderzoeken van bestaande wayfinding methodes zijn wij
                                  terechtgekomen op de kaart van zuidplein. Hier hebben wij inspiratie
                                  van opgedaan waarna wij in illustrator zelf een prototype hebben gemaakt.
                              </p>
                              <p className="text-base sm:text-xl leading-relaxed md:flex-[1] text-left">
                                  Wat wij nu hebben is een kaart die wij als applicatie kunne
                                  gebruiken om te laten zien waar de lokalen zijn in het gebouw.
                                  Ook kan je drukken op het lokaal waar je moet zijn, waarna je een
                                  route krijgt te zien.
                              </p>
                          </div>
                      </div>
                      <div className="flex flex-col md:flex-[1]">
                          <div>
                              <img
                                  src={Prototype}
                                  alt="Prototype"
                                  className="rounded-xl shadow-xl w-full max-h-[80vh] object-cover"
                              />
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* Planning sprint 3 */}
          <section
              id="sprint-planning"
              className="py-16 z-40 md:sticky md:top-12 bg-[#beddfc] text-[#342626]"
          >
              <div className="max-w-5xl mx-auto px-6 text-center space-y-6 sm:space-y-10">
                  <h2 className="text-3xl sm:text-4xl font-bold">
                      Planning sprint 3
                  </h2>

                  <p className="text-base sm:text-lg leading-relaxed">
                      Nu dat wij een beter idee hebben van wat onze doelgroep is en welke problemen
                      wij op willen lossen hebben wij een sterke basis om verder mee te werken in sprint
                      3. Wij zullen ons nu dan focussen op het maken, verbeteren prototypes en testen van
                      de ideeën die wij hebben gekregen uit de laatste sprint.
                  </p>

                  {/* Doelen */}
                  <div className="text-left max-w-3xl mx-auto border border-[#fdf1e3] rounded-2xl p-6">
                      <h3 className="text-2xl font-semibold mb-4">Doelen</h3>
                      <ul className="list-disc pl-6 space-y-2">
                          <li>User persona aanpassen.</li>
                          <li>Prototype verbeteren en testen.</li>
                          <li>Heatmap onderzoek.</li>
                          <li>Interviews met Mijksenaar wayfinding.</li>
                      </ul>
                  </div>
              </div>
          </section>

        {/* Logo */}
      <section
        id="logo"
        className="md:h-[44vh] py-16 bg-[#e8492b] z-40 md:sticky md:top-120 flex justify-center items-center"
      >
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 sm:space-y-10 text-[#342626]">
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

export default Sprint2;
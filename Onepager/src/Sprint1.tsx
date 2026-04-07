import deliveryHumanImg from "./assets/images/delivery_human.png";
import PactAnalyseCardGrid from "./components/PactAnalyseCardGrid";
import logo_white from "./assets/logo/jaman_white.svg";
import logo_brown from "./assets/logo/jaman_brown.svg";
import FieldResearchCardGrid from "./components/FieldResearchCard";

function Sprint1() {
  return (
    <section id="sprint1" className="overflow-visible relative">
      {/* HUIDIGE SITUATIE */}
      <section className="pb-40 pt-24 bg-[#fdf1e3] justify-center h-100vh]">
        <h1 id="sprint1" className="text-2xl sm:text-4xl font-bold text-center">
          SPRINT 1
        </h1>
        <div className="space-y-6 sm:space-y-8 md:space-y-10 text-[#342626] text-base sm:text-lg leading-relaxed max-w-5xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold">Pact analyse</h3>

          <p>
            Wij hebben deskresearch gedaan over bezorgrobots en bezorgservices
            zodat wij de huidige situatie in kaart kunnen brengen met de
            problemen die hierbij komen kijken. Hiervoor hebben wij een
            uitgebreide PACT-analyse uitgevoerd waarna we onze bevindingen
            overzichtelijk gemaakt hebben door middel van het gebruik van
            inzicht-kaarten. Een paar onderwerpen die vaak teruggekomen waren
            tijdens onze research zijn:
          </p>
          <ul className="space-y-2 sm:space-y-3 list-disc pl-6">
            <li>Problemen met regelgeving.</li>
            <li>Veiligheid en privacy.</li>
            <li>Vertrouwen.</li>
            <li>Logistieke problemen.</li>
            <li>Sociale communicatie met robots.</li>
          </ul>
        </div>
        <PactAnalyseCardGrid />
      </section>
      <section
        id="ontwerpvraag-verandering"
        className="py-2 bg-[#342626] z-20 md:top-15"
      >
        <div className="max-w-6xl mx-auto px-4 space-y-6 sm:space-y-10 text-[#fdf1e3]">
          <div className="max-w-5xl mx-auto px-4 py-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* LEFT SIDE - EXPLANATION */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Ontwerpvraag verandering
                </h2>

                <div className="space-y-4 leading-relaxed">
                  <p>
                    Uit ons onderzoek bleek dat onze huidige ontwerpvraag die
                    vooral gefocust is op bezorgrobots zou moeten veranderen.
                    Bezorgrobots, die vooral als doel hebben om zo snel mogelijk
                    autonoom een pakket of product te bezorgen, hebben relatief
                    weinig sociale interactie in vergelijking met andere
                    autonome robots in de openbare en sociale sector.
                  </p>

                  <p>
                    Het gebrek aan sociale interactie is een groot probleem
                    omdat onze kernwaarden dit juist als prioriteit stellen.
                  </p>

                  <p>
                    Daarom hebben wij besloten om ons te focussen op studenten
                    en bezoekers van het CMI-gebouw. In deze sociale omgeving
                    kunnen wij een oplossing ontwikkelen die niet alleen
                    functioneel is, maar ook onze kernwaarden versterkt.
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE - BEFORE / AFTER */}
              <div className="space-y-10 text-[#fdf1e3] text-center">
                {/* BEFORE */}
                <div className="border border-[#fdf1e3]/20 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm uppercase tracking-widest opacity-60 mb-4">
                    Oude ontwerpvraag
                  </h3>
                  <p className="text-base leading-relaxed opacity-90">
                    Hoe kunnen we de interactie, het vertrouwen en de
                    samenwerking tussen mensen en bezorgrobots en de sociale
                    verbinding tussen bewoners in de openbare ruimte faciliteren
                    en verbeteren door middel van inclusieve en transparante
                    digitale oplossingen?
                  </p>
                </div>

                {/* ARROW */}
                <div className="flex flex-col items-center gap-2 opacity-70">
                  <span className="text-xs uppercase tracking-wider">Van</span>
                  <span className="text-3xl animate-bounce">↓</span>
                  <span className="text-xs uppercase tracking-wider">Naar</span>
                </div>

                {/* AFTER */}
                <div className="border border-[#fdf1e3]/30 rounded-2xl p-6 shadow-md scale-[1.02]">
                  <h3 className="text-sm uppercase tracking-widest opacity-80 mb-4">
                    Nieuwe ontwerpvraag
                  </h3>
                  <p className="text-base leading-relaxed font-medium">
                    Hoe kunnen we de interactie en het vertrouwen tussen mensen
                    en een robot verbeteren, zodat deze robot op een inclusieve
                    en transparante manier studenten en bezoekers helpt bij het
                    CMI gebouw, en tegelijkertijd een sociale verbinding
                    stimuleert?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="field-research"
        className="py-16 bg-[#beddfc] z-30 md:top-12 pb-70"
      >
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 sm:space-y-10 text-[#342626]">
          <h2 className="text-3xl sm:text-4xl font-bold">Field research</h2>

          <p>
            Wij hebben fieldresearch gedaan om aan bezoekers van het Wijnhaven
            107 t/m 99. Hierin hebben wij een korte vragenlijst opgesteld waarin
            wij duidelijk wilde hebben welke problemen de studenten of docenten
            ervaren in dit gebouw. Wat ronduit het vaakst benoemd werd is dat de
            lokalen lastig te vinden zijn, onder andere omdat op sommige
            verdiepingen je niet van de ene naar de andere kant van het gebouw
            kan lopen. Daarnaast werd ook het inzien welke lokalen bezet zijn,
            zodat studenten weten waar ze kunnen kijken voor een rustige
            studeerplek. De volgende punten werden hiernaast ook nog vaak
            benoemd als ervaringen met het gebouw en mogelijke verbeterpunten:
          </p>

          <ul className="space-y-3 sm:space-y-5 text-base sm:text-lg max-w-3xl mx-auto text-left list-disc pl-6 leading-relaxed">
            <li>De lift loopt vaak vast of is erg traag.</li>
            <li>Weinig rustige werkplekken waar je ongestoord kan studeren.</li>
            <li>
              Stopcontacten doen het op de 4e verdieping al een tijd niet.
            </li>
            <li>
              Om tafeltennis badjes te krijgen moet je naar de receptie gaan om
              deze daar te lenen.
            </li>
          </ul>
          <FieldResearchCardGrid />
        </div>
      </section>
      {/* Planning sprint 2 */}
      <section
          id="sprint-planning"
          className="py-16 bg-[#e8492b] z-40 md:top-12 text-[#fdf1e3]"
      >
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 sm:space-y-10">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Planning sprint 2
          </h2>

          <p className="text-base sm:text-lg leading-relaxed">
            Omdat wij na tijdens sprint 1 verandert zijn van doelgroep en ontwerpvraag zullen wij
            ons tijdens sprint 2 bezig houden met het onderzoeken van de nieuwe gebruiker en
            onze nieuwe aannames.
          </p>

          {/* Doelen */}
          <div className="text-left max-w-3xl mx-auto border border-[#fdf1e3] rounded-2xl p-6">
            <h3 className="text-2xl font-semibold mb-4">Doelen</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Een user persona opstellen aan de hand van interviews.</li>
              <li>Sociale interactie onderzoeken.</li>
              <li>Slimme omgevingen onderzoeken.</li>
              <li>Prototypes maken en testen.</li>
            </ul>
          </div>
        </div>
      </section>
      <section
        id="logo"
        className="md:h-[44vh] py-16 bg-[#fdf1e3] z-40 md:top-0 flex justify-center items-center"
      >
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 sm:space-y-10 text-[#342626]">
          <div className="flex flex-col justify-center items-center text-center">
            <img
              src={logo_brown}
              alt="JaMan logo"
              className="w-40 sm:w-56 md:w-64 mb-6"
            />
          </div>
        </div>
      </section>
    </section>
  );
}

export default Sprint1;

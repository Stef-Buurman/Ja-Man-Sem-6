import logo_brown from "./assets/logo/jaman_brown.svg";
import wayfindingImg from "./assets/images/WayfindingPaal.png"
import prototype from "./assets/images/prototypev4.png"
import heatmapPrototype from "./assets/images/heatmapPrototype.png"
import wireframe_default from "./assets/images/wireframe1.png"
import wireframe_extended from "./assets/images/wireframe2.png"

function Sprint3() {
  return (
      <section id="sprint3" className="overflow-visible relative">

        {/* Wayfinding research */}
        <section className="pb-40 pt-24 bg-[#fdf1e3] text-[#342626]">
          <h1 className="text-2xl sm:text-4xl font-bold text-center mb-12">
            SPRINT 3
          </h1>
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-start gap-10 md:gap-20">
                <div className="w-full md:w-2/5 flex-shrink-0">
                    <img
                        src={wayfindingImg}
                        alt="Uitkomsten wayfinding"
                        className="rounded-2xl shadow-xl w-full object-cover"
                    />
                </div>
                <div className="w-full md:w-3/5 text-left space-y-6 sm:space-y-10">
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        Wayfinding research
                    </h2>
                    <div className="space-y-6">
                        <p>
                            Na op onderzoek uitgegaan te zijn op verschillende locaties blijkt dat interactieve
                            navigatiesystemen weinig aanwezig zijn. Op plekken zoals Zuidplein en TU Delft wordt
                            vooral gebruik gemaakt van grote statische borden en fysieke kaarten.
                        </p>
                        <p>
                            Daarnaast lijk het er ook op dat mensen en simpele structuren een belangrijke rol
                            spelen in de oriëntatie. Medewerkers helpen bezoekers met het vinden van de
                            juiste route, en afdelingen worden vaak aangeduid met letters of kleuren om het
                            overzichtelijker te maken. Hierdoor blijft wayfinding in de praktijk
                            vooral een combinatie van fysieke borden en menselijk hulp, met weinig
                            digitale ondersteuning.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Prototyping */}
        <section className="pb-40 pt-24 bg-[#342626] text-[#fdf1e3] space-y-6 sm:space-y-10">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-10 md:gap-20">
                <div className="space-y-6 sm:space-y-10">
                    <h2 className="text-3xl  sm:text-4xl font-bold">Wayfinding prototype</h2>
                    <p>
                        In de vorige sprint hebben wij een eerste kleine versie van het 3D
                        wayfinding prototype ontwikkeld. Deze sprint hebben wij hierop
                        voortgebouwd en het concept verder uitgewerkt en verbeterd. Het resultaat
                        hiervan is een nog uitgebreider prototype dat gebruikers beter ondersteunt
                        bij het vinden van de weg binnen school. Door de toevoeging van extra details,
                        iconen en optimalisaties is de navigatie intuïtiever en praktischer voor gebruik.
                    </p>
                </div>
                <div className="flex-[1]">
                    <img
                        src={prototype}
                        alt="Uitkomsten wayfinding"
                        className="rounded-2xl shadow-xl w-full h-[40vh] object-cover"/>
                </div>
            </div>
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-10 md:gap-20">
                <div className="flex-[1]">
                    <img
                        src={heatmapPrototype}
                        alt="Uitkomsten wayfinding"
                        className="rounded-2xl shadow-xl w-full h-[60vh] object-cover"/>
                </div>
                <div className="flex-[1] text-left space-y-6 sm:space-y-10">
                    <h2 className="text-3xl  sm:text-4xl font-bold">Heatmap prototype</h2>
                    <p>
                        Voor het heatmap idee uit de vorige sprint hebben wij al bestaande
                        versies van onze wayfinding prototypes gebruikt om het concept verder uit te
                        werken. Hiervoor hebben wij vooral gekeken naar het visueel en duidelijk
                        maken van het idee. De heatmap geeft inzicht in drukke plekken binnen de school,
                        met een duidelijk verschil tussen de niveau's van drukte. Zo hopen wij dat
                        studenten hier gebruik van zouden kunnen maken om rustige werkplekken te vinden.
                    </p>
                </div>
            </div>
        </section>

        {/* Wireframes */}
        <section className="pb-40 pt-24 z-10 bg-[#beddfc] text-[#342626]">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-10 md:gap-20">
                <div className="space-y-6 sm:space-y-10">
                    <h2 className="text-3xl  sm:text-4xl font-bold">Wireframes</h2>
                    <div className="space-y-6">
                        <p>
                            Wij hebben ook wireframes ontworpen voor de implementatie van onze prototypes
                            in de Hogeschool Rotterdam app. Deze wireframes geven een eerste indruk van
                            hoe de navigatiefuncties geïntegreerd zouden kunnen worden in de bestaande
                            omgeving.
                        </p>
                        <p>
                            De ontwerpen zijn aleen nog niet definitief en moeten nog afgestemd worden
                            met de directie en verdere richting van het huidige wayfinding prototype.
                        </p>
                    </div>
                </div>
                <div className="flex-[1]">
                    <img
                        src={wireframe_default}
                        alt="Uitkomsten wayfinding"
                        className="rounded-2xl shadow-xl w-full h-[40vh] object-cover"/>
                </div>
                <div className="flex-[1]">
                    <img
                        src={wireframe_extended}
                        alt="Uitkomsten wayfinding"
                        className="rounded-2xl shadow-xl w-full h-[60vh] object-cover"/>
                </div>
            </div>
        </section>

        {/* Planning sprint 4 */}
        <section className="pb-40 pt-24 z-10 bg-[#e8492b] text-[#fdf1e3]">
            <div className="max-w-5xl mx-auto px-6 text-center space-y-6 sm:space-y-10">
                <h2 className="text-3xl sm:text-4xl font-bold">
                    Planning sprint 3
                </h2>

                <p className="text-base sm:text-lg leading-relaxed">
                    Omdat wij deze sprint niet toegekomen zijn aan het testen van onze bevindingen
                    en prototypes, zullen wij volgende sprint hier de prioriteit op moeten zetten.
                    Het is van belang dat voordat wij verder gaan, meer gebruiker feedback krijgen
                    op ons huidige punt. Ook zullen wij met deze informatie onze prototypes en
                    wireframes verdat aan moeten passen, waarna wij hopelijk een sterke basis hebben
                    om verder mee te werken.
                </p>

                {/* Doelen */}
                <div className="text-left max-w-3xl mx-auto border border-[#fdf1e3] rounded-2xl p-6">
                    <h3 className="text-2xl font-semibold mb-4">Doelen</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Mijksenaar interviewen.</li>
                        <li>Doelgroep interviewen.</li>
                        <li>Crazy 8s.</li>
                        <li>Contact opzoeken met de roostermaker.</li>
                        <li>Non-human persona maken.</li>
                        <li>Aanpassingen maken aan het prototype.</li>
                        <li>Wireframing.</li>
                    </ul>
                </div>
            </div>
        </section>

        {/* Logo */}
        <section
            id="logo"
            className="md:h-[44vh] py-16 bg-[#fdf1e3] z-40 md:sticky md:top-120 flex justify-center items-center"
        >
          <div className="max-w-5xl mx-auto px-6 text-center space-y-6 sm:space-y-10">
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

export default Sprint3;
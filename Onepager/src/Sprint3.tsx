import logo_brown from "./assets/logo/jaman_brown.svg";
import logo_white from "./assets/logo/jaman_white.svg";
import wayfindingImg from "./assets/images/WayfindingPaal.png"
import prototype from "./assets/images/3dv4.png"
import heatmapPrototype from "./assets/images/heatmapPrototype.png"
import wireframe_default from "./assets/images/wireframe1.png"
import wireframe_extended from "./assets/images/wireframe2.png"
import startscherm from "./assets/images/Startscherm route.png"
import kioskstartscherm from "./assets/images/Kiosk startscherm.png"
import HeatmapsImg from "./assets/images/heatmaps.png";
import mapv1 from "./assets/images/3dv1.png";
import mapv2 from "./assets/images/3dv2.png";
import NonhumanPersona from "./assets/images/Nonhuman-persona.png";

function Sprint3() {
  return (
      <section id="sprint3" className="overflow-visible relative">

        {/* Wayfinding */}
        <section className="py-24 bg-[#fdf1e3] text-[#342626]">
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

        {/* Prototypes */}
        <section className="py-24 bg-[#342626] text-[#fdf1e3] space-y-6 sm:space-y-10">
            <div className="max-w-5xl mx-auto px-6 flex gap-10 mb-16 items-center">

                {/* Afbeelding links */}
                <div className="flex-2">
                    <img
                        src={prototype}
                        alt="Uitkomsten wayfinding"
                        className="rounded-2xl shadow-xl w-full object-cover"/>
                </div>

                {/* Tekst rechts */}
                <div className="space-y-6 flex-1">
                    <h2 className="text-3xl  sm:text-4xl font-bold">Wayfinding prototype V4</h2>
                    <p>
                        In de vorige sprint hebben wij een eerste kleine versie van het 3D
                        wayfinding prototype ontwikkeld. Deze sprint hebben wij hierop
                        voortgebouwd en het concept verder uitgewerkt en verbeterd. Het resultaat
                        hiervan is een nog uitgebreider prototype dat gebruikers beter ondersteunt
                        bij het vinden van de weg binnen school. Door de toevoeging van extra details,
                        iconen en optimalisaties is de navigatie intuïtiever en praktischer voor gebruik.
                    </p>
                </div>
            </div>
            <div className="max-w-5xl mx-auto px-6 flex gap-10 items-center">

                {/* Tekst rechts */}
                <div className="space-y-6  flex-1">
                    <h2 className="text-3xl sm:text-4xl font-bold">Heatmap prototype</h2>
                    <p>
                        Voor het heatmap idee uit de vorige sprint hebben wij al bestaande
                        versies van onze wayfinding prototypes gebruikt om het concept verder uit te
                        werken. Hiervoor hebben wij vooral gekeken naar het visueel en duidelijk
                        maken van het idee. De heatmap geeft inzicht in drukke plekken binnen de school,
                        met een duidelijk verschil tussen de niveau's van drukte. Zo hopen wij dat
                        studenten hier gebruik van zouden kunnen maken om rustige werkplekken te vinden.
                    </p>
                </div>

                {/* Afbeelding links */}
                <div className="space-y-6 flex-2">
                    <img
                        src={heatmapPrototype}
                        alt="Uitkomsten wayfinding"
                        className="rounded-2xl shadow-xl w-full object-cover"/>
                </div>
            </div>
        </section>

        {/* Wireframes */}
          <section className="pb-40 pt-24 z-10 bg-[#beddfc] text-[#342626]">

              {/* TEXT */}
              <div className="max-w-3xl mx-auto px-6 text-center space-y-6 sm:space-y-8">
                  <h2 className="text-3xl sm:text-4xl font-bold">Wireframes</h2>

                  <p className="text-base sm:text-lg leading-relaxed">
                      Wij hebben ook wireframes ontworpen voor de implementatie van onze prototypes
                      in de Hogeschool Rotterdam app. Deze wireframes geven een eerste indruk van
                      hoe de navigatiefuncties geïntegreerd zouden kunnen worden in de bestaande
                      omgeving.
                  </p>

                  <p className="text-base sm:text-lg leading-relaxed">
                      De ontwerpen zijn alleen nog niet definitief en moeten nog afgestemd worden
                      met de directie en verdere richting van het huidige wayfinding prototype.
                  </p>
              </div>

              {/* IMAGES */}
              <div className="max-w-6xl mx-auto px-6 mt-16 flex flex-wrap justify-center gap-8">

                  <div className="w-[200px]">
                      <img
                          src={wireframe_default}
                          alt="Uitkomsten wayfinding"
                          className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
                      />
                  </div>

                  <div className="w-[200px]">
                      <img
                          src={wireframe_extended}
                          alt="Uitkomsten wayfinding"
                          className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
                      />
                  </div>

                  <div className="w-[200px]">
                      <img
                          src={startscherm}
                          alt="startscherm wayfinding"
                          className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
                      />
                  </div>

                  <div className="w-[200px]">
                      <img
                          src={kioskstartscherm}
                          alt="kiosk wayfinding"
                          className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
                      />
                  </div>

              </div>
          </section>

          {/* Nonuman Persona */}
          <section className="py-24 bg-[#e8492b] text-[#fdf1e3] space-y-6 sm:space-y-10">
              <div className="max-w-5xl mx-auto px-6 flex gap-10 mb-16 items-center">

                  <div className="flex-2">
                      <img
                          src={NonhumanPersona}
                          alt="Non human persona"
                          className="rounded-2xl w-full object-cover"/>
                  </div>

                  <div className="space-y-6 flex-1">
                      <h2 className="text-3xl  sm:text-4xl font-bold">Nonhuman persona</h2>
                      <p>
                          Om een correct beeld te krijgen over het gebouw waar wij onze aandacht aan besteden
                          tijdens het maken van onze applicatie hebben wij een Nonhuman persona aangemaakt.
                          Zo hopen wij tijdens het proces een duidelijk punt te maken van de frustraties die
                          door het gebouw voorkomen, wie het gebouw binnenkomt en wat de oorzaak is van de
                          problemen die wij op proberen te lossen.
                      </p>
                  </div>
              </div>
          </section>

        {/* Logo */}
        <section className="pb-40 pt-24 z-10 bg-[#fdf1e3] text-[#342626]">
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
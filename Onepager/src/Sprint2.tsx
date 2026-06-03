import deliveryRobotImg from "./assets/images/delivery.png";
import deliveryHumanImg from "./assets/images/delivery_human.png";
import logo_white from "./assets/logo/jaman_white.svg";
import UserPersonaImg from "./assets/images/userpersona.png";
import HeatmapsImg from "./assets/images/heatmaps.png";
import mapv1 from "./assets/images/3dv1.png";
import mapv2 from "./assets/images/3dv2.png";
import Stats_Wayfinding from "./assets/images/stats_wayfinding.png";
import Stats_Werkplekken from "./assets/images/stats_werkplekken.png";
import Prototype from "./assets/images/prototype.png";
import PactAnalyseCardGrid from "./components/PactAnalyseCardGrid";

function Sprint2() {
    return (
        <section id="sprint2" className="">
            <section className="py-24 bg-[#fdf1e3]">

                <h1 id="sprint1" className="text-2xl sm:text-4xl font-bold text-center">
                    SPRINT 2
                </h1>

                <div className="max-w-5xl mx-auto px-6 my-16">
                    <div className="flex flex-col md:flex-row gap-10 md:gap-20">

                        {/* Sticky afbeelding */}
                        <div className="relative md:flex-[5]">
                            <div>
                                <img
                                    src={UserPersonaImg}
                                    alt="Gebruikers persona"
                                    className="rounded-xl w-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Scroll tekst content */}
                        <div
                            className="md:flex-[2] space-y-6 sm:space-y-8 md:space-y-10 text-[#342626] text-base leading-relaxed">
                            <h3 className="text-2xl sm:text-3xl font-bold">
                                Gebruikerspersona
                            </h3>

                            <p>
                                Om een concreet beeld te krijgen van onze doelgroep hebben wij een interview
                                uitgevoerd met verschillende CMI studenten. De inzichten die we hiermee opgedaan hebben,
                                hebben wij daarna
                                gebruikt om een gebruikerspersona samen te stellen. Dit is volgens ons de CMI student
                                waar wij ons op richten.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="max-w-5xl mx-auto px-6 ">

                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Doelgroep, behoeften & context
                    </h2>

                    <div className="space-y-6 text-base leading-relaxed">

                        <p className="mb-14">
                            De doelgroep bestaat uit studenten en docenten van de Hogeschool Rotterdam op
                            locatie Wijnhaven. Zij maken dagelijks gebruik van het gebouw voor lessen,
                            projecten en zelfstandig studeren, en lopen daarbij tegen praktische
                            problemen aan binnen de fysieke omgeving.
                        </p>

                        <div className="flex flex-col md:flex-row gap-10">

                            <div className="md:w-1/2">
                                <h3 className="font-bold text-xl mb-2">Diversiteit binnen de groep</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Verschillende studierichtingen en opleidingsniveaus</li>
                                    <li>Variërende digitale vaardigheden</li>
                                    <li>Verschillende mate van ervaring binnen het gebouw</li>
                                    <li>Docenten en studenten met uiteenlopende behoeften en doelen</li>
                                </ul>
                            </div>

                            <div className="md:w-1/2">
                                <h3 className="font-bold text-xl mb-2">Behoeften</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Overzicht en duidelijke navigatie binnen het gebouw</li>
                                    <li>Snel kunnen vinden van lokalen en ruimtes</li>
                                    <li>Inzicht in beschikbare en rustige werkplekken</li>
                                    <li>Duidelijke structuur en verwachtingen binnen de leeromgeving</li>
                                    <li>Ondersteuning wanneer zij vastlopen</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl mb-2">Context</h3>
                            <p>
                                De doelgroep bevindt zich voornamelijk binnen het CMI-gebouw, waar zij
                                dagelijks navigeren tussen verschillende verdiepingen en ruimtes. De
                                complexiteit van het gebouw en het gebrek aan overzicht zorgen ervoor dat
                                het vinden van lokalen en geschikte werkplekken vaak als frustrerend wordt
                                ervaren.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <section className="pb-40 pt-24 z-10 bg-[#342626] text-[#fdf1e3]">
                <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 mb-16 items-center">

                    {/* Afbeelding links */}
                    <div>
                        <img
                            src={HeatmapsImg}
                            alt="Heatmaps prototype"
                            className="rounded-xl shadow-xl w-full object-cover"
                        />
                    </div>

                    {/* Tekst rechts */}
                    <div className="space-y-6">
                        <h3 className="text-2xl sm:text-3xl font-bold">
                            Heatmaps
                        </h3>

                        <p className="leading-relaxed">
                            Uit de resultaten van onze interviews en enquêtes bleek dat veel CMI-studenten moeite hebben
                            met het vinden van rustige plekken om te studeren. Op basis van deze inzichten hebben wij
                            een visualisatie ontwikkeld die aantoond hoe wij dit probleem willen aanpakken.
                        </p>

                        <p className="leading-relaxed">
                            Het idee van heatmaps is dat wij met sensoren de drukte en het geluidsniveau kunnen meten.
                            Deze informatie kan vervolgens in real-time aan studenten worden weergegeven, waardoor zij
                            gemakkelijk een rustige studeerplek kunnen vinden.
                        </p>
                    </div>
                </div>
                <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

                    {/* Tekst rechts */}
                    <div className="space-y-6">
                        <h3 className="text-2xl sm:text-3xl font-bold">
                            Wayfinding
                        </h3>

                        <p className="leading-relaxed">
                            Na het verder onderzoeken van onze doelgroep hebben we aanvullend deskresearch gedaan naar
                            bestaande methodes van wayfinding. Op basis hiervan hebben we een eerste prototype
                            ontwikkeld.
                        </p>

                        <p className="leading-relaxed">
                            In dit prototype hebben we een plattegrond gemaakt van een gedeelte van het schoolgebouw,
                            waarbij gebruikers eenvoudig een lokaal kunnen selecteren. Vervolgens wordt de snelste route
                            naar dit lokaal berekend en visueel weergegeven.
                        </p>
                    </div>

                    {/* Afbeelding links */}
                    <div className="space-y-6">
                        <img
                            src={mapv1}
                            alt="3d map v1"
                            className="rounded-xl shadow-xl w-full object-cover"
                        />
                        <img
                            src={mapv2}
                            alt="3d map v2"
                            className="rounded-xl shadow-xl w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            <section id="ontwerpvraag-verandering" className="py-16 bg-[#beddfc] text-[#342626]">
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
                                    <p className="text-base leading-relaxed font-medium">
                                        Hoe kunnen we de
                                        <span className="text-[#e8492b] font-bold"> interactie</span> en het
                                        <span className="text-[#e8492b] font-bold"> vertrouwen</span> tussen mensen
                                        en een robot verbeteren, zodat deze robot op een
                                        <span className="text-[#e8492b] font-bold"> inclusieve</span> en
                                        <span className="text-[#e8492b] font-bold"> transparante</span> manier studenten
                                        en bezoekers helpt bij het CMI gebouw, en tegelijkertijd een
                                        <span style={{
                                            position: "relative",
                                            display: "inline-block",
                                            color: "#e8492b",
                                            fontWeight: "bold",
                                        }}>sociale verbinding
                                      <span
                                          style={{
                                              position: "absolute",
                                              top: "90%",
                                              left: "7%",
                                              width: "90%",
                                              borderTop: "3px solid #e8492b",
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
                                        Hoe kunnen we
                                        <span className="text-[#e8492b] font-bold"> studenten</span> en
                                        <span className="text-[#e8492b] font-bold"> docenten</span> op locatie Wijnhaven
                                        via
                                        een gebruiksvriendelijke
                                        <span className="text-[#e8492b] font-bold"> applicatie</span> helpen om:
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
                                    Ontwerpvraag 3.0
                                </h2>

                                <div className="space-y-4 leading-relaxed">
                                    <p>
                                        Nadat we de doelgroep goed in kaart hebben gebracht, hebben we onze ontwerpvraag
                                        opnieuw aangepast. We hebben ervoor gekozen om het sociale aspect uit onze
                                        ontwerpvraag te halen. We denken dat het lastig is om sociale interactie te
                                        implementeren in een product, terwijl wij verwachten dat studenten vooral
                                        behoefte hebben aan productiviteit en effectiviteit.
                                    </p>

                                    <p>
                                        Door deze aanpassing sluit onze ontwerpvraag beter aan bij de behoeften van onze
                                        doelgroep en de context van het CMI-gebouw.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logo */}
            <section id="logo" className="md:h-[44vh] py-16 bg-[#e8492b] flex justify-center items-center">
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
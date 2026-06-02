import deliveryHumanImg from "./assets/images/delivery_human.png";
import PactAnalyseCardGrid from "./components/PactAnalyseCardGrid";
import logo_white from "./assets/logo/jaman_white.svg";
import logo_brown from "./assets/logo/jaman_brown.svg";
import FieldResearchCardGrid from "./components/FieldResearchCard";

function Sprint1() {
    return (
        <section id="sprint1" className="overflow-visible relative">
            {/* Pact Analyse */}
            <section className="py-24 bg-[#fdf1e3]">
                <h1 id="sprint1" className="text-2xl mb-10 sm:text-4xl font-bold text-center">
                    SPRINT 1
                </h1>
                <div
                    className="space-y-6 sm:space-y-8 md:space-y-10 text-[#342626] text-base leading-relaxed max-w-5xl mx-auto">
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
                <PactAnalyseCardGrid/>
            </section>

            {/* Field-Research */}
            <section id="field-research" className="py-10 bg-[#342626] z-20 md:top-15">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-6 sm:space-y-10 text-[#fdf1e3]">
                    <h2 className="text-3xl sm:text-4xl font-bold">Field research</h2>

                    <p>
                        We hebben fieldresearch uitgevoerd door enquêtes af te nemen onder bezoekers van het
                        schoolgebouw aan de Wijnhaven 107 t/m 99. Uit deze resultaten kwamen meerdere bevindingen naar
                        voren. Het grootste pijnpunt voor onze doelgroep blijkt het vinden van lokalen te zijn. Veel
                        studenten en docenten geven aan dat lokalen lastig te vinden zijn, mede doordat sommige
                        verdiepingen niet volledig met elkaar verbonden zijn, waardoor je niet eenvoudig van de ene naar
                        de andere kant van het gebouw kunt lopen.

                        Daarnaast werd ook regelmatig genoemd dat er behoefte is aan meer inzicht in welke lokalen bezet
                        of beschikbaar zijn, zodat studenten makkelijker een rustige studieplek kunnen vinden.
                    </p>
                    <p>
                        Op basis van deze inzichten zijn we verder gegaan met research through design om dit probleem
                        beter te onderzoeken en te valideren. We hebben een prototype ontwikkeld en getest bij onze
                        doelgroep. Uit deze tests bleek opnieuw dat veel gebruikers daadwerkelijk moeite hebben met het
                        vinden van lokalen en dat er duidelijke behoefte is aan een hulpmiddel dat hen hierbij
                        ondersteunt.

                        Een opvallend inzicht uit deze testfase was dat gebruikers weinig interesse toonden in het
                        gebruik van een robot als oplossing. Dit hadden we vooraf niet verwacht, maar het leverde
                        waardevolle inzichten op die we kunnen meenemen in de verdere ontwikkeling van ons project.
                    </p>

                    <FieldResearchCardGrid/>
                </div>
            </section>

            {/* OntwerpVraag */}
            <section id="ontwerpvraag-verandering" className="py-16 bg-[#beddfc] z-30 md:top-12">
                <div className="max-w-6xl mx-auto px-4 space-y-6 sm:space-y-10 text-[#342626]">
                    <div className="max-w-5xl mx-auto px-4 py-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            {/* LEFT SIDE - EXPLANATION */}
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                    Ontwerpvraag 2.0
                                </h2>

                                <div className="space-y-4 leading-relaxed">
                                    {/*<p>*/}
                                    {/*    Wij hebben besloten om onze focus te verleggen naar studenten en bezoekers van*/}
                                    {/*    het CMI-gebouw. Uit de verzamelde data kwam duidelijk naar voren dat het*/}
                                    {/*    grootste pijnpunt het vinden van lokalen is. Op basis hiervan hebben wij ervoor*/}
                                    {/*    gekozen om ons te richten op wayfinding binnen het gebouw.*/}
                                    {/*</p>*/}

                                    {/*<p>*/}
                                    {/*    Onze oorspronkelijke ontwerpvraag, die voornamelijk gericht was op bezorgrobots,*/}
                                    {/*    sluit daardoor niet langer goed aan bij de behoeften van onze doelgroep. Door*/}
                                    {/*    deze nieuwe focus kunnen wij in een sociale omgeving een oplossing ontwikkelen*/}
                                    {/*    die niet alleen functioneel is, maar ook beter aansluit bij onze kernwaarden en*/}
                                    {/*    de daadwerkelijke behoeften van de gebruikers.*/}
                                    {/*</p>*/}
                                    <p>
                                        Wij hebben besloten om onze focus te verleggen naar studenten en bezoekers van
                                        het CMI-gebouw. Uit de verzamelde data kwam duidelijk naar voren dat onze oude
                                        ontwerpvraag, die voornamelijk gericht was op bezorgrobots
                                        niet alleen weinig aansluit bij onze kernwaarden, maar ook bij de
                                        daadwerkelijke behoeften van de gebruikers. Wij willen samen met het maken van
                                        een functioneel product dat deze niet alleen functioneel is, maar ook een
                                        echt probleem oplost in een sociale omgeving.
                                    </p>
                                    <p>
                                        Aan de hand van de data uit de eerder uitgevoerde fieldresearch kwam naar voren
                                        dat de grootste pijnpunt van studenten het vinden van lokalen is. Samen met het
                                        feit dat dit een echt probleem is met vraag naar een oplossing, vinden wij dat dit
                                        veel beter past bij onze kernwaarden. Op basis hiervan hebben wij besloten om
                                        onze ontwerpvraag te veranderen.

                                    </p>
                                </div>
                            </div>

                            {/* RIGHT SIDE - BEFORE / AFTER */}
                            <div className="space-y-10 text-[#342626] text-center">
                                {/* BEFORE */}
                                <div className="border border-[#342626]/20 rounded-2xl p-6 shadow-sm">
                                    <h3 className="text-sm uppercase tracking-widest opacity-60 mb-4">
                                        Oude ontwerpvraag
                                    </h3>
                                    <p className="text-base leading-relaxed opacity-90">
                                        Hoe kunnen we de
                                        <span className="text-[#e8492b] font-bold"> interactie</span>, het
                                        <span className="text-[#e8492b] font-bold"> vertrouwen</span> en de{""}
                                        <span style={{
                                            position: "relative",
                                            display: "inline-block",
                                            color: "#e8492b",
                                            fontWeight: "bold",
                                        }}>samenwerking
                    <span
                        style={{
                            position: "absolute",
                            top: "90%",
                            left: "7%",
                            width: "90%",
                            borderTop: "2px solid #342626",
                            transform: "rotate(-10deg) translateY(-50%)",
                            transformOrigin: "left center",
                        }}
                    ></span></span>
                                        {" "}tussen mensen en bezorgrobots en de
                                        <span className="text-[#e8492b] font-bold"> sociale verbinding</span> tussen
                                        bewoners in de openbare ruimte{" "}
                                        <span style={{
                                            position: "relative",
                                            display: "inline-block",
                                            color: "#e8492b",
                                            fontWeight: "bold",
                                        }}>faciliteren
                    <span
                        style={{
                            position: "absolute",
                            top: "80%",
                            left: "7%",
                            width: "90%",
                            borderTop: "2px solid #342626",
                            transform: "rotate(-10deg) translateY(-50%)",
                            transformOrigin: "left center",
                        }}
                    ></span></span>
                                        {" "}en{" "}
                                        <span style={{
                                            position: "relative",
                                            display: "inline-block",
                                            color: "#e8492b",
                                            fontWeight: "bold",
                                        }}>verbeteren
                    <span
                        style={{
                            position: "absolute",
                            top: "80%",
                            left: "7%",
                            width: "90%",
                            borderTop: "2px solid #342626",
                            transform: "rotate(-10deg) translateY(-50%)",
                            transformOrigin: "left center",
                        }}
                    ></span></span>
                                        {" "}door middel van
                                        <span className="text-[#e8492b] font-bold"> inclusieve</span> en
                                        <span className="text-[#e8492b] font-bold"> transparante</span> digitale
                                        oplossingen?
                                    </p>
                                </div>

                                {/* ARROW */}
                                <div className="flex flex-col items-center gap-2 opacity-70">
                                    <span className="text-xs uppercase tracking-wider">Van</span>
                                    <span className="text-3xl animate-bounce">↓</span>
                                    <span className="text-xs uppercase tracking-wider">Naar</span>
                                </div>
                                {/* AFTER */}
                                <div className="border border-[#342626]/30 rounded-2xl p-6 shadow-md scale-[1.02]">
                                    <h3 className="text-sm uppercase tracking-widest opacity-80 mb-4">
                                        Nieuwe ontwerpvraag
                                    </h3>
                                    <p className="text-base leading-relaxed">
                                        Hoe kunnen we de
                                        <span className="text-[#e8492b] font-bold"> interactie</span> en het
                                        <span className="text-[#e8492b] font-bold"> vertrouwen</span> tussen mensen
                                        en een robot verbeteren, zodat deze robot op een
                                        <span className="text-[#e8492b] font-bold"> inclusieve</span> en
                                        <span className="text-[#e8492b] font-bold"> transparante</span> manier studenten
                                        en bezoekers helpt bij het CMI gebouw, en tegelijkertijd een
                                        <span
                                            className="text-[#e8492b] font-bold"> sociale verbinding</span> stimuleert?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logo */}
            <section id="sprint-planning" className="py-16 bg-[#e8492b] z-40 md:top-12 text-[#fdf1e3]">
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

export default Sprint1;

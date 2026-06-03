import logo_brown from "./assets/logo/jaman_brown.svg";
import PrototypeUpdate from "./assets/images/Sprint5/ApplicationUpdate.png";
import PrototypeUpdate2 from "./assets/images/Sprint5/ApplicationUpdate2.png";
import PrototypeUpdate3 from "./assets/images/Sprint5/ApplicationUpdate3.png";
import PrototypeUpdate4 from "./assets/images/Sprint5/ApplicationUpdate4.png";
import ARStep1 from "./assets/images/Sprint5/AR_Step1.png";
import ARStep2 from "./assets/images/Sprint5/AR_Step2.png";
import EXPO_POSTER from "./assets/images/Sprint5/Expo_poster.png";
import EXPOQR_code1 from "./assets/images/Sprint5/ExpoQR_code1.png";
import EXPOQR_code2 from "./assets/images/Sprint5/EXPOQR_code2.png";

function Sprint5() {
    return (
        <section id="sprint5" className="overflow-visible relative">
            {/* Geïmplementeerde verbeteringen */}
            <section className="py-24 bg-[#beddfc] text-[#342626]">
                <h1 className="text-2xl sm:text-4xl font-bold text-center mb-12">
                    SPRINT 5
                </h1>
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-start gap-10 md:gap-20">
                    <div className="w-full md:w-3/5 text-left space-y-6 sm:space-y-10">
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Geïmplementeerde verbeteringen
                        </h2>

                        <div className="space-y-6 text-base sm:text-lg leading-relaxed">
                            <p>
                                Om te testen of de wireframes duidelijk zijn en aansluiten bij
                                de behoeften van onze gebruikers, hebben we een testplan
                                opgesteld. Uit deze test zijn meerdere verbeterpunten naar voren
                                gekomen die we hebben meegenomen in het prototype.
                            </p>

                            <ul className="list-disc pl-6 space-y-3">
                                <li>
                                    De route op de kaart is duidelijker gemaakt, zodat gebruikers
                                    beter begrijpen waar ze zich bevinden en waar ze naartoe
                                    moeten.
                                </li>
                                <li>
                                    De heatmapgebieden zijn verduidelijkt, zodat drukke en rustige
                                    gebieden beter zichtbaar zijn.
                                </li>
                                <li>
                                    Er is een duidelijk icoon toegevoegd voor de startlocatie en
                                    de eindbestemming.
                                </li>
                                <li>
                                    Trappen en liften zijn duidelijker zichtbaar gemaakt binnen de
                                    route.
                                </li>
                                <li>
                                    De overgang tussen verdiepingen is meegenomen als
                                    aandachtspunt voor verdere verbetering.
                                </li>
                                <li>
                                    Bij de heatmap is een legenda toegevoegd, zodat gebruikers
                                    weten wat de kleuren betekenen.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full md:w-2/5 text-left space-y-6 sm:space-y-10">
                        <h2 className="text-3xl sm:text-4xl font-bold">Wat dit oplevert</h2>

                        <div className="space-y-6 text-base sm:text-lg leading-relaxed">
                            <p>
                                Deze verbeteringen hebben ervoor gezorgd dat ons prototype
                                duidelijker en gebruiksvriendelijker is. Gebruikers kunnen de
                                route beter volgen, begrijpen waar ze zich bevinden en welke
                                gebieden druk zijn.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prototype updates */}
            <section className="py-24 bg-[#e8492b] text-[#fdf1e3]">
                <div className="max-w-5xl mx-auto px-6 text-left space-y-6 sm:space-y-10">
                    <div className="max-w-3xl space-y-6">
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Prototype updates
                        </h2>

                        <p className="text-base sm:text-lg leading-relaxed">
                            Op basis van de wireframes hebben wij het prototype styling
                            gegeven en uitgebreid. De route op de kaart is verduidelijkt met
                            stappen, icoontjes voor trappengangen en liften, en een icoon voor
                            de eindbestemming. Ook is er een duidelijk starticoon toegevoegd,
                            zodat gebruikers direct kunnen zien waar zij zich bevinden.
                        </p>

                        <p className="text-base sm:text-lg leading-relaxed">
                            Daarnaast hebben wij de heatmapgebieden verduidelijkt. In plaats
                            van vage overlays worden deze nu meer als duidelijke gebieden
                            weergegeven. Ook is er een legenda toegevoegd, zodat gebruikers
                            beter begrijpen wat de kleuren betekenen.
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto px-6 mt-16 flex flex-wrap justify-center gap-8">
                        <div className="w-[200px]">
                            <img
                                src={PrototypeUpdate}
                                alt="Prototype update 1"
                                className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
                            />
                        </div>

                        <div className="w-[200px]">
                            <img
                                src={PrototypeUpdate2}
                                alt="Prototype update 2"
                                className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
                            />
                        </div>

                        <div className="w-[200px]">
                            <img
                                src={PrototypeUpdate3}
                                alt="Prototype update 3"
                                className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
                            />
                        </div>

                        <div className="w-[200px]">
                            <img
                                src={PrototypeUpdate4}
                                alt="Prototype update 4"
                                className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* AR onderzoek */}
            <section className="py-24 bg-[#beddfc] text-[#342626]">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
                    <div className="flex gap-8">
                        <div className="max-w-[250px] mx-auto rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={ARStep1}
                                alt="AR stap 1"
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="max-w-[250px] mx-auto rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={ARStep2}
                                alt="AR stap 2"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    <div className="space-y-6 sm:space-y-10 text-base sm:text-lg leading-relaxed">
                        <h2 className="text-3xl sm:text-4xl font-bold">AR onderzoek</h2>

                        <p>
                            In deze sprint hebben wij ook onderzoek gedaan naar de
                            mogelijkheden van AR-navigatie. We hebben verschillende
                            AR-navigatie apps getest, zoals Google Maps AR en AR Wayfinding,
                            om te begrijpen hoe deze technologie werkt en wat de voor- en
                            nadelen zijn.
                        </p>

                        <p>
                            Hierbij hebben we vooral gekeken naar hoe AR gebruikers kan helpen
                            bij oriëntatie in een gebouw. AR kan richting geven op een visuele
                            manier, maar vraagt ook om duidelijke instructies en betrouwbare
                            locatiebepaling.
                        </p>
                    </div>
                </div>
            </section>

            {/* Expo voorbereiding */}
            <section className="pb-40 pt-24 z-10 bg-[#fdf1e3] text-[#342626]">
                <div className="max-w-3xl mx-auto px-6 text-center space-y-6 sm:space-y-8">
                    <h2 className="text-3xl sm:text-4xl font-bold">Expo voorbereiding</h2>

                    <p className="text-base sm:text-lg leading-relaxed">
                        In deze sprint hebben wij ons gericht op de voorbereiding van de
                        expo. We hebben een poster gemaakt die onze aanpak, resultaten en
                        inzichten samenvat. Deze poster is ontworpen om onze boodschap
                        duidelijk en visueel over te brengen aan bezoekers.
                    </p>

                    <p className="text-base sm:text-lg leading-relaxed">
                        Voor de expo hebben wij ook QR-codes gemaakt die bezoekers kunnen
                        scannen om direct een route naar onze applicatie te kunnen gaan.
                        Deze QR-codes zullen de gebruikers naar hun eigen eindbestemming of
                        direct naar de nooduitgang leiden.
                    </p>
                </div>

                {/* Poster groot bovenaan */}
                <div className="max-w-6xl mx-auto px-6 mt-16">
                    <img
                        src={EXPO_POSTER}
                        alt="Expo poster"
                        className="rounded-2xl shadow-xl w-full h-auto object-contain"
                    />
                </div>

                {/* QR-codes onder de poster */}
                <div className="max-w-5xl mx-auto px-6 mt-12 flex justify-center gap-12">
                    <div className="w-80">
                        <img
                            src={EXPOQR_code1}
                            alt="Expo QR Code route"
                            className="rounded-xl shadow-lg w-full h-auto object-contain"
                        />
                    </div>

                    <div className="w-80">
                        <img
                            src={EXPOQR_code2}
                            alt="Expo QR Code nooduitgang"
                            className="rounded-xl shadow-lg w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* Doorontwikkeling & Eindwoord */}
            <section className="py-24  text-[#fdf1e3] bg-[#342626]">
                <div className="max-w-5xl mx-auto px-6 space-y-16">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                            Doorontwikkeling & Aanbevelingen
                        </h2>

                        <p className="pb-6">
                            Aan de hand van de onderzoeken die wij hebben uitgevoerd en de feedback die wij gedurende
                            het project en tijdens de expo hebben ontvangen, hebben wij een aantal aanbevelingen
                            opgesteld voor de verdere doorontwikkeling van onze applicatie.
                        </p>

                        <ul className="list-disc pl-6 space-y-4 text-base sm:text-lg leading-relaxed">
                            <li>
                                Automatische bezettingsmetingen implementeren met sensoren, zodat de
                                heatmap realtime inzicht geeft in beschikbare studie- en werkplekken.
                            </li>
                            <li>
                                Live locatiebepaling toevoegen via QR-codes, wifi-positionering of
                                bluetooth beacons, zodat gebruikers niet langer handmatig een
                                startlocatie hoeven te kiezen.
                            </li>
                            <li>
                                De toegankelijkheid verbeteren door kleuren aan te vullen met
                                patronen, iconen en labels voor kleurenblinde gebruikers.
                            </li>
                            <li>
                                Een Engelse taaloptie toevoegen voor internationale studenten,
                                medewerkers en bezoekers.
                            </li>
                            <li>
                                Het beheersysteem uitbreiden zodat beheerders zelfstandig
                                plattegronden, ruimtes, routes en wayfinding-elementen kunnen beheren.
                            </li>
                            <li>
                                Anonieme routegegevens analyseren om loopstromen beter inzichtelijk te
                                maken en het systeem verder te optimaliseren.
                            </li>
                            <li>
                                Verder onderzoek doen naar AR-navigatie als mogelijke uitbreiding van
                                de wayfinding-ervaring.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-[#e8492b] text-[#fdf1e3]">
                <div className="max-w-5xl mx-auto px-6 space-y-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-8">Eindwoord</h2>

                    <div className="space-y-6 text-base sm:text-lg leading-relaxed">
                        <p>
                            Met veel plezier kijken wij terug op dit interdisciplinaire project.
                            Door de samenwerking tussen verschillende opleidingen en expertises
                            hebben wij een oplossing kunnen ontwikkelen voor een daadwerkelijk
                            probleem binnen de Hogeschool Rotterdam.
                        </p>

                        <p>
                            Tijdens het project hebben wij veel geleerd over onderzoek, ontwerp,
                            ontwikkeling en samenwerking binnen een multidisciplinair team. Door
                            continu te testen, itereren en samenwerken zijn wij tot een werkend
                            prototype gekomen dat studenten, docenten en bezoekers kan helpen bij
                            het vinden van hun weg binnen het gebouw.
                        </p>

                        <p>
                            Wij zijn trots op het eindresultaat dat wij als team hebben neergezet
                            en zien veel potentie voor verdere doorontwikkeling van het concept.
                            Wij hopen dat dit project een waardevolle basis vormt voor toekomstige
                            verbeteringen op het gebied van wayfinding binnen
                            de Hogeschool Rotterdam.
                        </p>
                    </div>
                </div>
            </section>


            {/* Logo */}
            <section className="pb-40 pt-24 z-10 bg-[#fdf1e3]">
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

export default Sprint5;

import deliveryRobotImg from "./assets/images/delivery.png";
import deliveryHumanImg from "./assets/images/delivery_human.png";


function Sprint0() {
    return (
        <section id="sprint0" className="overflow-visible relative">

            {/* HUIDIGE SITUATIE */}
            <section className="pb-40 pt-24 z-10 bg-[#beddfc]">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

                        {/* Sticky afbeelding */}
                        <div className="relative">
                            <div className="sticky top-32">
                                <img
                                    src={deliveryHumanImg}
                                    alt="Bezorgrobot"
                                    className="rounded-xl shadow-xl w-full h-[80vh]"
                                />
                            </div>
                        </div>

                        {/* Scroll tekst content */}
                        <div className="space-y-10 text-[#342626] text-lg leading-relaxed">

                            <h3 className="text-2xl font-bold text-[#342626]">
                                Huidige situatie
                            </h3>

                            <p>
                                Op dit moment gaan nog veel mensen naar de supermarkt, andere winkels of bestellen de
                                producten
                                online waarna ze thuis worden bezorgd door andere mensen. Hier komt op dit moment dus
                                altijd wel
                                een mens van pas. Er wordt op dit moment wel al geëxperimenteerd met het bezorgen van
                                pakketten
                                door autonome robots. Een voorbeeld hiervan is op de campus van de Erasmus Universiteit
                                Rotterdam.
                            </p>

                            <h4 className="text-l font-medium mb-1">
                                Context (wat, waar, hoe vaak)
                            </h4>

                            <ul className="space-y-3 list-disc pl-6">
                                <li>Autonome objecten bewegen zich over de stoep en pleinen, vaak met lage snelheid.
                                </li>
                                <li>Ze opereren in gemengde omgevingen met voetgangers, fietsers en soms auto’s.</li>
                                <li>De inzet nu in Nederland is nog beperkt tot experimentelere plekken zoals de campus
                                    van de
                                    Erasmus Universiteit.
                                </li>
                            </ul>

                            <h4 className="text-l font-medium mb-1">
                                Huidige knelpunten
                            </h4>

                            <ul className="space-y-3 list-disc pl-6">
                                <li>Autonome voertuigen zijn in Nederland niet toegestaan op de weg of het fietspad.
                                </li>
                                <li>Burgers weten vaak niet wat de robot ziet, beslist of van plan is te doen.</li>
                                <li>Onzekerheid over veiligheid, aansprakelijkheid en privacy (camera’s/sensoren).</li>
                                <li>Interactie is minimaal: de robot is functioneel, maar niet sociaal ingebed.</li>
                                <li>Er is weinig structurele communicatie tussen exploitanten en buurtbewoners.</li>
                            </ul>

                            <p>
                                Conclusie huidige staat: Autonome bezorgrobots functioneren technisch, maar sociale
                                acceptatie,
                                vertrouwen en buurtintegratie zijn nog beperkt ontwikkeld.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* GEWENSTE SITUATIE */}
            <section className="bg-[#e8492b] py-32 w-full">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

                        {/* Scroll tekst content */}
                        <div className="space-y-10 text-[#fdf1e3] text-lg leading-relaxed">
                            <h3 className="text-2xl font-bold text-[#fdf1e3]">
                                Gewenste situatie
                            </h3>

                            <p>
                                Wij willen onderzoek doen en een prototype maken van een inclusief en transparant
                                digitaal
                                buurtplatform dat de interactie tussen bewoners en autonome bezorgrobots actief
                                ondersteunt
                                én
                                sociale verbinding in de wijk stimuleert.
                            </p>

                            <p>
                                Wij willen onze ontwerpvraag richten op de veiligheid en het vertrouwen tussen de mens
                                en
                                autonome apparaten, waar we ook rekening houden met het sociale aspect en hoe de robot
                                eventueel
                                kan toevoegen aan verbinding tussen mens en robot of tussen buurtbewoners onder elkaar.
                            </p>

                            <p>
                                Wanneer iemand een product online bestelt (zoals een maaltijd of kleding), levert een
                                autonome
                                rijdende robot (of drone) dit af op het juiste adres. Via een applicatie kunnen
                                gebruikers
                                live
                                zien waar de robot zich bevindt. Ook kan een gebruiker zelf een robot aanvragen om een
                                pakket
                                te versturen, waarbij producten voor grotere afstanden eerst naar een hub worden
                                gebracht
                                voor
                                verdere distributie.
                            </p>

                            <p>
                                Daarnaast willen we dat deze technologie de wijk niet alleen handiger, maar ook socialer
                                maakt.
                                De applicatie kan ook fungeren als een digitaal buurtplatform waarop bewoners goederen
                                kunnen
                                delen of lokaal kunnen laten bezorgen door de autonome karretjes.
                            </p>
                        </div>

                        {/* Sticky afbeelding */}
                        <div className="relative">
                            <div className="sticky top-32">
                                <img
                                    src={deliveryRobotImg}
                                    alt="Bezorgrobot"
                                    className="rounded-xl shadow-xl w-full h-[80vh]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ONTWERPVRAAG */}
            <section id="ontwerpvraag" className="sticky top-1 z-10 py-28 bg-[#fdf1e3]">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-10 text-[#342626]">

                    <h2 className="text-4xl font-bold">
                        Ontwerpvraag
                    </h2>

                    <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                        Hoe kunnen we de <span className="text-[#e8492b] font-bold">interactie</span>, het <span
                        className="text-[#e8492b] font-bold">vertrouwen</span> en de <span
                        className="text-[#e8492b] font-bold">samenwerking</span> tussen mensen en bezorgrobots
                        en de <span className="text-[#e8492b] font-bold">sociale verbinding</span> tussen bewoners in de
                        openbare ruimte faciliteren en verbeteren door
                        middel van <span className="text-[#e8492b] font-bold">inclusieve</span> en <span
                        className="text-[#e8492b] font-bold">transparante</span> digitale oplossingen?
                    </p>
                </div>
            </section>

            {/* RANDVOORWAARDEN */}
            <section id="randvoorwaarden" className="sticky z-20 top-50 py-16 bg-[#342626] ">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-10 text-[#fdf1e3]">
                    <h2 className="text-4xl font-bold">
                        Randvoorwaarden
                    </h2>

                    <ul className="space-y-5 text-lg max-w-3xl mx-auto text-left list-disc pl-6 leading-relaxed">
                        <li>Realtime communicatie met de gebruiker aanbieden (bijv. een status).</li>
                        <li>Werken op webapplicaties, zodat gebruikers niet nog een nieuwe app hoeven te downloaden.
                        </li>
                        <li>Rekening houden met privacyregels (AVG).</li>
                        <li>Rekening houden met verkeersregels.</li>
                        <li>Rekening houden met het gebrek aan vertrouwen in autonome apparaten.</li>
                        <li>Rekening houden met alle mensen en daarmee ook met de generatiekloof in ervaring met
                            webapplicaties en eventueel robots.
                        </li>
                    </ul>
                </div>
            </section>

            {/* PROJECT SCOPE */}
            <section id="scope" className="sticky z-30 top-88 py-16 bg-[#beddfc] ">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-10 text-[#342626]">
                    <h2 className="text-4xl font-bold">
                        Scope
                    </h2>

                    <ul className="space-y-5 text-lg max-w-3xl mx-auto text-left list-disc pl-6 leading-relaxed">
                        <li>Realtime communicatie met de gebruiker aanbieden (bijv. een status).</li>
                        <li>Werken op webapplicaties, zodat gebruikers niet nog een nieuwe app hoeven te downloaden.
                        </li>
                        <li>Rekening houden met privacyregels (AVG).</li>
                        <li>Rekening houden met verkeersregels.</li>
                        <li>Rekening houden met het gebrek aan vertrouwen in autonome apparaten.</li>
                        <li>Rekening houden met alle mensen en daarmee ook met de generatiekloof in ervaring met
                            webapplicaties en eventueel robots.
                        </li>
                    </ul>
                </div>
            </section>

            {/* Logo */}
            <section id="logo" className="sticky z-40 top-126 py-30 bg-[#e8492b] ">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-10 text-[#342626]">
                    <div className="flex flex-col justify-center items-center flex-grow text-center">
                        <img src="/jaman_white.svg" alt="JaMan logo" className="w-64 mb-6"/>
                    </div>
                </div>
            </section>

            <section className="h-[50vh] bg-[#e8492b]">

            </section>
        </section>
    );
}

export default Sprint0;
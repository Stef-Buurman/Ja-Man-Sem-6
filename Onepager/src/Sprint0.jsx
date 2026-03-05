import deliveryImg from "./assets/images/delivery.png";

function Sprint0() {
    return (
        <section id="sprint0" className="py-24 bg-[#beddfc]">
            {/* HUIDIGE SITUATIE */}
            <section className="relative pb-40 z-10">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

                        {/* Sticky afbeelding */}
                        <div className="relative">
                            <div className="sticky top-32">
                                <img
                                    src={deliveryImg}
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
            <section className="relative bg-[#e8492b] min-h-screen py-32 w-full z-20">
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
                                    src={deliveryImg}
                                    alt="Bezorgrobot"
                                    className="rounded-xl shadow-xl w-full h-[80vh]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ONTWERPVRAGEN */}
            <section className="mb-20 space-y-6 text-lg text-neutral-700 leading-relaxed">
                <h3 className="text-2xl font-bold text-neutral-900">
                    Ontwerpvragen ideeën
                </h3>

                <p>Bezorgrobots</p>

                <p>Hoe kunnen we de interactie, het vertrouwen en de samenwerking tussen menselijke burgers en
                    bezorgrobots in de openbare ruimte faciliteren en verbeteren door middel van inclusieve en
                    transparante digitale oplossingen?</p>

                <p>
                    Oplossing zou bijv. kunnen zijn: Een digitaal buurtplatform waarop bewoners niet alleen
                    pakketjes en goederen kunnen delen of laten bezorgen door autonome karretjes, maar waarbij deze
                    interacties actief worden ingezet om buren met elkaar in contact te brengen
                </p>

                <p>Autonome schepen/robots</p>

                <ul className="space-y-3 list-disc pl-6">
                    <li>Optie 1. Op welke manier kan een autonoom varend schip zijn 'intenties' duidelijk en tijdig
                        communiceren om ongevallen te voorkomen?
                    </li>
                    <li>Optie 2. Hoe kunnen we een Digital Twin zo visualiseren dat gebruikers intuïtief
                        voorspellingen kunnen doen over drukte en veiligheidsrisico's?
                    </li>
                </ul>
            </section>

            {/* RANDVOORWAARDEN */}
            <section className="mb-20 space-y-6 text-lg text-neutral-700 leading-relaxed">
                <h3 className="text-2xl font-bold text-neutral-900">
                    Randvoorwaarden
                </h3>

                <p>Technische vereisten:</p>
                <ul className="space-y-3 list-disc pl-6">
                    <li>Het project moet worden gemaakt met de technische kennis die wij binnen het team hebben.
                    </li>
                    <li>Het product moet realtime communicatie met de gebruiker aanbieden.</li>
                    <li>De oplossing moet werken op webapplicaties</li>
                    <li>Data moet end-to-end worden opgeslagen en verzonden</li>
                </ul>
            </section>

            {/* PROJECT SCOPE */}
            <section className="mb-20 space-y-6 text-lg text-neutral-700 leading-relaxed">
                <h3 className="text-2xl font-bold text-neutral-900">
                    Project Scope
                </h3>

                <p>Binnen de scope (In-scope):</p>
                <ul className="space-y-3 list-disc pl-6">
                    <li>Onderzoek doen</li>
                    <li>Database opzetten</li>
                    <li>Frontend met user friendly interface</li>
                    <li>Backend met veilige informatiebeveiliging</li>
                </ul>
            </section>

            {/* BACKLOG */}
            <section className="mb-20 space-y-6 text-lg text-neutral-700 leading-relaxed">
                <h3 className="text-2xl font-bold text-neutral-900">
                    Backlog – Trello
                </h3>

                <p>
                    Beschrijving: Items worden bij voorkeur geformuleerd als User Stories:
                    "Als [rol], wil ik [doel], zodat [voordeel]". De bovenste items zijn zeer gedetailleerd,
                    de onderste items mogen grover zijn geformuleerd.
                </p>

                <p>
                    Grootte: Elk item bevat een inschatting van de benodigde inspanning om de werkdruk en voortgang
                    te plannen en te zien wanneer de sprint eindigt.
                </p>

                <p>
                    Link: <a href="https://trello.com/b/RfpRo2DN/team-ja-man" className="text-blue-600 underline"
                             target="_blank" rel="noopener noreferrer">
                    https://trello.com/b/RfpRo2DN/team-ja-man
                </a>
                </p>
            </section>

            {/* SPRINTDOEL & PLANNING */}
            <section className="mb-20 space-y-6 text-lg text-neutral-700 leading-relaxed">
                <h3 className="text-2xl font-bold text-neutral-900">
                    Sprintdoel & Planning
                </h3>

                <p>
                    Het Sprintdoel beschrijft de gewenste resultaten aan het einde van de sprint, in lijn met de
                    scope.
                </p>

                <p className="font-semibold text-neutral-900">
                    Sprintdoel Sprint 1
                </p>
                <p>
                    Ons eerste prototype maken en testen. Ook kijken of deze planning werkt voor aankomende sprints.
                </p>

                <p className="font-semibold text-neutral-900">
                    Planning
                </p>

                <ul className="space-y-3 list-disc pl-6">
                    <li>11 maart – Deskresearch: doelgroep bepalen en volledige onderzoek uitvoeren via
                        PACT-analyse.
                    </li>
                    <li>15 maart 23:59 – Fieldresearch: potentiële gebruikers zoeken en spreken met vooraf
                        opgestelde vragen.
                    </li>
                    <li>16 maart – Prototypes maken (bijv. Figma).</li>
                    <li>17 maart – Testen.</li>
                    <li>18 maart – Sprint review en retrospective.</li>
                    <li>18 maart – Inleveren sprint 1.</li>
                </ul>
            </section>

            {/* TEAM WAARDEN & NORMEN */}
            <section className="mb-20 space-y-6 text-lg text-neutral-700 leading-relaxed">
                <h3 className="text-2xl font-bold text-neutral-900">
                    Team Waarden & Normen
                </h3>

                <p className="font-semibold text-neutral-900">Gedeelde waarden</p>

                <ul className="space-y-3 list-disc pl-6">
                    <li><strong>Betrouwbaarheid</strong> – Wij vinden betrouwbaarheid belangrijk omdat slimme
                        technologie alleen werkt als bewoners erop kunnen vertrouwen.
                    </li>
                    <li><strong>Plezier</strong> – Technologie moet bijdragen aan een leefbare en leuke stad.</li>
                    <li><strong>Vriendschap</strong> – Slimme technologie mag menselijke verbinding versterken, niet
                        vervangen.
                    </li>
                    <li><strong>Loyaliteit</strong> – Technologie moet verbondenheid tussen bewoners en stad
                        stimuleren.
                    </li>
                    <li><strong>Rechtvaardigheid</strong> – Oplossingen moeten toegankelijk zijn voor iedereen,
                        ongeacht achtergrond of digitale vaardigheden.
                    </li>
                </ul>
            </section>

            {/* COMMUNICATIE & SAMENWERKING */}
            <section className="mb-20 space-y-6 text-lg text-neutral-700 leading-relaxed">
                <h3 className="text-2xl font-bold text-neutral-900">
                    Communicatie & Samenwerking
                </h3>

                <p className="font-semibold text-neutral-900">
                    Hoe worden waarden en normen in de praktijk gebracht?
                </p>

                <ul className="space-y-3 list-disc pl-6">
                    <li><strong>Helderheid</strong> – Gebruik visuele hulpmiddelen zoals schetsen en prototypes en
                        vermijd onnodig jargon.
                    </li>
                    <li><strong>Transparantie</strong> – Creëer een veilige omgeving voor feedback, discussie en
                        conflictoplossing.
                    </li>
                </ul>

                <p className="font-semibold text-neutral-900">
                    Stakeholders
                </p>

                <ul className="space-y-3 list-disc pl-6">
                    <li>Jan Jacobs (Lely) – UX expert – jjacobs@lely.com</li>
                    <li>Maurice de Beer (Veiligheidsregio Rotterdam-Rijnmond) – officier van dienst –
                        maurice.debeer@vr-rr.nl
                    </li>
                    <li>Iskander Smit (Cities of Things) – onderzoeker – i.r.smit@hva.nl</li>
                    <li>Thierry Verduijn (Samskip) – t.m.verduijn@hr.nl</li>
                </ul>
            </section>
        </section>
    );
}

export default Sprint0;
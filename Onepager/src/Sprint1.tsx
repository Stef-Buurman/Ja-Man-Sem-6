import deliveryHumanImg from "./assets/images/delivery_human.png";
import CardGrid from "./components/CardGrid";

function Sprint1() {
    return (
        <section id="sprint1" className="overflow-visible relative">

            {/* HUIDIGE SITUATIE */}
            <section className="pb-40 pt-24 bg-[#fdf1e3] justify-center h-100vh]">
                <h1 id="sprint1" className="text-2xl sm:text-4xl font-bold text-center">SPRINT 1</h1>
                <div className="space-y-6 sm:space-y-8 md:space-y-10 text-[#342626] text-base sm:text-lg leading-relaxed max-w-5xl mx-auto">

                    <h3 className="text-2xl sm:text-3xl font-bold">Pact analyse</h3>

                    <p>
                        Wij hebben deskresearch gedaan over bezorgrobots en bezorgservices zodat wij
                        de huidige situatie in kaart kunnen brengen met de problemen die hierbij komen kijken. Hiervoor hebben wij een uitgebreide PACT-analyse uitgevoerd waarna we onze bevindingen overzichtelijk gemaakt hebben door middel van het
                        gebruik van inzicht-kaarten.  Een paar onderwerpen die vaak teruggekomen waren tijdens onze research zijn:
                    </p>
                    <ul className="space-y-2 sm:space-y-3 list-disc pl-6">
                        <li>Problemen met regelgeving.</li>
                        <li>Veiligheid en privacy.</li>
                        <li>Vertrouwen.</li>
                        <li>Logistieke problemen.</li>
                        <li>Sociale communicatie met robots.</li>
                    </ul>
                </div>
                <CardGrid />
            </section>

            <section id="ontwerpvraag-verandering" className="py-16 bg-[#342626] z-20 md:sticky md:top-48">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-6 sm:space-y-10 text-[#fdf1e3]">

                    <h2 className="text-3xl sm:text-4xl font-bold">Ontwerpvraag verandering</h2>

                    <div>
                        <p>
                            Uit ons onderzoek bleek dat onze huidige ontwerpvraag die vooral gefocust is op bezorgrobots zou moeten veranderen. Bezorgrobots, die vooral als doel hebben
                            om zo snel mogelijk autonoom een pakket of product te bezorgen, hebben relatief weinig sociale interactie in vergelijking met andere autonome robots in de
                            openbare en sociale sector. Het gebrek hieraan is een groot probleem omdat onze
                            kernwaarden sociale interactie als prioriteit zet.
                        </p>
                        <p>
                            Sociale interactie is ook waarom wij hebben besloten om ons vooral te focussen op studenten en bezoekers van het CMI gebouw.
                            In een sociale ruimte zoals dit kunnen wij tijdens de ontwikkeling van ons project een product neerzetten die niet alleen handig en bruikbaar is,
                            maar ook onze kernwaarden volgt.
                        </p>
                    </div>
                    <div>
                        <img src={deliveryHumanImg} alt="Bezorgrobot en mens" className="w-full max-w-md mx-auto rounded-lg shadow-lg" />
                    </div>
                </div>
            </section>
        </section>
    );
}

export default Sprint1;
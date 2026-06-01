import logo_white from "./assets/logo/jaman_white.svg";
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

      {/* Usertests */}
      <section className="py-24 bg-[#beddfc] text-[#342626]">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-12">
          SPRINT 5
        </h1>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-start gap-10 md:gap-20">
          <div className="w-full md:w-3/5 text-left space-y-6 sm:space-y-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Prototype updates
            </h2>
            <div className="space-y-6">
              <p>
                Op basis van de wireframes hebben wij het prototype styling gegeven en uitgebreid.
                De route op de kaart is verduidelijkt met stappen, icoontjes van de trappengangen en liften en het icoontje voor de eindbestemming.
              </p>
              <p>
                Daarnaast hebben wij de heatmap gebieden verduidelijkt, door deze meer als gebieden te laten zien in plaats van de vorige weggevaagde gebieden.
                Hier hebben wij ook een legenda aan toegevoegd, zodat gebruikers precies weten wat de kleuren betekenen.
              </p>
            </div>
          </div>
        </div>

        {/* IMAGES */}
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
      </section>

      {/* Prototype updates */}
      <section className="py-24 bg-[#e8492b] text-[#fdf1e3] space-y-6 sm:space-y-10">
        <div className="max-w-5xl mx-auto px-6 flex gap-10 mb-16 items-center">
          {/* Afbeelding links */}
          <div className="flex-2">
            <img
              src={ARStep1}
              alt="AR Step 1"
              className="rounded-2xl shadow-xl w-full object-cover" />
          </div>
          <div className="flex-2">
            <img
              src={ARStep2}
              alt="AR Step 2"
              className="rounded-2xl shadow-xl w-full object-cover" />
          </div>
          {/* Tekst rechts */}
          <div className="space-y-6 flex-1">
            <h2 className="text-3xl  sm:text-4xl font-bold">AR Onderzoek</h2>
            <p className="text-base sm:text-lg leading-relaxed">
              In deze sprint hebben wij ook onderzoek gedaan naar de mogelijkheden van AR-navigatie.
              We hebben een aantal verschillende AR-navigatie apps getest, zoals Google Maps AR en AR Wayfinding,
              om te begrijpen hoe deze technologie werkt en wat de voor- en nadelen zijn.
            </p>
          </div>
        </div>
      </section>

      {/* Wireframes */}
      <section className="pb-40 pt-24 z-10 bg-[#fdf1e3] text-[#342626]">

        {/* TEXT */}
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold">Expo voorbereiding</h2>

          <p className="text-base sm:text-lg leading-relaxed">
            In deze sprint hebben wij ons gericht op de voorbereiding van de expo. We hebben een poster gemaakt die onze aanpak, resultaten en inzichten samenvat. Deze poster is ontworpen om onze boodschap duidelijk en visueel aantrekkelijk over te brengen aan het publiek tijdens de expo.
          </p>

          <p className="text-base sm:text-lg leading-relaxed">
            Voor de expo hebben wij ook QR-codes gemaakt die bezoekers kunnen scannen om direct de nooduitgang kunnen vinden of de eindbestemming vanaf de huidige locatie kunnnen vinden.
          </p>

          <div className="flex-2">
            <img
              src={EXPO_POSTER}
              alt="Expo Poster"
              className="rounded-2xl shadow-xl w-full object-cover" />
          </div>
                    <div className="flex-2">
            <img
              src={EXPOQR_code1}
              alt="Expo QR Code 1"
              className="rounded-2xl shadow-xl w-full object-cover" />
          </div>
                    <div className="flex-2">
            <img
              src={EXPOQR_code2}
              alt="Expo QR Code 2"
              className="rounded-2xl shadow-xl w-full object-cover" />
          </div>
        </div>

        {/* IMAGES */}
        <div className="max-w-6xl mx-auto px-6 mt-16 flex flex-wrap justify-center gap-8">

          {/* <div className="w-[200px]">
            <img
              src={WireframesStart}
              alt="Startscherm"
              className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
            />
          </div>

          <div className="w-[200px]">
            <img
              src={WireframesStep1}
              alt="Stap 1 route bevinden"
              className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
            />
          </div>

          <div className="w-[200px]">
            <img
              src={WireframesStartHeatmap}
              alt="Startscherm heatmaps"
              className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
            />
          </div>

          <div className="w-[200px]">
            <img
              src={WireframesHeatmap}
              alt="Heatmap overzicht"
              className="w-full h-64 object-contain rounded-xl transition-transform duration-300 hover:scale-200"
            />
          </div> */}

        </div>
      </section>

      {/* Ontwerprichtlijnen */}
      {/* <section className="py-24 bg-[#fdf1e3] text-[#342626]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-start gap-10 md:gap-20">
          <div className="w-full md:w-3/5 text-left space-y-6 sm:space-y-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Onze ontwerprichtlijnen
            </h2>
            <div className="space-y-6">
              <p>

                Om een oplossing te ontwerpen die écht aansluit bij de praktijk, hebben we zeven
                richtlijnen opgesteld. Deze zijn direct voortgekomen uit onze verschillende onderzoeken
                en methodes:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Een helder begin en eindpunt: Gebruikers moeten bij het navigeren precies weten waar hun route start en stopt. (Uit: Crazy 8's en Smart en Social Fest)</li>
                <li>Bruikbaar voor iedereen: De tool moet werken voor álle studenten, ongeacht hun opleiding of de HR-locatie waar ze zich bevinden. (Uit: Benchmarking interviews)</li>
                <li>Eenvoudig te onderhouden: Het systeem moet up-to-date blijven en makkelijk beheerd kunnen worden door een vaste 'wayfinding keeper'. (Uit: Interview met Mijksenaar)</li>
                <li>Digitaal en analoog versterken elkaar: De applicatie werkt pas echt goed als deze nauw samenwerkt met de fysieke borden in het gebouw. (Uit: Interview met Mijksenaar en benchmarking)</li>
                <li>Snel je lokaal vinden: Studenten moeten zonder gezoek en binnen no-time bij het juiste lokaal kunnen komen. (Uit: Interviews met studenten)</li>
                <li>Snel een studieplek spotten: De digitale interface moet direct inzichtelijk maken waar er op dat moment nog een rustige werkplek vrij is. (Uit: Interviews met studenten)</li>
                <li>Consistent en betrouwbaar: Het systeem moet elke dag exact hetzelfde werken, zodat gebruikers er blind op kunnen vertrouwen. (Uit: Values in Design I)</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-3/5 text-left space-y-6 sm:space-y-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Toegepaste methodes
            </h2>
            <div className="space-y-6">
              <p>
                Om van al onze losse data en ingevingen tot een concreet concept te komen,
                hebben we drie verschillende methodes ingezet:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>SCAMPER (Ideegeneratie): Met deze brainstormtechniek hebben we out-of-the-box nagedacht over ons product. Door bestaande ideeën aan te passen of te combineren, kwamen we bijvoorbeeld op functies zoals AR-navigatie en checkpoints met QR-codes.</li>
                <li>Concept Mapping (Concepting): Hiermee hebben we de relaties tussen onze doelgroep, de knelpunten en onze oplossingen visueel gestructureerd. Het hielp ons inzien dat digitale hulpmiddelen (zoals de app en kiosk) en analoge borden complementair zijn en elkaar moeten aanvullen.</li>
                <li>COCD Box (Convergeren): Na het brainstormen moesten we keuzes maken. Met deze methode hebben we alle ideeën gecategoriseerd op basis van haalbaarheid en originaliteit (Now, Wow, How). Zo filterden we de meest realistische en vernieuwende functies voor ons uiteindelijke prototype.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center overflow-visible">
          <img
            src={Scamper}
            alt="Usertests plan"
            className="mx-auto rounded-2xl shadow-xl w-full md:w-3/5 object-cover my-16
    transform transition-transform duration-300 hover:scale-110"
          />
        </div>
      </section> */}

      {/* Logo */}
      <section className="pb-40 pt-24 z-10 bg-[#342626] text-[#fdf1e3]">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 sm:space-y-10">
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

export default Sprint5;

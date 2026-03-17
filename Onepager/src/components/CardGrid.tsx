import InfoCard, { InfoCardProps } from "./InfoCard";

export default function CardGrid() {
  const cards: InfoCardProps[] = [
    {
      key: "card1",
      variant: "blue",
      title: "Emoties tonen door robots",
      content:
        "LED lichten kunnen worden gebruikt om effectief de intenties van robots te laten zien, maar ook om emotie te laten zien. Zo kan beide de sociale situatie en de situatie op straat verbeterd worden",
      quote: `“Our results suggest that expressive lights can play a significant role in helping people accurately hypothesize about a mobile robot's state and actions from afar when minimal contextual clues are present.”\n“We conclude that lights could be generally used as an effective non-verbal communication modality ”`,
      literature:
        "Enhancing human understanding of a mobile robot’s state and actions using expressive lights. (20161 augustus). IEEE Conference Publication | IEEE Xplore. https://ieeexplore.ieee.org/document/7745187",
    },
    {
      key: "card2",
      variant: "dark",
      title: "Sociale signalen maken robotinteractie menselijker",
      content:
        "Interactie tussen mensen en robots kan zowel fysiek in de openbare ruimte als digitaal via apps, webinterfaces of telepresence-systemen plaatsvinden. Fysieke interactie wordt vaak als socialer en directer ervaren, terwijl digitale interactie voordelen heeft zoals toegankelijkheid, bereik en interactie op afstand. Een combinatie van beide vormen kan daarom helpen om samenwerking tussen mensen en robots te verbeteren.",
      quote: `“Fysieke interactie met robots voelt socialer en directer, terwijl digitale interactie vooral voordelen biedt in toegankelijkheid en bereik.”`,
      literature:
        "Goodrich, M. A., & Schultz, A. C. (2007, pp. 209–210). Human–robot interaction: A survey. Foundations and Trends in Human–Computer Interaction.",
    },
    {
      key: "card3",
      variant: "brown",
      title: "AI voor verbale communicatie",
      content:
        "Met een AI bot kunnen wij goede communicatie krijgen tussen mensen en de robot, maar hier moet wel zorgvuldig mee omgegaan worden. Mocht de AI bot niet in ons bezit zijn kan het zijn dat de data wordt opgeslagen op een plek waar wij niets vanaf weten.",
      quote: `“Chatbots kunnen soms overtuigender zijn dan een nieuwsartikel op een website.” - Universiteit van Amsterdam (2025)`,
      literature:
        "Universiteit van Amsterdam. (2025, March 9). Praten met robots: hoe machines onze communicatie veranderen. Universiteit Van Amsterdam. https://www.uva.nl/shared-content/faculteiten/nl/faculteit-der-maatschappij-en-gedragswetenschappen/nieuws/2025/03/praten-met-robots-hoe-machines-onze-communicatie-veranderen.html",
    },
    {
      key: "card4",
      variant: "red",
      title: "Vandalisme is vaak een vorm van protest",
      content: `Het komt vaak voort uit onvrede, angst voor baanverlies door automatisering, of wrok tegen grote, winstgedreven bedrijven. De robot functioneert hierbij als een zondebok.
      Vandalisme kan ook plaatsvinden uit senstatie of verveling, of omdat de robot geen gevoel heeft en mensen dus geen morele rem ervaren.
      `,
      quote: `“Dit gebeurt voornamelijk omdat bewoners zich overvallen en ongehoord voelen wanneer hun omgeving verandert zonder voorafgaand overleg of duidelijke verantwoordelijkheden.”`,
      literature:
        "Hoe technologie in de publieke ruimte steeds vaker op verzet stuit. (2025, July 18). iBestuur. https://ibestuur.nl/overheid-in-transitie/toepassingen/hoe-technologie-in-de-publieke-ruimte-steeds-vaker-op-verzet",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-5xl mx-auto">
      {cards.map(({ key, ...card }) => (
        <InfoCard key={key} {...card} />
      ))}
    </div>
  );
}

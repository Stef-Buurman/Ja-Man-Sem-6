import FieldResearchCard, { FieldResearchCardProps } from "./FieldResearchCardGrid";


export default function FieldResearchCardGrid() {
  const cards: FieldResearchCardProps[] = [
      {
          key: "card4",
          variant: "red",
          title: "Studenten hebben moeite met het vinden van lokalen",
          label: "👥 Q&A",
      },
    {
      key: "card1",
      variant: "white",
      title: "Studenten vinden het lastig om rustige werkplekken te vinden",
      label: "👥 Q&A",
      },
    {
      key: "card2",
      variant: "blue",
      title: "Studenten vinden het gebouw verouderd",
      label: "👥 Q&A",
      },
    {
      key: "card3",
      variant: "red",
      title: "Studenten willen weten of lokalen al bezet zijn",
      label: "👥 Q&A",
      },
      //     {
      // key: "card5",
      // variant: "white",
      // title: "Robots zouden kunnen helpen met informeren en leren.",
      // label: "👥 Q&A",
      // },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-5xl mx-auto">
      {cards.map(({ key, ...card }) => (
        <FieldResearchCard key={key} {...card} />
      ))}
    </div>
  );
}

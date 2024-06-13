import Card from "../../../components/Card";

function CardSection() {
  // Demo data supposed to be fetched from database
  const cardDetails = [
    {
      value: 50,
      description: "Registered Users",
    },
    {
      value: 14,
      description: "Active Users",
    },
    {
      value: 51,
      description: "Visits this week",
    },
  ];
  return (
    <div className="my-[100px] flex flex-wrap items-center gap-[140px] justify-center">
      {cardDetails.map((item, index) => (
        <Card key={index} value={item.value} description={item.description} />
      ))}
    </div>
  );
}

export default CardSection;

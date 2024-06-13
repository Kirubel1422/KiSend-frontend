import CardSection from "./Sections/Home/Card";
import Hero from "./Sections/Home/Hero";

function Home() {
  return (
    <div>
      <div className="mt-[100px]">
        <Hero />
        <Separator />
        <CardSection />
      </div>
    </div>
  );
}

export const Separator = () => {
  return (
    <div className="h-[4px] max-w-6xl mx-auto bg-opacity-30 bg-[#CA6680] mt-[100px]" />
  );
};
export default Home;

import { heroPortrait } from "../../../assets";

function Hero() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-between gap-[100px]">
        <div className="w-fit h-fit rounded-full border-[4px] border-[#CA6680]">
          <img
            src={heroPortrait}
            className="w-[335px] h-[335px] rounded-full"
          />
        </div>
        <div className="flex flex-col gap-y-[20px]">
          <p className="text-[24px] text-[#5F5858] leading-[32px] font-[600] md:w-[415px]">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et
          </p>
          <button
            type="button"
            className="text-white bg-[#CA6680] text-[24px] font-[600] rounded-[25px] px-7 py-2 w-fit active:scale-90 transition-all duration-75 ease-in"
          >
            Start Chatting
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;

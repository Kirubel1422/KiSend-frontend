import PropType from "prop-types";

function Card({ value, description }) {
  return (
    <div className="text-[#5F5858] flex flex-col items-center justify-center">
      <span className="inline-block text-[96px] mb-[16px] font-[600]">
        {value}
      </span>
      <p className="text-[36px] text-center">{description}</p>
    </div>
  );
}

Card.propTypes = {
  value: PropType.string,
  description: PropType.string,
};

export default Card;

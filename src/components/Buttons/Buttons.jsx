import PropTypes from "prop-types";

export const PrimaryBtn = ({ buttonName, onClick }) => {
  return (
    <button
      type="button"
      className="bg-[#CA6680] text-white text-[18px] py-[5px] px-[35px] mt-[28px] mb-[20px] rounded-[25px]"
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export const UpdateBtn = ({ buttonName, onClick }) => {
  return (
    <button
      type="button"
      className="bg-[#CA6680] boder border-transparent text-white text-lg w-[140px] flex items-center justify-center rounded-[25px] h-[32px]"
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export const CancelBtn = ({ onClick }) => {
  return (
    <button
      type="button"
      className="border border-[#CA6680] text-[#5F5858] text-lg  w-[140px] flex items-center justify-center rounded-[25px]  h-[32px]"
      onClick={onClick}
    >
      Cancel
    </button>
  );
};

CancelBtn.propTypes = {
  onClick: PropTypes.func,
};

PrimaryBtn.propTypes = {
  buttonName: PropTypes.string,
  onClick: PropTypes.func,
};

UpdateBtn.propTypes = {
  buttonName: PropTypes.string,
  onClick: PropTypes.func,
};

import PropTypes from "prop-types";
import { TailSpin } from "react-loader-spinner";

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

export const UpdateBtn = ({ onClick, ...props }) => {
  return (
    <button
      type="button"
      className="bg-[#CA6680] boder border-transparent text-white text-lg w-[175px]  flex items-center justify-center rounded-[5px]  h-[42px]"
      onClick={onClick}
      {...props}
    >
      <>
        {props?.disabled ? (
          <span className="flex items-center gap-[5px]">
            <TailSpin height="25" width="30" color="white" /> Updating
          </span>
        ) : (
          <>Update</>
        )}
      </>
    </button>
  );
};

export const CancelBtn = ({ onClick }) => {
  return (
    <button
      type="button"
      className="bg-[#E3E3E3] text-[#5F5858] text-lg  w-[175px] flex items-center justify-center rounded-[5px]  h-[42px]"
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

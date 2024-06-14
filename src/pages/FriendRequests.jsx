import PropTypes from "prop-types";
import { janePortrait } from "../assets";
import { SiTicktick } from "react-icons/si";
import { followedBy } from "../constants/demoData";
import { noResults } from "../assets";

function FriendRequests() {
  return (
    <div className="flex items-center justify-center my-[60px]">
      <div>
        <h1 className="text-[#5F5858] text-lg mb-[34px]">
          {Array.isArray(followedBy) && followedBy.length > 0 ? (
            <>Friend request for you</>
          ) : (
            <>No friend requests</>
          )}
        </h1>

        <div className="list-wrapper flex flex-col gap-[27px]">
          {Array.isArray(followedBy) && followedBy.length > 0 ? (
            followedBy.map((item, index) => (
              <MiniCard
                key={index}
                name={item.name}
                profilePic={item.profilePic}
              />
            ))
          ) : (
            <img src={noResults} className="max-w-[250px] mb-24 mt-10" />
          )}
        </div>
      </div>
    </div>
  );
}

const StyleSheet = {
  colors: {
    border: "#D7CDCD",
    secondary: "#5F5858",
    cardBg: "#FEE0E0",
    primary: "#CA6680",
  },
};

const MiniCard = ({ name, profilePic }) => {
  return (
    <div
      style={{ backgroundColor: `${StyleSheet.colors.cardBg}` }}
      className={`pl-[28px] pr-[30px] gap-[90px] py-[7px] border border-[${StyleSheet.colors.border}] rounded-[25px] flex items-center justify-between `}
    >
      <div className="flex items-center gap-[23px]">
        <img
          src={janePortrait}
          className={`w-[35px] aspect-square rounded-full border border-[${StyleSheet.colors.border}] object-cover object-center object-fixed`}
        />

        <span className={`text-[${StyleSheet.colors.secondary}] text-lg `}>
          {name}
        </span>
      </div>

      <button
        type="button"
        className={`py-[1px] rounded-[25px] text-white text-lg flex items-center gap-[6px] px-[28px] bg-[${StyleSheet.colors.primary}]`}
      >
        <SiTicktick size={13} color="white" />
        Accept
      </button>
    </div>
  );
};

MiniCard.propTypes = {
  name: PropTypes.string,
  profilePic: PropTypes.string,
};

export default FriendRequests;

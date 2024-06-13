import PropType from "prop-types";
import { users } from "../../../constants/demoData";

function FriendsList() {
  return (
    <ul>
      {Array.isArray(users) &&
        users
          .splice(0, 3)
          .map((user, index) => (
            <MiniUserCard
              name={user.name}
              imgURL={user.profilePicture}
              key={index}
            />
          ))}
    </ul>
  );
}

const MiniUserCard = ({ name, imgURL, ...props }) => {
  return (
    <li
      className="border-[1px] border-[#D7CDCD] pl-[28px] py-[7px] mb-[16px] w-[270px] rounded-[25px] flex items-center"
      {...props}
    >
      <div className="w-fit h-fit rounded-full border-[1px] border-[#D7CDCD]">
        <img
          className="object-center w-[35px] h-[35px] object-fixed object-cover rounded-full"
          src={imgURL}
          loading="lazy"
        />{" "}
      </div>
      <span className="text-[#5F5858] text-lg ml-[23px] block">{name}</span>
    </li>
  );
};

MiniUserCard.propTypes = {
  name: PropType.string,
  imgURL: PropType.string,
};

export default FriendsList;

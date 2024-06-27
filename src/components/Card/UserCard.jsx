import PropType from "prop-types";
import { PrimaryBtn } from "../Buttons/Buttons";
import { useAddFriendMutation } from "../../api/apiSlice";

function UserCard({
  name,
  age,
  location,
  buttonName,
  profilePic,
  id,
  interpretResponse,
  ...props
}) {
  const [addFriend, { isLoading }] = useAddFriendMutation();

  const handleAddUser = (e) => {
    e.preventDefault();

    addFriend(id);
  };

  return (
    <div className="border-[1px] w-full border-[#a8a5a5] rounded-[25px] ld:px-16 md:px-12 px-10 pt-[27px] pb-[10px]">
      <div className="flex items-center flex-wrap gap-[30px]">
        <img
          src={profilePic}
          alt={name}
          className="rounded-full text-center align-center  w-[60px] h-[60px] object-fit object-center object-cover "
        />
        <p className="text-[18px] text-[#5F5858] flex flex-col gap-[8px]">
          <span className="block capitalize">{name}</span>
          <span className="block">{age}</span>
          <span className="block capitalize">{location}</span>
        </p>
      </div>

      <div className="flex justify-start">
        <PrimaryBtn
          buttonName={buttonName}
          onClick={handleAddUser}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

UserCard.propTypes = {
  name: PropType.string,
  age: PropType.string,
  location: PropType.string,
  buttonName: PropType.string,
  profilePic: PropType.string,
  id: PropType.string,
};
export default UserCard;

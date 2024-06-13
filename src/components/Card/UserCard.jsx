import PropType from "prop-types";

function UserCard({ name, age, location, buttonName, profilePic, ...props }) {
  return (
    <div className="border-[1px] w-full border-[#a8a5a5] rounded-[25px] ld:px-16 md:px-12 px-10 pt-[27px] pb-[10px]">
      <div className="flex items-center flex-wrap gap-[30px]">
        <img
          src={profilePic}
          className="rounded-full w-[60px] h-[60px] object-fit object-center object-cover "
        />
        <p className="text-[18px] text-[#5F5858] flex flex-col gap-[8px]">
          <span className="block">{name}</span>
          <span className="block">{age}</span>
          <span className="block">{location}</span>
        </p>
      </div>

      <div className="flex justify-start">
        <button
          type="button"
          className="bg-[#CA6680] text-white text-[18px] py-[5px] px-[35px] mt-[28px] mb-[20px] rounded-[25px]"
        >
          {buttonName}
        </button>
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
};
export default UserCard;

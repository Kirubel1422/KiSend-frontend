import { useState } from "react";
import PropTypes from "prop-types";
import { heroPortrait } from "../../../assets";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { message } from "../../../constants/demoData";
import { LuSendHorizonal } from "react-icons/lu";

function Chat() {
  const [isActive, setActive] = useState(true);

  return (
    <div className="border-t-[2px] mt-10 border-x-[2px] border-[#EDC79B] border-opacity-70 h-[80vh] rounded-[20px] flex flex-col relative">
      <div className="flex h-[80px] items-center justify-between md:pr-[38px] md:pl-[60px] rounded-[20px] pr-[10px] pl-[30px] bg-[#EDC79B] bg-opacity-70 ">
        <div className="flex items-center gap-[21px]">
          <div className="relative border-[2px] rounded-full border-[#CA6680]">
            <img
              src={heroPortrait}
              className="w-[56px] h-[56px] rounded-full object-center object-cover"
            />
            <GoDotFill
              size={25}
              className={`${
                isActive ? "text-[#25EE04]" : "text-[#FAFAFA]"
              } absolute right-0 bottom-0`}
            />
          </div>
          <span className="text-[#5F5858] text-lg">Kirubel Mamo</span>
        </div>
        <BsThreeDotsVertical
          color="AE9CA0"
          size={35}
          className="cursor-pointer"
        />
      </div>

      <div className="bottom-0 absolute w-full">
        {message != undefined &&
          message.map((message, index) => (
            <Message messageData={message} key={index} />
          ))}
        <SendField />
      </div>
    </div>
  );
}

const Message = ({ messageData, ...props }) => {
  return (
    <div
      className={`${
        messageData.status === "sent" ? " justify-end" : "justify-start"
      } flex items-center my-4 px-[20px]`}
    >
      <div className="flex items-center pl-[20px] pr-[10px] bg-[#EDC79B] bg-opacity-70 rounded-[25px] w-fit gap-[30px] py-2">
        <p className="text-[#5F5858] text-lg">{messageData.content}</p>
        <div className="flex flex-col gap-[3px] ">
          <span className="flex items-center">
            {messageData.seen ? (
              <>
                <TiTick size={15} color={"#43444C"} /> <TiTick size={15} />
              </>
            ) : (
              <TiTick size={15} color={"#43444C"} />
            )}
          </span>

          <time
            dateTime={messageData.sentAt}
            className="text-[#5F5858] text-lg"
          >
            {messageData.sentAt}
          </time>
        </div>
      </div>
    </div>
  );
};

const SendField = ({ ...props }) => {
  return (
    <div className="relative h-fit">
      <input
        type="text"
        name="message"
        className="w-full py-[33px] pl-[17px] text-[#5F5858] border-[2px] border-[#EDC79B] rounded-[20px] outline-none"
        placeholder="Write a message ..."
      />
      <span className="w-[73px] h-[73px] cursor-pointer rounded-full bg-[#EDC79B] bg-opacity-70 absolute right-6 bottom-2 flex items-center justify-center">
        <LuSendHorizonal color="#5F5858" size={40} />
      </span>
    </div>
  );
};

Message.propTypes = {
  messageData: PropTypes.object,
};

export default Chat;

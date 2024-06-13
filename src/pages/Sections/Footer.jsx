import { IoSendOutline } from "react-icons/io5";
import { SiFacebook } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  // For Icon-links
  const IconLinks = [
    {
      to: "#",
      name: "Facebook",
      Icon: SiFacebook,
      color: "#039BE5",
    },
    {
      to: "#",
      name: "Twitter",
      Icon: FaTwitter,
      color: "#03A9F4",
    },
    {
      to: "#",
      name: "Instagram",
      Icon: FaSquareInstagram,
      color: "#C2185B",
    },
  ];

  // Page Links
  const pageLinks = [
    {
      to: "/",
      name: "Home",
    },
    {
      to: "/global",
      name: "Global",
    },
    {
      to: "/myFriends",
      name: "My Friends",
    },
    {
      to: "/inbox",
      name: "Inbox",
    },
  ];

  // General Links
  const termLinks = [
    {
      to: "#",
      name: "Privacy and Policy",
    },
    {
      name: "Terms and Services",
      to: "#",
    },
  ];
  return (
    <div className="bg-[#EDC79B] bg-opacity-70 rounded-[20px] py-[60px]">
      <div className="grid md:grid-cols-3 place-items-center ">
        <div className="mb-auto">
          <span className=" gap-[10px] text-[40px] text-[#CA6680] font-bold flex items-center mb-[30px]">
            <IoSendOutline /> KiSend
          </span>
          <ul className="flex items-center gap-[10px]">
            {IconLinks.map((item, index) => (
              <li key={index}>
                <Link to={item.to}>
                  <item.Icon size={25} color={item.color} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul className="flex flex-col gap-[30px] text-[16px] font-bold">
            {pageLinks.map((item, index) => (
              <li key={index}>
                <Link to={item.to}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-auto">
          <ul className="flex flex-col gap-[30px] text-[16px] font-bold">
            {termLinks.map((item, index) => (
              <li key={index}>
                <Link to={item.to}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;

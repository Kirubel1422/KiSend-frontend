import { useEffect, useState } from "react";
import NavLink from "../../components/Navigation/NavLink";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSendOutline } from "react-icons/io5";
import { femaleAvatar, maleAvatar, neutral } from "../../assets";
import { FaCaretDown } from "react-icons/fa";
import { SlLogout } from "react-icons/sl";
import { RiUserLine } from "react-icons/ri";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../app/features/authFeature";
import { API_ENDPOINT } from "../../constants/basic";

function Navigation() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [avatar, setAvatarImg] = useState("");

  const [isOpen, setOpen] = useState(false); // For drop down
  const [links, setLinks] = useState({
    home: false,
    myFriends: false,
    global: false,
    inbox: false,
  });

  const NavLinks = [
    { label: "Home", route: "home" },
    { label: "Global", route: "global" },
    { label: "My Friends", route: "myFriends" },
    { label: "Inbox", route: "inbox" },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
    const currentUrl = location.pathname;
    let currentPath = currentUrl.split("/")[1];
    if (currentPath == "") currentPath = "home";

    setLinks({
      [currentPath]: true,
    });
  }, [location.pathname]);

  // For drop-down options
  const dropDownItems = [
    {
      label: "Profile",
      route: "/profile",
      Icon: RiUserLine,
    },
    {
      label: "Friend requests",
      route: "/friend-requests",
      Icon: LiaUserFriendsSolid,
    },
  ];

  // handle logout
  function handleLogout() {
    dispatch(logoutAction());
    navigate("/");
  }

  useEffect(() => {
    setAvatarImg(setAvatar(user.gender));
  }, []);

  // For setting avatar
  const setAvatar = (gender) => {
    if (gender == "") return neutral;
    else if (gender == "male") return maleAvatar;
    else return femaleAvatar;
  };

  return (
    <>
      <div className="flex items-center gap-[50px] md:gap-[75px]">
        <Link className="text-[#CA6680] text-[40px] font-[600] flex items-center gap-[6px]">
          <IoSendOutline /> KiSend
        </Link>
        <ul className="flex items-center gap-[24px]">
          {NavLinks.map((item, index) => (
            <li key={index}>
              <NavLink
                isActive={links[item.route]}
                route={item.route}
                label={item.label}
              />
            </li>
          ))}
        </ul>
      </div>

      {!!user ? (
        <div className="relative">
          <button
            type="button"
            className="relative"
            onClick={() => setOpen((prev) => !prev)}
          >
            {user.profilePicture ? (
              <img
                crossOrigin="anonymous"
                src={API_ENDPOINT + "image" + user.profilePicture}
                className="w-[65px] aspect-square object-cover object-center object-fixed rounded-full border-[2px] border-[#5F5858] border-opacity-40"
              />
            ) : (
              <img
                src={avatar}
                className="w-[65px] aspect-square rounded-full border-[2px] border-[#5F5858] border-opacity-40"
              />
            )}
            <FaCaretDown
              className="absolute top-[50%] -right-6 text-[#5F5858]"
              size={25}
            />
          </button>
          {isOpen && (
            <div className="absolute -left-24 bg-[#FFFFFF] w-[180px] border-[#EDC79B] border rounded-[5px] z-50">
              <ul className="px-[12px] pt-[10px] pb-[16px]">
                {dropDownItems.map((item, index) => (
                  <li
                    key={index}
                    className="border-b border-[#EDC79B] py-[10px]"
                  >
                    <Link
                      to={item.route}
                      className="flex items-center gap-[15px] text-[#5F5858]"
                    >
                      <item.Icon size={18} /> {item.label}
                    </Link>
                  </li>
                ))}

                <li className="pt-[10px]">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-[15px] text-[#5F5858]"
                  >
                    <SlLogout size={18} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center flex-nowrap gap-[16px] hover:text-[#CA6680] transition-all duration-200 ease-in">
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            type="button"
            className="text-[#CA6680] w-[140px] font-[600] border-[2px] border-[#CA6680] py-1 rounded-[25px] hover:bg-white transition-all duration-200 ease-in active:scale-90"
          >
            Get Started
          </button>
        </div>
      )}
    </>
  );
}

export default Navigation;

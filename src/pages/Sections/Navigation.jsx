import { useEffect, useState } from "react";
import NavLink from "../../components/Navigation/NavLink";
import { Link, useLocation } from "react-router-dom";
import { IoSendOutline } from "react-icons/io5";

function Navigation() {
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

  useEffect(() => {
    const currentUrl = location.pathname;
    let currentPath = currentUrl.split("/")[1];
    if (currentPath == "") currentPath = "home";

    setLinks({
      [currentPath]: true,
    });
  }, [location.pathname]);

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
      <div className="flex items-center flex-nowrap gap-[16px]">
        <button type="button" className="">
          Login
        </button>
        <button
          type="button"
          className="text-[#CA6680] w-[140px] font-[600] border-[2px] border-[#CA6680] py-1 rounded-[25px]"
        >
          Get Started
        </button>
      </div>
    </>
  );
}

export default Navigation;

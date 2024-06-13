import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NavLink({ label, route, isActive }) {
  return (
    <Link
      className={`${
        isActive ? "text-[#CA6680] border-[#CA6680]" : "border-transparent"
      } border-b-[2px] text-lg pb-[5px] hover:text-[#CA6680] transition-all duration-100 ease-in`}
      to={"/" + route}
    >
      {label}
    </Link>
  );
}

NavLink.propTypes = {
  isActive: PropTypes.bool,
  label: PropTypes.string,
  route: PropTypes.string,
};

export default NavLink;

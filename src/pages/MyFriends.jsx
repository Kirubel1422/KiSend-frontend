import UserCard from "../components/Card/UserCard";
import Search from "../components/Input/Search";
import ReactPaginate from "react-paginate";

import { users } from "../constants/demoData";
import { useEffect, useState } from "react";
import { paginateSettings } from "../utils/paginate";

function MyFriends() {
  const [currentItems, setCurrentItems] = useState([]);
  const [itemsOffset, setItemsOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const endOffset = itemsOffset + itemsPerPage;
    setCurrentItems(users.slice(itemsOffset, endOffset)); // Replace with actual data from database
    setPageCount(Math.ceil(users.length / itemsPerPage));
  }, [itemsOffset, itemsPerPage]);

  const CreateElements = ({ users }) => {
    return (
      <>
        {users.map((item, index) => (
          <UserCard
            name={item.name}
            age={item.age}
            profilePic={item.profilePicture}
            location={item.city + ", " + item.country}
            buttonName={"Send Message"} // Since they are friends
            key={index}
          />
        ))}
      </>
    );
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemsOffset(newOffset);
  };

  return (
    <div>
      <div className="flex items-center justify-center md:mt-[60px]">
        <Search name="search-global" placeholder={"Search for a friend"} />
      </div>

      <div className="mt-[80px] grid md:grid-cols-3 place-items-center gap-y-[50px] sm:gap-x-[30px] md:gap-x-[80px]">
        <CreateElements users={currentItems} />
      </div>

      <div className="mt-[80px] mb-[60px] flex items-center justify-center">
        <ReactPaginate
          {...paginateSettings}
          pageCount={pageCount}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
}

export default MyFriends;

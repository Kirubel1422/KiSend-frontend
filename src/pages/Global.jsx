import UserCard from "../components/Card/UserCard";
import Search from "../components/Input/Search";
import ReactPaginate from "react-paginate";

// import { users } from "../constants/demoData";
import { useEffect, useState } from "react";
import { paginateSettings } from "../utils/paginate";
import { useGetGlobalUsersQuery } from "../api/apiSlice";
import dayjs from "dayjs";
import { API_ENDPOINT } from "../constants/basic";
import { maleAvatar, femaleAvatar, neutral } from "../assets";
import { Loading } from "../components/State";
import { BiMessageAltError } from "react-icons/bi";

function Global() {
  const [currentItems, setCurrentItems] = useState([]);
  const [itemsOffset, setItemsOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [users, setUsers] = useState([]);
  const itemsPerPage = 9;

  // Apply RTK-Query
  const { data, isFetching } = useGetGlobalUsersQuery();

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  useEffect(() => {
    if (users.length) {
      const endOffset = itemsOffset + itemsPerPage;
      setCurrentItems(users.slice(itemsOffset, endOffset)); // Replace with actual data from database
      setPageCount(Math.ceil(users.length / itemsPerPage));
    }
  }, [itemsOffset, itemsPerPage, users]);

  // Set avatar function : to identify whether the user's avatar should be male or female or neither
  const setAvatar = (gender) => {
    if (gender == "") return neutral;
    else if (gender == "male") return maleAvatar;
    else return femaleAvatar;
  };

  const CreateElements = ({ users }) => {
    return (
      <>
        {users.map((item, index) => (
          <UserCard
            name={item.firstName + " " + item.lastName}
            age={dayjs(dayjs()).diff(item.dateOfBirth, "years") || " - "}
            profilePic={
              !item.profilePicture == ""
                ? API_ENDPOINT + "image" + item.profilePicture
                : setAvatar(item.gender)
            }
            location={item.country || "-"}
            buttonName={"Add Friend"}
            id={item.id}
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

  if (isFetching) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (users.length === 0) {
    return (
      <div className="my-32 border py-5 md:py-16 border-solid border-[#d4d4d4] rounded-[25px] flex flex-col items-center justify-center gap-y-[10px] md:gap-y-[25px]">
        <BiMessageAltError size={80} color="#858585" />
        <h1 className="text-4xl md:text-5xl font-semibold text-neutral-500">
          No Users Yet...
        </h1>
      </div>
    );
  }

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

export default Global;

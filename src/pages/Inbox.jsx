import Chat from "./Sections/Inbox/Chat";
import FriendsList from "./Sections/Inbox/FriendsList";

function Inbox() {
  return (
    <div>
      <div className="grid grid-cols-3">
        <div className="col-span-1 mx-auto mt-16">
          <FriendsList />
        </div>

        <div className="col-span-2">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Inbox;

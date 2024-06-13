import { Routes, Route } from "react-router-dom";

import Navigation from "./pages/Sections/Navigation";
import Home from "./pages/Home";
import Footer from "./pages/Sections/Footer";
import Global from "./pages/Global";
import MyFriends from "./pages/MyFriends";
import Inbox from "./pages/Inbox";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <header className="flex items-center justify-between md:px-[42px] gap-[16px] py-6 bg-[#EDC79B] bg-opacity-75">
        <Navigation />
      </header>

      <main className="px- md:px-[42px]">
        <Routes>
          {["home", ""].map((item, index) => (
            <Route key={index} path={"/" + item} element={<Home />} />
          ))}
          <Route path="/global" element={<Global />} />
          <Route path="/myFriends" element={<MyFriends />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <footer className="px- md:px-[42px]">
        <Footer />
      </footer>
    </div>
  );
}

export default App;

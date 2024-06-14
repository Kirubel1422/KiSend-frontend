// Demo data which is supposed to be fetched from database
import { janePortrait } from "../assets";

export const users = Array.from({ length: 100 }, () => {
  return {
    name: "Jane Doe",
    age: "18",
    city: "Addis Ababa",
    country: "Ethiopia",
    profilePicture: janePortrait,
  };
});

export const message = Array.from({ length: 2 }, () => {
  return {
    status: "sent",
    content: "Hello World!",
    seen: false,
    sentAt: "9:00 AM",
  };
});

export const followedBy = Array.from({ length: 4 }, () => {
  return {
    name: "jane doe",
    profilePic: "/getImage/2149817248912.png",
  };
});

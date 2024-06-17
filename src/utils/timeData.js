import dayjs from "dayjs";

// For formatting date objects to standard one - YYYY - MM - DD
export const formatStandard = (dateObj) => {
  if (typeof dateObj != "object") return dateObj;
  // return formatted date
  return dayjs(dateObj).format("YYYY-MM-DD");
};

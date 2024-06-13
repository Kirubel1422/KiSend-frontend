import { PaginateStyles } from "../style/style";

export const paginateSettings = {
  className: "flex items-center gap-[10px] ",
  pageClassName: PaginateStyles.pagList,
  pageLinkClassName: PaginateStyles.pagLink,
  previousLinkClassName: PaginateStyles.pagLink,
  nextLinkClassName: PaginateStyles.pagLink,
  activeClassName: "bg-red-500",
  breakClassName: "text-[#F0A6B9]",
  previousClassName: PaginateStyles.pagButtons,
  nextClassName: PaginateStyles.pagButtons,
  breakLabel: "...",
  nextLabel: ">",
  pageRangeDisplayed: 5,
  previousLabel: "<",
  renderOnZeroPageCount: null,
};

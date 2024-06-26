import { Rings } from "react-loader-spinner";

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full my-8 sm:my-24 md:my-36 w-full">
      <Rings height="80" width="80" color="#CA6680" />
      Loading ...
    </div>
  );
};

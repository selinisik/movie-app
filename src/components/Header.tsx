import * as React from "react";
import { MovieIcon } from "./icons/MovieIcon";
import { Link } from "react-router-dom";

export interface HeaderProps {}

const Header = (props: HeaderProps) => {
  return (
    <div className="flex p-6 gap-6 items-center bg-gradient-to-b from-[#082F4940] to-transparent text-white">
      <Link to="/">
        <MovieIcon />
      </Link>
      <Link to="/">
        <h1 className="text-2xl font-medium tracking-widest font-serif cursor-pointer">
          MOVIELAND
        </h1>
      </Link>
    </div>
  );
};
export default Header;

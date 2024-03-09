import * as React from "react";

export interface FooterProps {}

const Footer = (props: FooterProps) => {
  return (
    <div className="flex flex-col p-4 text-white gap-3 items-center bg-gradient-to-t from-[#082F4940] to-transparent">

      <h3>MOVIELAND</h3> <p className="h-[1px] w-full bg-zinc-800"/> <p>© 2024, Movieland,Inc</p>
    </div>
  );
};
export default Footer;

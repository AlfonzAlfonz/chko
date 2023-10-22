import { ReactNode } from "react";

export const Footer = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="container bg-black text-white">
      <div className="container-inner">
        <div className="col-span-full container-content">{children}</div>
      </div>
    </div>
  );
};

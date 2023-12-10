"use client";
import { Modal } from "@mui/base/Modal";
import Image from "next/image";
import { ReactNode, forwardRef } from "react";
import close from "../../public/close.svg";
import { Close } from "@/components/icons/Close";

export const ChkoModal = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => unknown;
  children: ReactNode;
}) => {
  return (
    <Modal
      className="fixed inset-0 flex z-[500] items-center justify-center"
      open={open}
      onClose={onClose}
      slots={{ backdrop: Backdrop }}
    >
      <div className="bg-white px-9 py-8 relative nsu-modal min-w-[300px] chko-prose mx-4 lg:mx-auto lg:max-w-[70vw] max-h-[80vh] overflow-scroll">
        <div
          className="absolute top-[30px] right-[30px] cursor-pointer"
          onClick={onClose}
        >
          <Close />
        </div>
        {children}
      </div>
    </Modal>
  );
};

const Backdrop = forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className="-z-10 fixed inset-0 bg-[rgba(0,0,0,0.5)]"
      style={{ WebkitTapHighlightColor: "transparent" }}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.displayName = "Backdrop";

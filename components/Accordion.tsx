"use client";

import { Button } from "@mui/base";
import {
  ComponentProps,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { Chevron } from "./Chevron";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Accordion = ({ children, className }: Props) => {
  const s = useState<State>({ open: false });
  return (
    <div className={className}>
      <AccordionContext.Provider value={s}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
};

export const AccordionButton = (props: ComponentProps<typeof Button>) => {
  const [state, setState] = useContext(AccordionContext);
  return (
    <Button
      {...props}
      onClick={() => setState((s) => ({ ...s, open: !s.open }))}
      className={twMerge(
        "border-t-[1px] border-black p-6 podnadpis-40",
        props.className,
        "block relative"
      )}
    >
      {props.children}
      <div
        className={`absolute right-0 top-0 m-6 h-10 w-10 flex items-center justify-center transition-transform`}
        style={{ transform: !state.open ? "rotate(180deg)" : "rotate(0)" }}
      >
        <Chevron />
      </div>
    </Button>
  );
};

export const AccordionContent = (props: ComponentProps<"div">) => {
  const [state] = useContext(AccordionContext);
  return (
    <div
      {...props}
      className={twMerge("transition-transform", props.className)}
      style={{
        display: state.open ? undefined : "none",
      }}
      aria-hidden={!state.open}
    >
      {props.children}
    </div>
  );
};

type State = { open: boolean };

const AccordionContext = createContext<
  [State, Dispatch<SetStateAction<State>>]
>(null!);

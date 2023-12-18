"use client";
import { ChkoModal } from "@/components/ChkoModal";
import { ChkoTooltip } from "@/components/ChkoTooltip";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

export const ProtectionBar = ({
  protectionZone,
  className,
  outline = "outline-black",
}: {
  protectionZone?: ("A" | "B" | "C")[];
  className?: string;
  outline?: string;
}) => {
  return (
    <div className={twMerge("flex select-none h-[24px]", className)}>
      <Item
        label="A"
        active={!!protectionZone?.includes("A")}
        tooltip="Přísné ochrany krajinného rázu"
        description={
          <>
            <p>
              V pásmu A ochrany krajinného rázu je nezbytné věnovat pozornost
              především:
            </p>

            <ul>
              <li>
                Zachování mimořádně cenného rázu území vyznačujícího se
                hodnotami přírodního, kulturně-historického i vizuálního
                charakteru, včetně krajinářsky významného projevu zástavby sídel
                s unikátními architektonickými dominantami
              </li>
              <li>
                Důsledné ochraně pohledově exponovaných partií území, především
                terénních hran, lesnatých horizontů či prostorových dominant
                (elevací)
              </li>
              <li>
                Zabránění prostorově nevhodnému rozšiřování zástavby (včetně
                stávajícího rozsahu zastavěného území sídel)
              </li>
              <li>
                Zabránění vzniku nových (umělých) krajinných dominant s
                negativním projevem
              </li>
              <li>
                Vyloučení negativní zásahů do cenných přírodních partií krajiny
                (hluboce zaříznutá údolí, krasové jevy, skalní výchozy, cenné
                lesní porosty vegetace skalních stepí, prameniště aj.)
              </li>
              <li>
                Uchování stávajícího projevu jedinečných kulturně-historických
                dominant, popř. lokalit (s významem přesahujícím hranice CHKO)
              </li>
            </ul>
          </>
        }
        fade={!!protectionZone}
        bg="bg-black"
        className={`${outline} text-white`}
      />
      <Item
        label="B"
        active={!!protectionZone?.includes("B")}
        tooltip="Zpřísněné ochrany krajinného rázu"
        description={
          <>
            <p>V pásmu B ochrany krajinného rázu je žádoucí:</p>

            <ul>
              <li>
                Dbát zachování hodnotných vizuálních vazeb spoluvytvářených
                přírodními znaky a dlouhodobým kultivováním území včetně pozice
                a projevu sídel (kulturně-historických dominant) v obrazu
                krajiny
              </li>
              <li>
                Důsledně chránit pohledově exponované partie území, především
                terénní hrany údolí – lesnaté horizonty či prostorové dominanty
                (elevace)
              </li>
              <li>
                Zabránění prostorově nevhodnému rozšiřování zástavby (včetně
                stávajícího rozsahu zastavěného území sídel)
              </li>
              <li>
                Zabránit vzniku nových (umělých) krajinných dominant s
                negativním projevem
              </li>
              <li>
                Vyloučení negativní zásahů do cenných přírodních partií krajiny
                (krasové jevy, skalní útvary, cenné lesní porosty, cenná
                rostlinná společenstva, prameniště aj.)
              </li>
              <li>
                Realizovat opatření k eliminaci projevu negativních dominant
                (krycí výsadby); technické doplňky umísťovat s ohledem na
                zachování tradičního výrazu zástavby; pro tyto účely preferovat
                objekty v zemědělských či průmyslových areálech
              </li>
              <li>
                Podporovat vznik a údržbu krajinotvorných prvků – vodních
                útvarů, vegetačních doprovodů cest, přechodové sídelní zeleně
                apod.
              </li>
            </ul>
          </>
        }
        fade={!!protectionZone}
        bg="bg-[#AAAAAA]"
        className={"outline-black text-black"}
      />
      <Item
        label="C"
        active={!!protectionZone?.includes("C")}
        tooltip="Běžná ochrana krajinného rázu"
        description={
          <>
            <p>V pásmu C ochrany krajinného rázu je žádoucí:</p>

            <ul>
              <li>
                Důsledně chránit pohledově exponované partie území, především
                terénní hrany údolí – lesnaté horizonty či prostorové dominanty
                (elevace)
              </li>
              <li>
                Zabránit vzniku nových (umělých) krajinných dominant; uchovat
                projev stávajících pozitivních krajinných dominant
              </li>
              <li>
                Zabránit prostorově nevhodnému rozšiřování zástavby (včetně
                stávajícího rozsahu zastavěného území sídel); dodržováním
                stavebních zvyklostí venkovské zástavby kultivovat urbanistický
                výraz sídel či tento výraz obnovovat
              </li>
              <li>
                Vyloučit negativní zásahy do cenných přírodních partií krajiny
                (suťové lesy, popř. další)
              </li>
              <li>
                Realizovat opatření k eliminaci projevu negativních dominant
                (krycí výsadby); technické doplňky umísťovat s ohledem na
                zachování tradičního výrazu zástavby; pro tyto účely preferovat
                objekty v zemědělských či průmyslových areálech
              </li>
              <li>
                Podporovat vznik a údržbu krajinotvorných prvků – vodních
                útvarů, vegetačních doprovodů cest, přechodové sídelní zeleně
                apod.
              </li>
            </ul>
          </>
        }
        fade={!!protectionZone}
        bg="bg-white"
        className={"outline-black text-black"}
      />
    </div>
  );
};

const Item = ({
  label,
  active,
  tooltip,
  description,
  fade,
  bg,
  className,
}: {
  label: string;
  tooltip: string;
  description: ReactNode;
  active: boolean;
  fade: boolean;
  bg: string;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ChkoTooltip
        title={
          <span className="text-[13px]">
            <span className="popisky-13">Pásmo {label}</span> <br />
            {tooltip}
          </span>
        }
      >
        <div
          className={`flex-1 flex items-center justify-center ${bg} ${className} ${
            active ? "outline-2 outline z-10" : fade ? "opacity-50" : ""
          }`}
          onClick={() => setOpen(true)}
        >
          {label}
        </div>
      </ChkoTooltip>
      <ChkoModal open={open} onClose={() => setOpen(false)}>
        <h2 className="flex items-center gap-4">
          <span>KATEGORIE SÍDLA</span>{" "}
          <span
            className={`w-8 h-8 flex items-center justify-center ${bg} ${className} rounded-full`}
          >
            {label}
          </span>
        </h2>
        {description}
      </ChkoModal>
    </>
  );
};

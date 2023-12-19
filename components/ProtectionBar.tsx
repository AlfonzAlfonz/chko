import { twMerge } from "tailwind-merge";
import { ProtectionBarItem } from "./ProtectionBarItem";

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
      <ProtectionBarItem
        {...protectionZoneItems.A}
        active={!!protectionZone?.includes("A")}
        fade={!!protectionZone}
        bg={"bg-black"}
        className={`${outline} text-white`}
      />
      <ProtectionBarItem
        {...protectionZoneItems.B}
        active={!!protectionZone?.includes("B")}
        fade={!!protectionZone}
        bg="bg-[#AAAAAA]"
        className={"outline-black text-black"}
      />
      <ProtectionBarItem
        {...protectionZoneItems.C}
        active={!!protectionZone?.includes("C")}
        fade={!!protectionZone}
        bg="bg-white"
        className={"outline-black text-black"}
      />
    </div>
  );
};

export const protectionZoneItems = {
  A: {
    label: "A",
    tooltip: "Přísné ochrany krajinného rázu",
    description: (
      <>
        <p>
          V pásmu A ochrany krajinného rázu je nezbytné věnovat pozornost
          především:
        </p>

        <ul>
          <li>
            Zachování mimořádně cenného rázu území vyznačujícího se hodnotami
            přírodního, kulturně-historického i vizuálního charakteru, včetně
            krajinářsky významného projevu zástavby sídel s unikátními
            architektonickými dominantami
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
            Zabránění vzniku nových (umělých) krajinných dominant s negativním
            projevem
          </li>
          <li>
            Vyloučení negativní zásahů do cenných přírodních partií krajiny
            (hluboce zaříznutá údolí, krasové jevy, skalní výchozy, cenné lesní
            porosty vegetace skalních stepí, prameniště aj.)
          </li>
          <li>
            Uchování stávajícího projevu jedinečných kulturně-historických
            dominant, popř. lokalit (s významem přesahujícím hranice CHKO)
          </li>
        </ul>
      </>
    ),
  },
  B: {
    label: "B",

    tooltip: "Zpřísněné ochrany krajinného rázu",
    description: (
      <>
        <p>V pásmu B ochrany krajinného rázu je žádoucí:</p>

        <ul>
          <li>
            Dbát zachování hodnotných vizuálních vazeb spoluvytvářených
            přírodními znaky a dlouhodobým kultivováním území včetně pozice a
            projevu sídel (kulturně-historických dominant) v obrazu krajiny
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
            Zabránit vzniku nových (umělých) krajinných dominant s negativním
            projevem
          </li>
          <li>
            Vyloučení negativní zásahů do cenných přírodních partií krajiny
            (krasové jevy, skalní útvary, cenné lesní porosty, cenná rostlinná
            společenstva, prameniště aj.)
          </li>
          <li>
            Realizovat opatření k eliminaci projevu negativních dominant (krycí
            výsadby); technické doplňky umísťovat s ohledem na zachování
            tradičního výrazu zástavby; pro tyto účely preferovat objekty v
            zemědělských či průmyslových areálech
          </li>
          <li>
            Podporovat vznik a údržbu krajinotvorných prvků – vodních útvarů,
            vegetačních doprovodů cest, přechodové sídelní zeleně apod.
          </li>
        </ul>
      </>
    ),
  },
  C: {
    label: "C",
    tooltip: "Běžná ochrana krajinného rázu",
    description: (
      <>
        <p>V pásmu C ochrany krajinného rázu je žádoucí:</p>

        <ul>
          <li>
            Důsledně chránit pohledově exponované partie území, především
            terénní hrany údolí – lesnaté horizonty či prostorové dominanty
            (elevace)
          </li>
          <li>
            Zabránit vzniku nových (umělých) krajinných dominant; uchovat projev
            stávajících pozitivních krajinných dominant
          </li>
          <li>
            Zabránit prostorově nevhodnému rozšiřování zástavby (včetně
            stávajícího rozsahu zastavěného území sídel); dodržováním stavebních
            zvyklostí venkovské zástavby kultivovat urbanistický výraz sídel či
            tento výraz obnovovat
          </li>
          <li>
            Vyloučit negativní zásahy do cenných přírodních partií krajiny
            (suťové lesy, popř. další)
          </li>
          <li>
            Realizovat opatření k eliminaci projevu negativních dominant (krycí
            výsadby); technické doplňky umísťovat s ohledem na zachování
            tradičního výrazu zástavby; pro tyto účely preferovat objekty v
            zemědělských či průmyslových areálech
          </li>
          <li>
            Podporovat vznik a údržbu krajinotvorných prvků – vodních útvarů,
            vegetačních doprovodů cest, přechodové sídelní zeleně apod.
          </li>
        </ul>
      </>
    ),
  },
};

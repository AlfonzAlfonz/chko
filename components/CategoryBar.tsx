"use client";
import { ChkoModal } from "@/components/ChkoModal";
import { ChkoTooltip } from "@/components/ChkoTooltip";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

export const CategoryBar = ({
  category,
  className,
}: {
  category?: ("I" | "II" | "III" | "IV")[];
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex select-none h-[24px] before:border-t-white before:border-r-white",
        className
      )}
    >
      <Item
        label="I"
        active={!!category?.includes("I")}
        fade={!!category}
        tooltip="Sídlo má mimořádně silný vliv na vznik výrazného rázu krajiny, přírodní rámec (morfologie terénu a vegetační kryt) zde dotváří estetické hodnoty a harmonii krajiny."
        description={
          <>
            <p>Charakteristika</p>
            <p>
              Venkovské sídlo a lokalita se zástavbou – zpravidla vizuálně
              otevřený segment krajiny, v jehož obraze se sídlo projevuje –
              zahrnuje území, ve kterých má zástavba mimořádně silný vliv na
              vznik výrazného rázu krajiny a kde přírodní rámec (morfologie
              terénu a vegetační kryt) dotváří estetické hodnoty a harmonii
              krajiny. Jedná se zejména o území se zástavbou, která mají
              dochované tradiční formy, zřetelný architektonický výraz,
              architektonické a památkové hodnoty. Jedná se o sídla, kde výrazně
              dochovaná historická struktura zástavby je zcela typická, dokládá
              způsob osídlení území, obhospodařování zemědělských ploch a
              spoluvytváří typickou krajinnou scénu. Sídlo se často vizuálně
              projevuje v okolní otevřené krajině, zástavba sídla má mimořádně
              silný vliv na vznik výrazného rázu krajiny.
            </p>

            <p>
              Jedná se o sídlo s některými z následujících znaků krajinného
              rázu:
            </p>
            <ul>
              <li>
                Sídlo (nebo ucelená část sídla) jehož charakter urbanistické
                struktury, charakter zástavby a architektonický výraz staveb
                zásadním způsobem spoluvytvářejí ráz krajiny
              </li>
              <li>
                sídlo (nebo ucelená část sídla) s výrazně dochovanou historickou
                urbanistickou strukturou a s dochovanými stavbami lidové
                architektury
              </li>
              <li>sídlo se zřetelnými stopami členění historické plužiny</li>
            </ul>

            <p>Podmínky ochrany krajinného rázu (regulativy)</p>
            <ul>
              <li>
                K účelu ochrany struktury zástavby byly definovány následující
                podmínky:
              </li>
              <li>
                Bude zachována historická struktura zástavby s výrazně omezenou
                možností jejího rozšíření (rozvoj obce je ukončen a bude dále
                směřovat k přestavbě a obnově existujících objektů, nová
                výstavba je možná pouze omezeně)
              </li>
              <li>
                Bude chráněna dochovaná silueta sídla a jeho vizuální projev v
                krajině (je třeba vyloučit stavby, které by měřítkem, formou,
                materiálem nebo barevností vytvářely nový znak vizuálního
                projevu sídla v krajině)
              </li>
            </ul>

            <p>
              K účelu ochrany charakteru zástavby byly definovány následující
              podmínky:
            </p>
            <ul>
              <li>
                Při přestavbách, obnově nebo nové výstavbě bude chráněn
                charakter zástavby při využití tradičních architektonických
                forem, prvků a materiálů (zejména v kontextu s objekty a soubory
                se zřetelnými architektonickými hodnotami a s kulturními
                památkami), nová výstavba se bude podřizovat formám a výrazu
                tradičních objektů - půdorysný tvar, výška, tvar střechy,
                materiály a barevnost
              </li>
            </ul>
          </>
        }
        bg="bg-chkored"
      />
      <Item
        label="II"
        active={!!category?.includes("II")}
        fade={!!category}
        tooltip="Sídlo vyznačují se výraznou krajinotvornou hodnotou, vystupuje jako významný spolutvůrčí krajinný prvek s příznivým projevem v kontextu širšího krajinného rámce."
        description={
          <>
            <p>Charakteristika</p>
            <p>
              Sídla zařazená do II. kategorie se vyznačují rovněž výraznou
              krajinotvornou hodnotou, vystupují jako významný spolutvůrčí
              krajinný prvek s příznivým projevem v kontextu širšího krajinného
              rámce. Samotná zástavba v těchto případech nemusí vynikat
              významnými architektonickými nebo památkovými hodnotami, ale
              spoluvytváří harmonii prostředí po stránce měřítkové i estetické.
              Zástavba v sídle odráží jeho dřívější status bez výraznějších
              prvků vybočujících mimo kontinuum historického vývoje – jak ve
              smyslu měřítka tak také funkce.
            </p>

            <p>
              Jedná se o sídlo s některými z následujících znaků krajinného
              rázu:
            </p>
            <ul>
              <li>
                sídlo (nebo ucelená část sídla) jehož charakter urbanistické
                struktury, charakter zástavby a architektonický výraz staveb
                spoluvytvářejí ráz krajiny
              </li>
              <li>
                sídlo (nebo ucelená část sídla) s částečně zachovanou, příp.
                mírně narušenou historickou urbanistickou strukturou a
                dochovanými objekty lidové architektury event. jinými hodnotnými
                objekty doplněnými dalšími stavbami hmotově, ani výškově výrazně
                nenarušujícími dochovaný ráz lokality
              </li>
              <li>
                sídlo s dochovanými dílčími stopami členění historické plužiny.
              </li>
            </ul>

            <p>Podmínky ochrany krajinného rázu (regulativy)</p>
            <ul>
              <li>
                K účelu ochrany struktury zástavby byly definovány následující
                podmínky:
              </li>
              <li>
                Bude respektována historická struktura zástavby s možností
                jejího úměrného doplnění
              </li>
              <li>
                Nová výstavba bude situována do kontaktu s existující zástavbou,
                jiné řešení je možné pouze u specifických typů rozptýlené
                zástavby
              </li>
              <li>
                Je třeba omezit zásahy ovlivňující siluetu sídla a vyloučit
                stavby, které by vytvářely nový výrazný znak siluety existující
                zástavby.
              </li>
            </ul>

            <p>
              K účelu ochrany charakteru zástavby byly definovány následující
              podmínky:
            </p>
            <ul>
              <li>
                Bude chráněn charakter zástavby (zejména měřítko a hmoty) při
                architektonickém výrazu korespondujícím s dochovanou
                architekturou, nová výstavba se bude podřizovat formám a výrazu
                objektů – měřítko, hmoty, půdorysný tvar, výška, tvar střechy.
              </li>
            </ul>
          </>
        }
        bg="bg-chkoorange"
      />
      <Item
        label="III"
        active={!!category?.includes("III")}
        fade={!!category}
        tooltip="Sídlo nevynikající významnými urbanistickými ani architektonickými či památkovými hodnotami, jeho projev v obrazu krajiny (vnější působení) je však do značné míry harmonický."
        description={
          <>
            <p>Charakteristika</p>
            <p>
              Sídla zařazená do III. kategorie, nevynikají významnými
              urbanistickými ani architektonickými či památkovými hodnotami,
              jejich projev v obrazu krajiny (vnější působení) je však do značné
              míry harmonický. Charakter zástavby v sídle je různorodý, v
              měřítku či vzhledu nejednotný. Typická je absence tradiční
              dominanty, zřetelný kontakt (promíšenost) starší a novodobé
              zástavby, hojnost rekonstrukcí starších objektů s realizací
              přístaveb, výskyt opuštěných či zchátralých objektů, popř. celková
              nevyváženost výrazu stavebního fondu.
            </p>

            <p>
              Jedná se o sídlo s některými z následujících znaků krajinného
              rázu:
            </p>
            <ul>
              <li>
                sídlo (nebo ucelená část sídla), které se dílčím způsobem podílí
                na rázu krajiny
              </li>
              <li>
                sídlo (nebo ucelená část sídla) se setřenou historickou
                urbanistickou strukturou s výrazně přestavěnými původními
                objekty a s novodobou zástavbou nevymykající se hmotově z
                tradičního charakteru hmot a forem objektů.
              </li>
            </ul>

            <p>Podmínky ochrany krajinného rázu (regulativy)</p>
            <ul>
              <li>
                K účelu ochrany struktury zástavby byly definovány následující
                podmínky:
              </li>
              <li>
                Urbanistická struktura sídla může být upravena a doplněna,
                rozvoj sídla je možný pouze v návaznosti na existující zástavbu
                sídla.
              </li>
              <li>
                Nová výstavba na okrajích existující zástavby bude navržena s
                cílem vytvoření harmonického přechodu sídla do krajiny.
              </li>
            </ul>

            <p>
              K účelu ochrany charakteru zástavby byly definovány následující
              podmínky:
            </p>
            <ul>
              <li>
                Bude zachován charakter zástavby (zejména měřítko a hmoty) při
                individuálním architektonickém výrazu s respektováním
                (nesnižováním případných cenných hodnot) architektury
                stávajících objektů ležících ve vizuálním kontextu.
              </li>
            </ul>
          </>
        }
        bg="bg-chkoyellow"
      />
      <Item
        label="IV"
        active={!!category?.includes("IV")}
        fade={!!category}
        tooltip="Sídlo nevynikající významnými urbanistickými ani architektonickými či památkovými hodnotami ani harmonickým projevem v obrazu krajiny."
        description={
          <>
            <p>Charakteristika</p>
            <p>
              Sídla zařazená do IV. kategorie nevynikají významnými
              urbanistickými ani architektonickými či památkovými hodnotami ani
              harmonickým projevem v obrazu krajiny. Mohou se vyznačovat
              negativním, rušivým, popř. velmi kontrastním působením v širším
              krajinném rámci. Charakteristické pro sídla zařazená do této
              kategorie je výskyt netradičních či cizorodých prvků v zástavbě,
              které vybočují z běžného měřítka zástavby, abstrahují od
              architektonických zvyklostí či narušují původní historickou
              strukturu sídla. Absentují zde cenné architektonické či památkově
              chráněné objekty.
            </p>

            <p>
              Jedná se o sídlo s některými z následujících znaků krajinného
              rázu:
            </p>
            <ul>
              <li>
                sídlo projevující se v krajině siluetou s rušivými prvky –
                měřítkově a tvarově cizorodými stavbami
              </li>
              <li>
                sídlo (nebo ucelená část sídla) se setřenou historickou
                urbanistickou strukturou a s převážně různorodou výstavbou bez
                zřetelných architektonických hodnot a bez jednotících rysů
              </li>
              <li>
                sídlo v přetvořené, esteticky neatraktivní agrární krajině se
                setřenými stopami historické kultivace.
              </li>
            </ul>

            <p>Podmínky ochrany krajinného rázu (regulativy)</p>
            <ul>
              <li>
                K účelu ochrany struktury zástavby byly definovány následující
                podmínky:
              </li>
              <li>
                Nestanovují se specifická omezení v zásahu do struktury sídla;
                rozvoj sídla nesmí vést k posílení negativního projevu zástavby
                v širším krajinném rámci (vnějšího působení)
              </li>
              <li>
                Doplnění a přestavba struktury sídla musí být směrována k
                vytvoření nových hodnot harmonie měřítka a vztahů v krajině.
              </li>
            </ul>

            <p>
              K účelu ochrany charakteru zástavby byly definovány následující
              podmínky:
            </p>
            <ul>
              <li>
                Nová výstavba a přestavby stávajících objektů nebudou vytvářet
                prvky měřítkově, hmotově a barevně cizorodé venkovskému
                prostředí
              </li>
              <li>
                Formy a arch. výraz staveb budou posuzovány individuálně
                vzhledem k vizuálnímu projevu v krajině a ke kontextu s okolní
                zástavbou.
              </li>
            </ul>
          </>
        }
        bg="bg-chkogreen"
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
}: {
  label: string;
  tooltip: string;
  description: ReactNode;
  active: boolean;
  fade: boolean;
  bg: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ChkoTooltip
        title={
          <span className="text-[13px]">
            <span className="popisky-13">Kategorie {label}</span> <br />
            {tooltip}
          </span>
        }
      >
        <div
          className={`flex-1 flex items-center justify-center ${bg} ${
            active
              ? "outline-black outline-2 outline z-10"
              : fade
              ? "opacity-50"
              : ""
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
            className={`w-8 h-8 flex items-center justify-center ${bg} rounded-full`}
          >
            {label}
          </span>
        </h2>
        {description}
      </ChkoModal>
    </>
  );
};

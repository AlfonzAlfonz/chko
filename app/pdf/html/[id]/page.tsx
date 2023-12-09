/* eslint-disable @next/next/no-img-element */
import { FigureImage } from "@/components/FigureImage";
import { db } from "@/lib/db";
import "./pdf.css";
import { PdfFigureImage, PdfImage } from "@/components/PdfFigureImage";
import QRCode from "qrcode";
import a1 from "@/public/static/pdf/Vinarice_nadhled 3.png";
import a2 from "@/public/static/pdf/Vinarice_nadhled 4.png";
import chko_cr from "@/public/static/chko_cr.svg";
import Image from "next/image";
import imgb1 from "@/public/static/DSC_0497-e1563521368513 1.png";
import imgb2 from "@/public/static/DSC_0497-e1563521368513 2.png";
import imgb3 from "@/public/static/DSC_0497-e1563521368513 3.png";
import imgb4 from "@/public/static/DSC_0497-e1563521368513 4.png";
import { CategoryBar } from "@/components/CategoryBar";
import { ProtectionBar } from "@/components/ProtectionBar";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";

export const dynamic = "error";
export const dynamicParams = true;
export const revalidate = 30;

export const generateStaticParams = async () => {
  return await db
    .selectFrom("cities")
    .select("id")
    .execute()
    .then((ids) =>
      ids.map((i) => ({
        id: String(i.id),
      }))
    );
};

const Pdf = async ({ params }: { params: { id: string } }) => {
  const obec = await getData(+params.id);

  if (!obec) return null;

  const qrcodes = await Promise.all(
    obec.data.links.map((l) =>
      QRCode.toDataURL(l[1], {
        margin: 0,
        scale: 1,
      }).then((url) => [l[0], l[1], url] as const)
    )
  );

  return (
    <div className={`pdf ${myFont.className}`}>
      <div className="page exact flex flex-col justify-between">
        <div>
          <h1>Jak stavět v krajině</h1>
          <table className="mt-4 w-full uppercase tracking-[2.2px]">
            <tbody>
              <tr>
                <td className="py-2 text-[#808080] border-y-[1px] border-black">
                  Obec
                </td>
                <td className="py-2 border-y-[1px] border-black">
                  Svatý jan pod skalou
                </td>
              </tr>
              <tr>
                <td className="py-2 text-[#808080] border-y-[1px] border-black">
                  CHKO
                </td>
                <td className="py-2 border-y-[1px] border-black">Český kras</td>
              </tr>
            </tbody>
          </table>
        </div>
        <FigureImage figure={obec?.data.cover} imgClassName="aspect-auto" />
      </div>
      <div className="page">
        <Topbar>{obec.metadata.name}</Topbar>
        <h1 className="page-title">Proč a jak krajinný ráz</h1>
        <div className="flex section-col">
          <div className="flex-1">
            Patří k dobrému životu, že můžeme pobývat v prostředí, které se nám
            líbí a blahodárně na nás působí. Silou zákona proto bráníme tako-
            vým stavebním a jiným zásahům, které necitli- vě proměňují, nebo
            dokonce ohrožují charakter místní krajiny. Jde zejména o typické
            tvary a proporce, barvy, charakteristické pohledy či kulturní formy.
            Takovému ohledu při vytváření nových hodnot říkáme ochrana
            krajinného rázu.
          </div>
          <div className="flex-1">
            Posuzujeme-li nějaký stavební záměr z hle- diska ochrany krajinného
            rázu, nejde to dělat všude stejně a podle stejných kritérií. Je zá-
            sadní, kde přesně se má stavět. Co se může schovat někde v údolí či
            ve skrytu stromů, nebo i pozitivně vyniknout tam, kde už novější
            zástavba je, působí na vesnické návsi nebo na vrcholu kopce velmi
            rušivě, nevhodně. To se týká jak architektonických detailů (např.
            větší okno), tak celkové hmoty či tvaru budov (např. plochá
            střecha).
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <img
            src="/static/pdf/Vinarice_nadhled 3.png"
            className="w-full"
            alt=""
          />
          <img
            src="/static/pdf/Vinarice_nadhled 4.png"
            className="w-full"
            alt=""
          />
          <p className="text-[12px] leading-tight -mt-3">
            RŮZNÉ CHARAKTERY KRAJIN A TOMU ODPOVÍDAJÍCÍ URBANISTICKÉ STRUKTURY:
            <br />
            1) KOMPAKTNÍ VESNICE S NÁVSÍ V NÍŽINNÝCH OBLASTECH
            <br /> 2) ROZVODNĚNÁ ZÁSTAVBA CHALUP TYPICKÁ PRO HORSKÉ OBLASTI
          </p>
        </div>
      </div>
      <div className="page flex flex-col">
        <Topbar>{obec.metadata.name}</Topbar>
        <h1 className="page-title">Chráněná krajiná oblast</h1>
        <div className="flex flex-col justify-between h-full flex-auto">
          <div className="flex section-col">
            <div className="flex-1">
              Asi jen jednu sedminu území státu tvoří tzv. chráněné krajinné
              oblasti (CHKO). To jsou území, která se navzdory překotné
              modernizaci a industrializaci podařilo zachovat lépe než jiná.
              Udržet tato území v jejich tradiční podobě je ve veřejném, zákony
              posvěceném zájmu. Proto se v CHKO na ochranu krajinného rázu dbá
              více než jinde. A to i při schvalování stavební činnosti. Ačkoli
              usměrňování výstavby předsta- vuje pro jednotlivé stavebníky
              určitá omezení, v širších souvislostech jde o důležitou veřejnou
              službu pro stávající obyvatele i návštěvníky.
            </div>
            <div className="flex-1">
              Obecně platí, že stavby v CHKO by měly zapa- dat do svého okolí.
              Neměly by na sebe lacině upozorňovat, vyčnívat a trčet. Žádoucí
              jsou stavby decentní, vycházející z místních tradic a tvarů.
              Ideální jsou opravy starých staveb. Nové stavby jsou přijatelné,
              ale ne kdekoli a ne takové, které by se vzpouzely dlouhodobě for-
              movanému charakteru místa a okolních staveb. Nakolik architektura
              souvisí se způsobem živo- ta, bydlení v CHKO je především pro ty,
              kteří mají zájem o skromný a jednoduchý venkovský život. Okázalé,
              velkorysé nebo provokativní stavby, byť i esteticky a
              architektonicky hod- notné, se do těchto oblastí nehodí. Kdo stojí
              o takový dům (a život), měl by si raději pořídit pozemek mimo
              CHKO.
            </div>
          </div>
          <figure>
            <img src="/static/chko_cr.svg" alt="" className="w-full -ml-4" />
            <figcaption className="mt-16 text-[12px] leading-tight">
              CHRÁNĚNNÉ KRAJINÉ OBLASTI V ČESKÉ REPUBLICE
            </figcaption>
          </figure>
        </div>
      </div>
      <div className="page">
        <Topbar>{obec.metadata.name}</Topbar>
        <h1 className="page-title">CHKO Český kras</h1>
        <div className="flex gap-5">
          <div className="flex-1">
            <h2 className="py-3">Co je typické</h2>
            <ul className="ordered-list leading-tight text-[14px]">
              <li>
                Sevřené menší vesnice posazené mezi kopci se zděnými podélnými
                statky a střechami z pálených tašek
              </li>
              <li>
                Okolo vesnic volná zemědělská krajina pastvin, luk, polí, sadů,
                polních cest, lesů
              </li>
              <li>
                Bez roztroušených staveb po okolí (mlýny, hájovny apod.
                výjimečně)
              </li>
              <li>Dominanty kostelů, hradu</li>
            </ul>
          </div>
          <div className="flex-1">
            <h2 className="py-3">Navazujme na tradice</h2>
            <ul className="ordered-list leading-tight text-[14px]">
              <li>Nezastavět horizonty</li>
              <li>
                Stavět (vymezovat zastavitelná území) jen v přímé návaznosti na
                obce
              </li>
              <li>Nezakrýt historické dominanty</li>
              <li>
                Opravy starých domů nebo novostavby držící tvar a vzhled statků,
                které jsou ve vesnicích okolo
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-4 tracking-[2.2px] mt-2">
          <div className="">
            <PdfImage
              img={imgb1}
              imgClassName="aspect-[10/8] object-cover mb-2"
              caption="SKALNATÁ ÚDOLÍ A ZALESNĚNÉ VRCHY BEZ STAVEB"
            />
          </div>
          <div className="">
            <PdfImage
              img={imgb2}
              imgClassName="aspect-[10/8] object-cover mb-2"
              caption="VÁPENCOVÉ LOMY – SPOLEČNÉ PŮSOBENÍ ČLOVĚKA A PŘÍRODY"
            />
          </div>
          <div className="">
            <PdfImage
              img={imgb3}
              imgClassName="aspect-[10/8] object-cover mb-2"
              caption="HISTORICKÉ DOMINANTY – KOSTELY, KLÁŠTER, HRAD"
            />
          </div>
          <div className="">
            <PdfImage
              img={imgb4}
              imgClassName="aspect-[10/8] object-cover mb-2"
              caption="HISTORICKÉ DOMINANTY – KOSTELY, KLÁŠTER, HRAD
SEMKNUTÉ VESNICE PODÉLNÝCH ZDĚNÝCH STATKŮ, LOUKY, ALEJE, SADY, POLE PASTVINY OKOLO"
            />
          </div>
        </div>
      </div>
      <div className="page">
        <Topbar>{obec.metadata.name}</Topbar>
        <h1>Svatý jan pod skalou</h1>
        <div className="section-col flex">
          <div className="flex-1 w-[50%]">
            <p className="label">Kategorie sídla</p>
            <CategoryBar
              category={obec.metadata.category}
              className="w-full h-[28px] my-2"
            />
            <p className="text-[11px] my-2">
              Sídlo má mimořádně silný vliv na vznik výrazného rázu krajiny,
              přírodní rámec (morfologie terénu a vegetační kryt) zde dotváří
              estetické hodnoty a harmonii krajiny.
            </p>
          </div>
          <div className="flex-1 w-[50%]">
            <p className="label">Pásmo ochrany</p>
            <ProtectionBar
              protectionZone={obec.metadata.protectionZone}
              outline="outline-black"
              className="w-full h-[28px] my-2"
            />
            <p className="text-[11px] my-2">Přísné ochrany krajinného rázu.</p>
          </div>
        </div>

        <div className="flex gap-4 section-col items-start">
          <table className="mt-4 w-[50%] uppercase tracking-[2.2px] flex-1 text-[10px]">
            <tbody>
              <tr>
                <td className="label py-1 border-y-[1px] border-black">
                  Okres
                </td>
                <td className="border-y-[1px] border-black">
                  {obec.metadata.okres}
                </td>
              </tr>
              <tr>
                <td className="label py-1 border-y-[1px] border-black">Kraj</td>
                <td className="border-y-[1px] border-black">
                  {obec.metadata.kraj}
                </td>
              </tr>
              <tr>
                <td className="label py-1 border-y-[1px] border-black">
                  První písemná zmínka
                </td>
                <td className="border-y-[1px] border-black">
                  {obec.data.foundedYear}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="mt-4 w-[50%] uppercase tracking-[2.2px] text-[10px]">
            <tbody>
              <tr>
                <td className="label py-1 border-y-[1px] border-black">
                  POČET OBYV./DOMŮ V R. {obec.data.censuses[0]![0]}
                </td>
                <td className="border-y-[1px] border-black">
                  {obec.data.censuses[0]![1]}
                </td>
              </tr>
              <tr>
                <td className="label py-1 border-y-[1px] border-black">
                  POČET OBYV./DOMŮ V R. {obec.data.censuses[1]![0]}
                </td>
                <td className="border-y-[1px] border-black">
                  {obec.data.censuses[1]![1]}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <img
          src={`https://api.mapbox.com/styles/v1/alfonz/clf6vgysg00cq01mlod7t0zro/static/${obec.metadata.position[1]},${obec.metadata.position[0]},16,0/1280x720?access_token=${ACCESS_TOKEN}&logo=false`}
          alt="Mapa"
          className="my-5"
        />

        <p className="columns-2 section-col">{obec.data.intro}</p>
      </div>
      <div className="page">
        <Topbar>{obec.metadata.name}</Topbar>
        <h1 className="page-title">Převažující charakter výstavby</h1>
        {obec.data.characteristics.map((f, i) => (
          <PdfFigureImage key={i} figure={f} />
        ))}
      </div>
      <div className="page">
        <Topbar>{obec.metadata.name}</Topbar>
        <h1 className="page-title">Přítomnost památkově chráněných objektů</h1>
        {obec.data.buildings.map((f, i) => (
          <PdfFigureImage key={i} figure={f} />
        ))}
      </div>
      <div className="page exact">
        <Topbar>{obec.metadata.name}</Topbar>
        <div className="bg-[#b9eed0] -mx-8 -mt-[17px] px-7 h-[calc(100%-17px)]">
          <h1 className="page-title">
            Podmínky ochrany a doplňující doporučení
          </h1>
          <ul className="ordered-list white section-col col-span-full flex flex-col flex-wrap h-[45%]">
            {obec.data.terms.map((v, ii) => (
              <li key={ii} className="p-1 w-[calc(50%-10px)]">
                {v}
              </li>
            ))}
          </ul>
          <h2>Doporučení</h2>
          <p className="container-content col-span-full">
            Je dobré si předem zjistit, zda zamýšlený stavební záměr je v
            souladu s územním plánem (viz webové stránky obce). Zároveň
            doporučujeme ještě před započetím projekčních prací konzultovat svůj
            záměr na správě CHKO – je vhodné mít s sebou alespoň zákres půdorysu
            do situace, tj. umístění stavby v katastrální mapě, a hmotovou
            skicu, tj. siluetu stavby ve vybrané fotografii z charakteristického
            pohledu ukazujícího její působení v krajině.
          </p>
        </div>
      </div>
      <div
        className="page flex flex-col w-full"
        style={{ breakAfter: "avoid" }}
      >
        <Topbar>{obec.metadata.name}</Topbar>
        <h1 className="page-title">Další informace</h1>
        <div className="flex flex-wrap justify-between gap-5 py-5 text-[11px]">
          {qrcodes.map((l, i) => (
            <div key={i} className="w-[calc(50%-10px)]">
              <img
                src={l[2]}
                alt={l[1]}
                className="w-[50%] mb-2"
                style={{ imageRendering: "pixelated" }}
              />
              <div>{l[0]}</div>
              <a
                href={l[1]}
                className="uppercase text-[#808080] tracking-normal underline"
              >
                {l[1].replace("https://", "")}
              </a>
            </div>
          ))}
        </div>
        {qrcodes.length <= 4 && (
          <div className="flex-auto flex items-end">
            <Contact />
          </div>
        )}
      </div>
      {qrcodes.length > 4 && (
        <div className="page flex flex-col justify-between">
          <Topbar>{obec.metadata.name}</Topbar>
          <Contact />
        </div>
      )}
    </div>
  );
};

export default Pdf;

const myFont = localFont({
  src: "./arial.ttf",
  display: "swap",
});

const getData = async (id: number) => {
  return await db
    .selectFrom("cities")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
};

const Topbar = ({ children }: { children: string }) => {
  return (
    <div className="flex justify-between border-b-[1px] border-black uppercase pb-6 tracking-[2.2px]">
      <div className="flex gap-4 items-center">
        {["Jak stavět v krajině", children].map((s, i) => (
          <div
            key={i}
            className="border-[1px] border-black rounded-full px-3 text-[11px] leading-0 py-[2px]"
          >
            {s}
          </div>
        ))}
      </div>
      <div className="bg-[#D9D9D9] text-[11px]  rounded-full w-6 h-6 flex items-center justify-center">
        <span className="pageNo" style={{ transform: "translateX(.8px)" }} />
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="relative w-full text-[12px]">
      <img
        src={"/static/pdf/cesky_kras_logo.png"}
        alt="CHKO Český kras logo"
        className="absolute right-0 bottom-0"
      />
      <h2>Kontakt</h2>
      <p>
        Správa CHKO Český kras
        <br />
        č. p. 85, 267 18 Karlštejn
        <br />
        Úřední hodiny všech pracovišť
        <br />
        pondělí, středa: 8–17 hod
        <br />
        951 42 4552, 951 42 4554
        <br />
        stredni.cechy@nature.cz
        <br />
        www.nature.cz/web/chko-cesky-kras
      </p>
    </div>
  );
};

const ACCESS_TOKEN =
  "pk.eyJ1IjoiYWxmb256IiwiYSI6ImNsZjZ2MDRoNTFxbTkzeW56a2sxYnk2MHQifQ.bp9byZzeMm71V2pGiLqfNA";
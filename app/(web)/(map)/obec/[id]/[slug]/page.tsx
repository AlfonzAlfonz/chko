import {
  Accordion,
  AccordionButton,
  AccordionContent,
} from "@/components/Accordion";
import { FigureImage } from "@/components/FigureImage";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { MapControllerComponent } from "@/components/Map/Map";
import { WithCaption } from "@/components/WithCaption";
import { Close } from "@/components/icons/Close";
import { db } from "@/lib/db";
import imgb1 from "@/public/static/DSC_0497-e1563521368513 1.png";
import imgb2 from "@/public/static/DSC_0497-e1563521368513 2.png";
import imgb3 from "@/public/static/DSC_0497-e1563521368513 3.png";
import imgb4 from "@/public/static/DSC_0497-e1563521368513 4.png";
import chkoimg from "@/public/static/cesky_kras_logo.png";
import Image from "next/image";
import Link from "next/link";
import "./obec.css";

const getData = async (id: number) => {
  return await db
    .selectFrom("cities")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
};

const Detail = async ({ params }: { params: { id: string } }) => {
  const obec = await getData(+params.id);

  if (!obec) return null;

  return (
    <div className="relative -mt-[85px] lg:-mt-[150px] z-[1000] bg-white">
      <MapControllerComponent {...obec.metadata} />
      <Link
        href="/mapa"
        className="text-5xl absolute top-4 right-4 lg:right-16 cursor-pointer font-bold shadow-lg rounded-full h-12 w-12 flex items-center justify-center"
      >
        <Close />
      </Link>
      <a
        className="button hidden lg:block fixed bottom-4 right-14 bg-[#2ECC71] text-white popisky-13 uppercase z-50"
        target="_blank"
        href={`/api/pdf/${obec.id}`}
      >
        Stáhnout pdf
      </a>
      <div className="lg:h-[150px] lg:container  items-center m">
        <h1 className="col-span-full lg:col-span-3 text-[30px] lg:text-[50px] shadow-lg lg:shadow-none px-4 py-5 lg:p-0">
          {obec.metadata.name}
        </h1>
        <table className="info-table col-span-full lg:col-span-2 mx-4 my-5 lg:m-0 popisky-13">
          <tbody>
            <tr>
              <td>Okres</td>
              <td>{obec.metadata.okres}</td>
            </tr>
            <tr>
              <td>Kraj</td>
              <td>{obec.metadata.kraj}</td>
            </tr>
            <tr>
              <td>První písemná zmínka</td>
              <td>{obec.data.foundedYear}</td>
            </tr>
            {obec.data.censuses.map(([year, people, houses]) => (
              <tr key={year}>
                <td>POČET OBYVATEL/DOMŮ V R. {year}</td>
                <td>
                  {people}/{houses}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="container">
        <div className="col-start-2 col-end-6">
          <FigureImage figure={obec.data.cover} />
        </div>
        <p className="container-content whitespace-pre-line col-start-2 col-end-6">
          {obec.data.intro}
        </p>
      </div>

      <Accordion className="container mt-8">
        <div className="col-span-1 relative">
          <Image
            src={chkoimg}
            alt="Logo CHKO Český Kras"
            className="absolute"
          />
        </div>
        <AccordionButton className="container-inner text-left">
          <h2 className="leading-none">{chko.name}</h2>
        </AccordionButton>
        <AccordionContent className="container-inner mb-8">
          {chko.lists.map((l, i) => (
            <div key={i} className="col-span-4 text-18">
              <h3 className="container-content uppercase p-5 border-b-[1px] border-black tracking-[4px]">
                {l.title}
              </h3>
              <ol className="ordered-list">
                {l.values.map((v, ii) => (
                  <li key={ii} className="p-5 border-b-[1px] border-black">
                    {v}
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <WithCaption
            className="col-span-2"
            caption="SKALNATÁ ÚDOLÍ A ZALESNĚNÉ VRCHY BEZ STAVEB"
          >
            <Image
              src={imgb1}
              alt="SKALNATÁ ÚDOLÍ A ZALESNĚNÉ VRCHY BEZ STAVEB"
            />
          </WithCaption>
          <WithCaption
            className="col-span-2"
            caption="VÁPENCOVÉ LOMY – SPOLEČNÉ PŮSOBENÍ ČLOVĚKA A PŘÍRODY"
          >
            <Image
              src={imgb2}
              alt="VÁPENCOVÉ LOMY – SPOLEČNÉ PŮSOBENÍ ČLOVĚKA A PŘÍRODY"
            />
          </WithCaption>
          <WithCaption
            className="col-span-2"
            caption="HISTORICKÉ DOMINANTY – KOSTELY, KLÁŠTER, HRAD"
          >
            <Image
              src={imgb3}
              alt="HISTORICKÉ DOMINANTY – KOSTELY, KLÁŠTER, HRAD"
            />
          </WithCaption>
          <WithCaption
            className="col-span-2"
            caption="SEMKNUTÉ VESNICE PODÉLNÝCH ZDĚNÝCH STATKŮ, LOUKY, ALEJE, SADY, POLE PASTVINY OKOLO"
          >
            <Image
              src={imgb4}
              alt="SEMKNUTÉ VESNICE PODÉLNÝCH ZDĚNÝCH STATKŮ, LOUKY, ALEJE, SADY, POLE PASTVINY OKOLO"
            />
          </WithCaption>
        </AccordionContent>
      </Accordion>

      <Accordion className="container">
        <AccordionButton className="container-inner text-left">
          <h2 className="leading-none">Převažující charakter výstavby</h2>
        </AccordionButton>
        <AccordionContent className="container-inner mb-8">
          <Gallery
            figures={obec.data.characteristics}
            className="col-span-full"
          />
        </AccordionContent>
      </Accordion>

      <Accordion className="container">
        <AccordionButton className="container-inner text-left">
          <h2 className="leading-none">
            Přítomnost památkově chráněných objektů
          </h2>
        </AccordionButton>
        <AccordionContent className="container-inner mb-8">
          <Gallery figures={obec.data.buildings} className="col-span-full" />
        </AccordionContent>
      </Accordion>

      <Accordion className="container">
        <div className="container-inner flex flex-col bg-[rgba(46,204,113,0.25)] border-b-[1px] border-black">
          <AccordionButton className="text-left">
            <h2 className="leading-none">
              Podmínky ochrany a doplňující doporučení
            </h2>
          </AccordionButton>
          <AccordionContent className="pb-7 mb-8">
            <ol className="ordered-list col-span-full">
              {obec.data.terms.map((v, ii) => (
                <li key={ii} className="p-5 border-b-[1px] border-black">
                  {v}
                </li>
              ))}
            </ol>
            <p className="container-content col-span-full">
              Je dobré si předem zjistit, zda zamýšlený stavební záměr je v
              souladu s územním plánem (viz webové stránky obce). Zároveň
              doporučujeme ještě před započetím projekčních prací konzultovat
              svůj záměr na správě CHKO – je vhodné mít s sebou alespoň zákres
              půdorysu do situace, tj. umístění stavby v katastrální mapě, a
              hmotovou skicu, tj. siluetu stavby ve vybrané fotografii z
              charakteristického pohledu ukazujícího její působení v krajině.
            </p>

            <div className="container-content col-span-full flex mt-9 px-4">
              <a
                className="button flex-auto lg:flex-initial"
                href="https://example.com"
              >
                DALŠÍ INFORMACE KE STAVEBNÍ ČINNOSTI
              </a>
            </div>
          </AccordionContent>
        </div>
      </Accordion>

      <div className="container">
        <div className="container-inner">
          <div className="container-content flex flex-col lg:flex-row col-span-full items-center gap-5 py-9">
            {obec.data.links.map(([label, href], i) => (
              <a key={i} className="button lg:flex" href={href} target="_blank">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-12">
        <a
          className="button lg:hidden bg-[#2ECC71] text-white popisky-13 uppercase z-50"
          target="_blank"
          href="/static/svaty-jan-pod-skalou.pdf"
        >
          Stáhnout pdf
        </a>
      </div>

      <Footer>
        <p className="whitespace-pre-line py-12">
          {`Správa CHKO Český kras
č. p. 85, 267 18 Karlštejn

Úřední hodiny všech pracovišť
pondělí, středa: 8–17 hod

951 42 4552, 951 42 4554
stredni.cechy@nature.cz
www.nature.cz/web/chko-cesky-kras`}
        </p>
      </Footer>
    </div>
  );
};

export default Detail;

const chko = {
  name: "CHKO Český kras",
  lists: [
    {
      title: "CO JE TYPICKÉ?",
      values: [
        "Okolo vesnic volná zemědělská krajina pastvin, luk, polí, sadů, polních cest, lesů",
        "Sevřené menší vesnice posazené mezi kopci se zděnými podélnými statky a střechami z pálených tašek",
        "Bez roztroušených staveb po okolí (mlýny, hájovny apod. výjimečně)",
        "Dominanty kostelů, hradu",
      ],
    },
    {
      title: "NAVAZUJEME NA TRADICE",
      values: [
        "Nezastavět horizonty",
        "Stavět (vymezovat zastavitelná území) jen v přímé návaznosti na obce",
        "Nezakrýt historické dominanty",
        "Opravy starých domů nebo novostavby držící tvar a vzhled statků, které jsou ve vesnicích okolo",
      ],
    },
  ],
};

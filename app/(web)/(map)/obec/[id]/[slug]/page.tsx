import {
  Accordion,
  AccordionButton,
  AccordionContent,
} from "@/components/Accordion";
import { FigureImage } from "@/components/FigureImage";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { MapControllerComponent } from "@/components/Map/Map";
import { Close } from "@/components/icons/Close";
import { db } from "@/lib/db";
import ceskyKrasLogo from "@/public/static/cesky_kras_logo.png";
import krivoLogo from "@/public/static/krivoklatsko_logo.png";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "./obec.css";

export const dynamic = "error";
export const dynamicParams = true;
export const revalidate = 30;

export const generateStaticParams = async () => {
  return await db
    .selectFrom("cities")
    .select(["id", "slug"])
    .execute()
    .then((ids) =>
      ids.map((i) => ({
        id: String(i.id),
        slug: i.slug,
      }))
    );
};

const getData = async (id: number) => {
  if (!id) return undefined;

  const obec = await db
    .selectFrom("cities")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();

  if (!obec) return undefined;

  const chko = await db
    .selectFrom("chkos")
    .where("id", "=", obec.chko)
    .selectAll()
    .executeTakeFirst();

  if (!chko) return undefined;

  return {
    ...obec,
    chko,
  };
};

const Detail = async ({ params }: { params: { id: string } }) => {
  const obec = await getData(+params.id);

  if (!obec) notFound();

  const chko = obec.chko;

  return (
    <div className="relative -mt-[85px] lg:-mt-[150px] z-[1000] bg-white">
      <MapControllerComponent {...obec.metadata} />
      {/* TODO: maybe add md:static */}
      <div className="sticky top-0 right-0 lg:right-16 pointer-events-none z-[9001]">
        <Link
          href="/mapa"
          className={`
            absolute right-4 top-4 lg:right-16
            flex items-center justify-center
            text-5xl cursor-pointer font-bold
            shadow-lg rounded-full
            h-12 w-12 z-[50000]
            pointer-events-auto
        `}
        >
          <Close />
        </Link>
      </div>
      <a
        className="button button-green hidden lg:block fixed bottom-4 right-14 popisky-13 uppercase z-50"
        target="_blank"
        href={`/api/pdf/${obec.id}/${obec.slug}`}
      >
        Stáhnout pdf
      </a>
      <div
        className="sticky top-0 md:static bg-white lg:h-[150px] lg:container items-center z-[9000]"
        id="obec"
      >
        <h1
          className={`
            col-span-full lg:col-span-3
            text-[30px] lg:text-[50px]
            shadow-lg lg:shadow-none
            px-4 py-5 lg:p-0
          `}
        >
          {obec.metadata.name}
        </h1>
        <table className="hidden md:block info-table col-span-full lg:col-span-2 mx-4 my-5 lg:m-0 popisky-13">
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
      <table className="block md:hidden info-table col-span-full lg:col-span-2 mx-4 my-5 lg:m-0 popisky-13">
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
      <div className="container">
        <div className="col-start-2 col-end-6">
          <FigureImage
            figure={obec.data.cover}
            captionClassName="max-sm:!static max-sm:!mx-0 max-sm:!mt-[10px]"
          />
        </div>
        <p className="container-content whitespace-pre-line col-start-2 col-end-6">
          {obec.data.intro}
        </p>
      </div>
      <Accordion className="container mt-8">
        {chko.id === 1 && (
          <div className="col-span-1 relative">
            <Image
              src={ceskyKrasLogo}
              alt={`Logo CHKO ${chko.name}`}
              className="absolute"
            />
          </div>
        )}
        {chko.id === 3 && (
          <div className="col-span-1 relative mx-4">
            <Image
              src={krivoLogo}
              alt={`Logo CHKO ${chko.name}`}
              className="absolute"
            />
          </div>
        )}
        <AccordionButton className="container-inner text-left">
          <h2 className="leading-none">{chko.name}</h2>
        </AccordionButton>
        <AccordionContent className="container-inner mb-8">
          {[
            { title: "CO JE TYPICKÉ?", values: chko.data.list1 },
            { title: "NAVAZUJEME NA TRADICE", values: chko.data.list2 },
          ].map((l, i) => (
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

          {chko.data.figures.map((f) => (
            <FigureImage
              key={f.url}
              figure={f}
              className="col-span-full md:!col-span-2"
              imgClassName="aspect-square object-cover"
              captionClassName="max-sm:!static max-sm:!mx-0 max-sm:!mt-[10px]"
            />
          ))}
        </AccordionContent>
      </Accordion>
      {obec.data.characteristics.length > 0 && (
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
      )}
      {obec.data.buildings.length > 0 && (
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
      )}
      {(obec.data.terms.length || obec.data.termsText) && (
        <Accordion className="container">
          <div className="container-inner flex flex-col bg-[rgba(46,204,113,0.25)] border-b-[1px] border-black">
            <AccordionButton className="text-left">
              <h2 className="leading-none">
                Podmínky ochrany a doplňující doporučení
              </h2>
            </AccordionButton>
            <AccordionContent className="pb-7 mb-8">
              <div className="max-w-[910px] border-t-[1px] border-black">
                <ol className="ordered-list col-span-full white">
                  {obec.data.terms.map((v, ii) => (
                    <li key={ii} className="p-5 border-b-[1px] border-black">
                      {v}
                    </li>
                  ))}
                </ol>
                {obec.data.termsText && (
                  <p className="px-3 md:px-6 col-span-full mt-5">
                    {obec.data.termsText}
                  </p>
                )}

                {obec.data.termsButton?.[0] && obec.data.termsButton[1] && (
                  <div className="container-content col-span-full flex mt-9 px-4">
                    <a
                      className="button flex-auto lg:flex-initial"
                      href={obec.data.termsButton[1]}
                      target="_blank"
                    >
                      {obec.data.termsButton[0]}
                    </a>
                  </div>
                )}
              </div>
            </AccordionContent>
          </div>
        </Accordion>
      )}
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
          className="button button-green lg:hidden popisky-13 uppercase z-50"
          target="_blank"
          href={`/api/pdf/${obec.id}/${obec.slug}`}
        >
          Stáhnout pdf
        </a>
      </div>
      <Footer>
        <p className="whitespace-pre-line py-12">{chko.data.contact}</p>
      </Footer>
    </div>
  );
};

export default Detail;

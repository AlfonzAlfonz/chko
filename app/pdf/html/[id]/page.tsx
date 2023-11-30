/* eslint-disable @next/next/no-img-element */
import { FigureImage } from "@/components/FigureImage";
import { db } from "@/lib/db";
import "./pdf.css";
import { PdfFigureImage } from "@/components/PdfFigureImage";
import QRCode from "qrcode";

const Pdf = async ({ params }: { params: { id: string } }) => {
  const obec = await getData(+params.id);

  if (!obec) return null;

  const qrcodes = await Promise.all(
    obec.data.links.map((l) =>
      QRCode.toDataURL(l[1]).then((url) => [l[0], l[1], url] as const)
    )
  );

  return (
    <div className="pdf">
      <div className="page exact flex flex-col justify-between">
        <div>
          <h1>Jak stavět v krajině</h1>
          <table>
            <tbody>
              <tr>
                <td>Obec</td>
                <td>Svatý jan pod skalou</td>
              </tr>
              <tr>
                <td>CHKO</td>
                <td>Český kras</td>
              </tr>
            </tbody>
          </table>
        </div>
        <FigureImage figure={obec?.data.cover} imgClassName="aspect-auto" />
      </div>
      <div className="page">
        <Topbar>{obec.metadata.name}</Topbar>
        <h1>Proč a jak krajinný ráz</h1>
        <div className="flex">
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
      </div>
      <div className="page">
        <Topbar>{obec.metadata.name}</Topbar>
        <h1>Chráněná krajiná oblast</h1>
        <div className="flex">
          <div className="flex-1">
            Asi jen jednu sedminu území státu tvoří tzv. chráněné krajinné
            oblasti (CHKO). To jsou území, která se navzdory překotné
            modernizaci a industrializaci podařilo zachovat lépe než jiná.
            Udržet tato území v jejich tradiční podobě je ve veřejném, zákony
            posvěceném zájmu. Proto se v CHKO na ochranu krajinného rázu dbá
            více než jinde. A to i při schvalování stavební činnosti. Ačkoli
            usměrňování výstavby předsta- vuje pro jednotlivé stavebníky určitá
            omezení, v širších souvislostech jde o důležitou veřejnou službu pro
            stávající obyvatele i návštěvníky.
          </div>
          <div className="flex-1">
            Obecně platí, že stavby v CHKO by měly zapa- dat do svého okolí.
            Neměly by na sebe lacině upozorňovat, vyčnívat a trčet. Žádoucí jsou
            stavby decentní, vycházející z místních tradic a tvarů. Ideální jsou
            opravy starých staveb. Nové stavby jsou přijatelné, ale ne kdekoli a
            ne takové, které by se vzpouzely dlouhodobě for- movanému charakteru
            místa a okolních staveb. Nakolik architektura souvisí se způsobem
            živo- ta, bydlení v CHKO je především pro ty, kteří mají zájem o
            skromný a jednoduchý venkovský život. Okázalé, velkorysé nebo
            provokativní stavby, byť i esteticky a architektonicky hod- notné,
            se do těchto oblastí nehodí. Kdo stojí o takový dům (a život), měl
            by si raději pořídit pozemek mimo CHKO.
          </div>
        </div>
      </div>
      <div className="page">
        <Topbar>{obec.metadata.name}</Topbar>
        <h1>CHKO Český kras</h1>
        <div className="flex">
          <div className="flex-1">
            <h2>Co je typické</h2>
            ...
          </div>
          <div className="flex-1">
            <h2>Navazujme na tradice</h2>
            ...
          </div>
        </div>
      </div>
      <div className="page">
        <Topbar>{obec.metadata.name}</Topbar>
        <h1>Svatý jan pod skalou</h1>
        <p className="columns-2">{obec.data.intro}</p>
      </div>
      <div className="page">
        <Topbar>{obec.metadata.name}</Topbar>
        <h1>Převažující charakter výstavby</h1>
        {obec.data.characteristics.map((f, i) => (
          <PdfFigureImage key={i} figure={f} />
        ))}
      </div>
      <div className="page">
        <Topbar>{obec.metadata.name}</Topbar>
        <h1>Přítomnost památkově chráněných objektů</h1>
        {obec.data.buildings.map((f, i) => (
          <PdfFigureImage key={i} figure={f} />
        ))}
      </div>
      <div className="page">
        <Topbar>{obec.metadata.name}</Topbar>
        <h1>Podmínky ochrany a doplňující doporučení</h1>
      </div>
      <div className="page">
        <Topbar>{obec.metadata.name}</Topbar>
        <h1>Další informace</h1>
        <div className="flex flex-wrap">
          {qrcodes.map((l, i) => (
            <div key={i}>
              <img src={l[2]} alt={l[1]} />
              <div>{l[0]}</div>
              <div>{l[1]}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="page">
        <Topbar>{obec.metadata.name}</Topbar>
        Kontakt
      </div>
    </div>
  );
};

export default Pdf;

const getData = async (id: number) => {
  return await db
    .selectFrom("cities")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
};

const Topbar = ({ children }: { children: string }) => {
  return (
    <div className="flex justify-between border-b-[1px] border-black py-4">
      <div className="flex gap-4">
        {["Jak stavět v krajině", children].map((s, i) => (
          <div key={i} className="border-[1px] border-black rounded-full px-3">
            {s}
          </div>
        ))}
      </div>
      <div className="pageNo bg-chkosearch w-6 h-6 flex items-center justify-center rounded-full"></div>
    </div>
  );
};

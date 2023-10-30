import { Footer } from "@/components/Footer";
import { MapControllerComponent } from "@/components/Map/Map";
import { WithCaption } from "@/components/WithCaption";
import { db } from "@/lib/db";
import imga1 from "@/public/static/552187f7-7937-4f97-9d02-1ba38f32729d 1.png";
import imgb1 from "@/public/static/DSC_0497-e1563521368513 1.png";
import imgb2 from "@/public/static/DSC_0497-e1563521368513 2.png";
import imgb3 from "@/public/static/DSC_0497-e1563521368513 3.png";
import imgb4 from "@/public/static/DSC_0497-e1563521368513 4.png";
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

const Detail = async ({ params }: { params: { id: string } }) => {
  const obec = await getData(+params.id);

  if (!obec) return null;

  return (
    <div className="relative">
      <MapControllerComponent {...obec.metadata} />
      <Link
        href="/mapa"
        className="text-5xl absolute top-4 right-16 cursor-pointer font-bold"
      >
        ╳
      </Link>
      <div className="h-[150px] container items-center m">
        <h1 className="nadpis-50 col-span-3">{obec.metadata.name}</h1>
        <table className="info-table col-span-2">
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
          <Image src={imga1} alt="img1" />
        </div>
        <p className="container-content whitespace-pre-line col-start-2 col-end-6">
          {`Menší sídlo situované v sevřeném údolí Loděnice, do jednoho z krajinářsky nejcennějších prostorů v rámci CHKO s velmi markantně vnímatelnými znaky fenoménu krasového reliéfu. Vizuální uplatnění zástavby sídla nastává v dílčím úseku údolí.

Nepříliš rozlehlou zástavbu v sevřeném prostoru ovládá dominanta barokního areálu benediktinského kláštera sestávající z budovy konventu, kostela Narození sv. Jana Křtitele, klášterní zahrady a ohradní zdi, lokalizovaná pod vysokou obnaženou vápencovou stěnou. V dolní části zástavby stojí, převážně na pravém břehu, větší hmoty objektů bývalé školy (dnes hotelu), patrový dům (součást hospodářského zázemí kláštera) či obecního úřadu doplněné dalšími objekty menšího měřítka.

Výše položená část sídla má charakter nesouvislé údolní zástavby převážně přízemních objektů většinou s podélnou orientací. Tato část zástavby prošla z větší části zřetelnými rekonstrukcemi, část objektů si uchovala původní výraz. Dominantním prvkem zde je neogotická hřbitovní kaple. Zástavbu na horním konci uzavírá patrová vilová hmota.

Cennou historickou stavbou je barokní kaple nacházející se na vyvýšenině severně od kostela.

Kromě výše uvedené jedinečné morfologie projev sídla spoluutváří souvislá lesní zeleň navazující na zástavbu prakticky po celém obvodu.`}
        </p>
      </div>

      <div className="container">
        <div className="container-inner">
          <h2 className="container-content col-span-4 nadpis-50">
            {chko.name}
          </h2>

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
        </div>
      </div>

      <div className="container">
        <div className="container-inner popisky-13">
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
        </div>
      </div>

      <div className="container">
        <div className="container-inner">
          <h2 className="container-content col-span-full nadpis-50">
            Převažující charakter výstavby
          </h2>
        </div>
      </div>

      <div className="container">
        <div className="container-inner">
          <h2 className="container-content col-span-full nadpis-50">
            Přítomnost památkově chráněných objektů
          </h2>
        </div>
      </div>

      <div className="container">
        <div className="container-inner pb-7 bg-[rgba(46,204,113,0.25)]">
          <h2 className="container-content col-span-full nadpis-50">
            Podmínky ochrany a doplňující doporučení
          </h2>
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
            doporučujeme ještě před započetím projekčních prací konzultovat svůj
            záměr na správě CHKO – je vhodné mít s sebou alespoň zákres půdorysu
            do situace, tj. umístění stavby v katastrální mapě, a hmotovou
            skicu, tj. siluetu stavby ve vybrané fotografii z charakteristického
            pohledu ukazujícího její působení v krajině.
          </p>

          <div className="container-content col-span-full flex">
            <a className="button" href="https://example.com">
              DALŠÍ INFORMACE KE STAVEBNÍ ČINNOSTI
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="container-inner">
          <div className="container-content flex gap-5 py-9">
            {obec.data.links.map(([label, href], i) => (
              <a key={i} className="button" href={href}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Footer>
        <p className="whitespace-pre-line py-12">
          {`Správa CHKO Český kras
č. p. 85, 267 18 Karlštejn

Úřední hodiny všech pracovišť
pondělí, středa: 8–17 hod​​​​​

951 42 4552, 951 42 4554
stredni.cechy@nature.cz
www.nature.cz/web/chko-cesky-kras`}
        </p>
      </Footer>
    </div>
  );
};

export default Detail;

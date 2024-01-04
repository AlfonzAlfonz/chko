import { HomepageSearch } from "@/components/HomepageSearch";
import { Chevron } from "@/components/icons/Chevron";
import group35 from "@/public/static/Group 35.svg";
import krajraz1 from "@/public/static/Vinarice_nadhled 3.png";
import krajraz2 from "@/public/static/Vinarice_nadhled 4.png";
import logoLand from "@/public/static/logo_land.svg";
import logoTitle from "@/public/static/logo_title.svg";
import hostimTresina from "@/public/static/Hostim_Tresina-DSCF9873_panorama_JPrach.jpg";
import whyEndImg from "@/public/static/IMGP8789_zRAWu.jpg";
import Image from "next/image";
import "./home.css";
import Link from "next/link";

const Home = async () => {
  return (
    <div className="homepage">
      <div
        className="flex flex-col justify-between container first px-0 lg:px-10"
        id="uvod"
      >
        <h1
          className={`
            col-span-full lg:h-[208px]
            flex flex-col lg:flex-row gap-9 w-full items-center justify-center  
            text-white`}
        >
          <span className="flex lg:hidden text-[37px] text-center">
            Jak stavět{"\n"} v&nbsp;krajině
          </span>
          <Image
            src={logoLand}
            alt="logo"
            className="h-full w-[120px] lg:w-[317px]"
          />
          <div className="h-full items-center pt-8 hidden lg:flex flex-grow">
            <Image
              src={logoTitle}
              alt="Jak stavět v krajině"
              className="w-full"
            />
          </div>
        </h1>
        <div className="max-w-[650px] mx-auto px-8 text-center text-white flex flex-col gap-12 items-center text-18">
          Tato webová stránka obsahuje informace o krajinném rázu obcí
          v&nbsp;chráněných krajinných oblastech Český kras a Křivoklátsko.
          Stačí vyhledat tu, která Vás zajímá.
          <a
            href="#vyhledavani"
            className="button button-green w-12 h-12 pointer-events-auto p-0 flex items-center justify-center shadow-md rotate-180"
          >
            <Chevron color="white" />
          </a>
        </div>
      </div>

      <div
        className="relative container min-h-[100vh] bg-chkobg py-16"
        id="vyhledavani"
      >
        <div className="col-span-full"></div>
        <div className="col-span-full flex items-center justify-center flex-col w-full px-4">
          <HomepageSearch />
        </div>
        <div className="col-span-full flex items-center justify-end flex-col w-full px-4">
          <p className="mt-4 mb-6">Proč ochrana krajinného rázu?</p>
          <a
            href="#why"
            className="button w-12 h-12 pointer-events-auto p-0 flex items-center justify-center bg-transparent hover:bg-transparent rotate-180 border border-black shadow-none"
          >
            <Chevron color="black" />
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="sticky top-0 w-full inline-block z-50">
          <Link
            href="/mapa"
            className="absolute right-0 button uppercase inline-flex mr-2 lg:mr-8 mt-2 lg:mt-8 items-center gap-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <span>Mapa</span> <img src="/static/cz.svg" />
          </Link>
        </div>
        <div
          className="max-w-[1220px] m-auto text-center px-4 pt-16 lg:pt-32 relative"
          id="why"
        >
          <h2 className="podnadpis-40 lg:nadpis-80">
            Proč a jak krajinný&nbsp;ráz?
          </h2>
          <p className="text-16 lg:text-32 pt-8 lg:pt-20">
            Patří k dobrému životu, že můžeme pobývat v prostředí, které se nám
            líbí a blahodárně na nás působí. Silou zákona proto bráníme takovým
            stavebním a jiným zásahům, které necitlivě proměňují, nebo dokonce
            ohrožují charakter místní krajiny. Jde zejména o typické tvary a
            proporce, barvy, charakteristické pohledy či kulturní formy.
            Takovému ohledu při vytváření nových hodnot říkáme ochrana
            krajinného&nbsp;rázu.
          </p>
        </div>

        <div className="container max-w-[1900px] mx-auto py-8 lg:py-20 lg:gap-y-0 px-4">
          <p className="col-span-full text-center popisky-13 pb-8 lg:pb-20">
            RŮZNÉ CHARAKTERY KRAJIN A TOMU ODPOVÍDAJÍCÍ URBANISTICKÉ STRUKTURY:
          </p>
          <div className="col-span-full lg:col-span-3">
            {/* TODO: captions */}
            <Image
              src={krajraz1}
              alt="1) KOMPAKTNÍ VESNICE S NÁVSÍ V NÍŽINNÝCH OBLASTECH"
              style={{ width: "100%" }}
            />
            <p className="px-4 mt-2 popisky-13">
              1) KOMPAKTNÍ VESNICE S NÁVSÍ V NÍŽINNÝCH OBLASTECH
            </p>
          </div>
          <div className="col-span-full lg:col-span-3">
            <Image
              src={krajraz2}
              alt="2) ROZVODNĚNÁ ZÁSTAVBA CHALUP TYPICKÁ PRO HORSKÉ OBLASTI"
              style={{ width: "100%" }}
            />
            <p className="px-4 mt-2 popisky-13">
              2) ROZVODNĚNÁ ZÁSTAVBA CHALUP TYPICKÁ PRO HORSKÉ OBLASTI
            </p>
          </div>
        </div>

        <div className="max-w-[1220px] m-auto text-center px-4 pb-16 lg:pb-32">
          <p className="text-16 lg:text-32">
            Posuzujeme-li nějaký stavební záměr z hlediska ochrany krajinného
            rázu, nejde to dělat všude stejně a podle stejných kritérií. Je
            zásadní, kde přesně se má stavět. Co se může schovat někde v údolí
            či ve skrytu stromů, nebo i pozitivně vyniknout tam, kde už novější
            zástavba je, působí na vesnické návsi nebo na vrcholu kopce velmi
            rušivě, nevhodně. To se týká jak architektonických detailů (např.
            větší okno), tak celkové hmoty či tvaru budov (např. plochá
            střecha).
          </p>
        </div>

        <div className="h-[566px] lg:h-[1350px] w-full relative overflow-hidden">
          <Image
            src={whyEndImg}
            alt=""
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-full w-[1000px] lg:w-[2980px] h-auto max-w-none"
          />
        </div>

        <div className="bg-chkobg text-center">
          <div className="max-w-[1220px] m-auto text-center px-4 pt-16 lg:pt-32">
            <h2 className="podnadpis-40 lg:nadpis-80">
              Chráněná krajinná oblast
            </h2>
            <p className="text-16 lg:text-32 my-8 lg:my-16">
              Asi jen jednu sedminu území státu tvoří tzv. Chráněné krajinné
              oblasti (CHKO). To jsou území, která se navzdory překotné
              modernizaci a industrializaci podařilo zachovat lépe než jiná a
              která chceme v jejich tradiční podobě zachovat i nadále. To
              především znamená pečovat o přírodu a venkov v jejich vzájemném
              prolínání.
            </p>
          </div>
          <Image src={group35} alt="" className="mx-auto" />
          <div className="max-w-[1220px] m-auto text-center px-4 py-16 lg:py-32">
            <p className="text-16 lg:text-24">
              Na ochranu krajinného rázu se při schvalování stavební činnosti
              v CHKO dbá výrazněji než jinde. Ačkoli toto usměrňování výstavby
              představuje pro jednotlivé stavebníky určitá omezení, v širších
              souvislostech jde o důležitou veřejnou službu pro stávající
              obyvatele i návštěvníky.
            </p>
          </div>
        </div>
        <div className="h-[288px] lg:h-[1370px] w-full relative overflow-hidden">
          <Image
            src={hostimTresina}
            alt=""
            className="absolute bottom-0 right-[20%] translate-x-[20%]  min-w-full w-[1200px] lg:w-[3200px] h-auto max-w-none"
          />
        </div>

        <footer className="h-[305px] bg-black flex justify-center items-center">
          <a
            href="#uvod"
            className="button w-12 h-12 pointer-events-auto p-0 flex items-center justify-center shadow-md border bg-transparent hover:bg-transparent border-white border-solid"
          >
            <Chevron color="white" />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Home;

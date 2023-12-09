import { HomepageSearch } from "@/components/HomepageSearch";
import group35 from "@/public/static/Group 35.svg";
import krajraz1 from "@/public/static/Vinarice_nadhled 3.png";
import krajraz2 from "@/public/static/Vinarice_nadhled 4.png";
import logoLand from "@/public/static/logo_land.svg";
import logoTitle from "@/public/static/logo_title.svg";
import pexelsJaro from "@/public/static/pexels-jaro.png";
import pexelsThimm from "@/public/static/pexels-volker-thimm-9957840.png";
import Image from "next/image";
import Link from "next/link";
import "./home.css";

const Home = async () => {
  return (
    <div className="homepage">
      <div className="flex items-start container h-[100vh] first px-0 lg:px-10">
        <h1
          className={`
            col-span-full lg:h-[208px]
            flex flex-col lg:flex-row gap-9 w-full items-center justify-center  
            text-white`}
        >
          <span className="flex lg:hidden text-[70px] text-center">
            Jak stavět{"\n"} v&nbsp;krajině
          </span>
          <Image src={logoLand} alt="logo" className="h-full" />
          <div className="h-full items-center pt-8 hidden lg:flex flex-grow">
            <Image
              src={logoTitle}
              alt="Jak stavět v krajině"
              className="w-full"
            />
          </div>
        </h1>
      </div>

      <div className="relative container h-[100vh] bg-chkobg">
        <Link
          href="/mapa"
          className="button uppercase flex absolute top-0 right-0 mr-8 mt-8 items-center gap-2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          Mapa <img src="/static/cz.svg" />
        </Link>
        <div className="col-span-full flex items-center justify-center flex-col w-full px-4">
          <HomepageSearch />
        </div>
      </div>

      <div className="max-w-[1220px] m-auto text-center px-4">
        <h2 className="mt-[67px] lg:mt-[120px] podnadpis-40 lg:nadpis-80">
          Proč a jak krajinný ráz?
        </h2>
        <p className="mt-6 text-16 lg:text-32">
          Patří k dobrému životu, že můžeme pobývat v prostředí, které se nám
          líbí a blahodárně na nás působí. Silou zákona proto bráníme takovým
          stavebním a jiným zásahům, které necitlivě proměňují, nebo dokonce
          ohrožují charakter místní krajiny. Jde zejména o typické tvary a
          proporce, barvy, charakteristické pohledy či kulturní formy. Takovému
          ohledu při vytváření nových hodnot říkáme ochrana krajinného rázu.
        </p>
      </div>

      <div className="container mt-2 lg:mt-32 max-w-[1900px] mx-auto">
        <div className="col-span-full lg:col-span-3">
          {/* TODO: captions */}
          <Image src={krajraz1} alt="TODO:" />
          <p className="px-4 mt-2 popisky-13">
            RŮZNÉ CHARAKTERY KRAJIN A TOMU ODPOVÍDAJÍCÍ URBANISTICKÉ STRUKTURY:
            <br />
            1&#41; KOMPAKTNÍ VESNICE S NÁVSÍ V NÍŽINNÝCH OBLASTECH
          </p>
        </div>
        <div className="col-span-full lg:col-span-3">
          <Image src={krajraz2} alt="TODO:" />
          <p className="px-4 mt-2 popisky-13">
            2&#41; ROZVODNĚNÁ ZÁSTAVBA CHALUP TYPICKÁ PRO HORSKÉ OBLASTI
          </p>
        </div>
      </div>

      <div className="max-w-[1220px] m-auto text-center px-4">
        <p className="my-8 lg:my-64 text-16 lg:text-32">
          Posuzujeme-li nějaký stavební záměr z hlediska ochrany krajinného
          rázu, nejde to dělat všude stejně a podle stejných kritérií. Je
          zásadní, kde přesně se má stavět. Co se může schovat někde v údolí či
          ve skrytu stromů, nebo i pozitivně vyniknout tam, kde už novější
          zástavba je, působí na vesnické návsi nebo na vrcholu kopce velmi
          rušivě, nevhodně. To se týká jak architektonických detailů (např.
          větší okno), tak celkové hmoty či tvaru budov (např. plochá střecha).
        </p>
      </div>

      <div className="h-[100vh] w-full relative overflow-hidden">
        <Image
          src={pexelsThimm}
          alt=""
          className="absolute top-0 bottom-0 min-w-full w-[1980px] h-auto max-w-none left-[50%] translate-x-[-50%]"
        />
      </div>

      <div className="bg-chkobg text-center">
        <div className="max-w-[1220px] m-auto text-center px-4 pt-8">
          <h2 className="lg:mt-[120px] podnadpis-40 lg:nadpis-80">
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
        <div className="max-w-[1220px] m-auto text-center px-4 pt-8">
          <p className="text-16 lg:text-32 py-8 lg:py-32">
            Na ochranu krajinného rázu se při schvalování stavební činnosti
            v CHKO dbá výrazněji než jinde. Ačkoli toto usměrňování výstavby
            představuje pro jednotlivé stavebníky určitá omezení, v širších
            souvislostech jde o důležitou veřejnou službu pro stávající
            obyvatele i návštěvníky.
          </p>
        </div>
      </div>

      <div className="h-[700px] lg:h-[1500px] w-full relative overflow-hidden">
        <Image
          src={pexelsJaro}
          alt=""
          className="absolute top-0 bottom-0 min-w-full w-[1980px] h-auto max-w-none left-[50%] translate-x-[-50%]"
        />
      </div>

      <footer className="h-[305px] bg-black"></footer>
    </div>
  );
};

export default Home;

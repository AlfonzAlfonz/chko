import { HomepageSearch } from "@/components/HomepageSearch";
import krajraz1 from "@/public/static/Vinarice_nadhled 3.png";
import krajraz2 from "@/public/static/Vinarice_nadhled 4.png";
import logoLand from "@/public/static/logo_land.svg";
import logoTitle from "@/public/static/logo_title.svg";
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
            flex flex-col lg:flex-row gap-9 w-full items-center justify-between  
            text-white`}
        >
          <span className="flex lg:hidden text-[70px] text-center">
            Jak stavět{"\n"} v krajině
          </span>
          <Image src={logoLand} alt="logo" className="h-full" />
          <div className="h-full items-center pt-8 hidden lg:flex">
            <Image src={logoTitle} alt="Jak stavět v krajině" />
          </div>
        </h1>
      </div>

      <div className="relative container h-[100vh] bg-chkobg">
        <div className="col-span-full lg:col-start-2 lg:col-span-4 flex items-center justify-center flex-col">
          <Link
            href="/mapa"
            className="button uppercase flex absolute top-0 right-0 mr-8 mt-8 items-center gap-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            Mapa <img src="/static/cz.svg" />
          </Link>
          <HomepageSearch />
        </div>
      </div>

      <div className="container h-[100vh]">
        <div className="col-span-full">
          <h2 className="mt-32 nadpis-80 text-center">
            Proč a jak krajinný ráz?
          </h2>
          <p>
            Patří k dobrému životu, že můžeme pobývat v prostředí, které se nám
            líbí a blahodárně na nás působí. Silou zákona proto bráníme takovým
            stavebním a jiným zásahům, které necitlivě proměňují, nebo dokonce
            ohrožují charakter místní krajiny. Jde zejména o typické tvary a
            proporce, barvy, charakteristické pohledy či kulturní formy.
            Takovému ohledu při vytváření nových hodnot říkáme ochrana
            krajinného rázu.
          </p>
        </div>

        <div className="col-span-3">
          <Image src={krajraz1} alt="TODO:" />
        </div>
        <div className="col-span-3">
          <Image src={krajraz2} alt="TODO:" />
        </div>
      </div>
    </div>
  );
};

export default Home;

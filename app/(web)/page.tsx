import { ObecSearch } from "@/components/Autocomplete/ObecSearch";
import krajraz1 from "@/public/static/Vinarice_nadhled 3.png";
import krajraz2 from "@/public/static/Vinarice_nadhled 4.png";
import logo from "@/public/static/logo.svg";
import Image from "next/image";
import "./home.css";
import Link from "next/link";

const Home = async () => {
  return (
    <div>
      <div className="flex items-start container h-[100vh] first">
        <h1 className="flex w-full items-center justify-between text-[70px] xl:text-[130px] 3xl:text-[180px] text-white col-span-full">
          <Image src={logo} alt="logo" />
          Jak stavět v krajině
        </h1>
      </div>
      <div className="relative container h-[100vh]">
        <div className="col-start-2 col-span-4 flex items-center justify-center flex-col">
          <Link
            href="/mapa"
            className="button uppercase flex absolute top-0 right-0 mr-8 mt-8 items-center gap-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            Mapa <img src="/static/cz.svg" />
          </Link>
          <ObecSearch inner={{ input: { className: "search" } }} />
          <button className="button mt-16">Vyhledat</button>
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

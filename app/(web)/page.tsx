import { ObecSearch } from "@/components/Autocomplete/ObecSearch";
import { db } from "@/lib/db";
import krajraz1 from "@/public/static/Vinarice_nadhled 3.png";
import krajraz2 from "@/public/static/Vinarice_nadhled 4.png";
import logo from "@/public/static/logo.svg";
import Image from "next/image";
import "./home.css";

const getData = async () => {
  return await db
    .selectFrom("cities")
    .select(["id", "metadata", "slug"])
    .execute();
};

const Home = async () => {
  const data = await getData();

  return (
    <div>
      <div className="flex items-start container h-[100vh] first">
        <h1 className="flex w-full items-center justify-between text-[70px] xl:text-[130px] 3xl:text-[180px] text-white col-span-full">
          <Image src={logo} alt="logo" />
          Jak stavět v krajině
        </h1>
      </div>
      <div className="container h-[100vh]">
        <div className="col-start-2 col-span-4 flex items-center justify-center flex-col">
          <ObecSearch
            options={data.map((o) => ({
              value: o.id,
              label: o.metadata.name,
              slug: o.slug,
            }))}
          />
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

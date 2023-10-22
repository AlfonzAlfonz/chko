import dynamic from "next/dynamic";
import { Map } from "@/components/Map/Map";

export default function Layout() {
  return (
    <div className="h-[100vh]">
      <Map />
    </div>
  );
}

import { FigureData } from "@/lib/db";
import Image from "next/image";
import { WithCaption } from "./WithCaption";
import { ComponentProps } from "react";

export const FigureImage = ({
  figure,
  ...divProps
}: {
  figure: FigureData;
} & ComponentProps<"div">) => {
  const image = (
    <Image
      key={figure.url}
      src={figure.url}
      width={figure.width}
      height={figure.height}
      alt={figure.caption}
      className="w-full bg-black aspect-[3/2] object-contain"
    />
  );

  return (
    <div {...divProps}>
      {figure.caption ? (
        <WithCaption caption={figure.caption}>{image}</WithCaption>
      ) : (
        image
      )}
      {divProps.children}
    </div>
  );
};

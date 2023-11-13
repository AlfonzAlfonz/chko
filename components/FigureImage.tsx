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
      src={figure.url}
      width={figure.width}
      height={figure.height}
      alt={figure.caption}
      className="w-full"
    />
  );

  return (
    <div {...divProps}>
      {figure.caption ? (
        <WithCaption caption={figure.caption}>{image}</WithCaption>
      ) : (
        image
      )}
    </div>
  );
};

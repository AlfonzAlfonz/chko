import { FigureData } from "@/lib/db";
import Image from "next/image";
import { WithCaption } from "./WithCaption";

export const FigureImage = ({
  figure,
  className,
}: {
  figure: FigureData;
  className?: string;
}) => {
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
    <div className={className}>
      {figure.caption ? (
        <WithCaption className={className} caption={figure.caption}>
          {image}
        </WithCaption>
      ) : (
        image
      )}
    </div>
  );
};

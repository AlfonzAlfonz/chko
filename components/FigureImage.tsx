"use client";

import Image from "next/image";
import { WithCaption } from "./WithCaption";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { FigureData } from "@/lib/figure";
import { ImageLoader } from "next/dist/client/image-component";

export const FigureImage = ({
  figure,
  noCaption,
  imgClassName,
  captionClassName,
  loader,
  ...divProps
}: {
  figure?: FigureData;
  noCaption?: boolean;
  imgClassName?: string;
  captionClassName?: string;
  loader?: ImageLoader;
} & ComponentProps<"div">) => {
  if (!figure) return null;
  const image = (
    <Image
      key={figure.url}
      src={figure.url}
      loader={loader}
      width={640}
      height={figure.height / (640 / figure.width)}
      alt={figure.caption}
      quality={30}
      className={twMerge("w-full bg-black object-contain", imgClassName)}
    />
  );

  return (
    <div {...divProps}>
      {figure.caption && !noCaption ? (
        <WithCaption
          caption={figure.caption}
          className={"h-full"}
          captionClassName={captionClassName}
        >
          {image}
        </WithCaption>
      ) : (
        image
      )}
      {divProps.children}
    </div>
  );
};

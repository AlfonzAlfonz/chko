import { ImageLoader } from "next/image";

export const loader: ImageLoader = ({ src, width }) =>
  `/pdf/image-loader?url=${encodeURIComponent(src)}&width=${encodeURIComponent(
    width
  )}`;

import Image, { StaticImageData } from "next/image";

interface IImageComponentProps {
  width: string | number;
  height: string | number;
  src: StaticImageData | string;
  alt: string;
  style?: React.CSSProperties;
}

import fallback from "@/assets/fallback.png";

export default function Img({ width, height, src, alt, style }: IImageComponentProps) {
  return (
    <Image src={src || fallback} width={0} height={0} alt={alt} sizes="100vw" style={{ width, height, ...style }} />
  );
}

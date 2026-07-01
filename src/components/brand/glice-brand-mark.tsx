import Image from "next/image";

type Props = {
  size?: number;
  className?: string;
};

export function GliceBrandMark({ size = 28, className }: Props) {
  return (
    <Image
      src="/icons/transparent_icon.png"
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden
    />
  );
}

import Image from "next/image";

export function DecorativeImage() {
  return (
    <Image
      width={160}
      height={160}
      src="/images/salad.png"
      alt="salad"
      className="absolute -bottom-14 -left-14 -rotate-12 select-none"
      draggable={false}
    />
  );
}

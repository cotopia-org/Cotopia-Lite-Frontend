import Image from "next/image";

export default function Logo() {
  return (
    <Image src={`/assets/logo.png`} width={48} height={48} alt='Cotopia Logo' />
  );
}

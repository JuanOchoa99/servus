import { getImagePrefix } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center">
      {/* Logo V solo para mobile */}
      <Image
        src={`${getImagePrefix()}images/icons/logo-v.png`}
        alt="logo"
        width={140}
        height={140}
        className="lg:hidden w-36 h-36"
        quality={100}
      />
      {/* Logo completo para desktop */}
      <Image
        src={`${getImagePrefix()}images/logo/logo.png`}
        alt="logo"
        width={160}
        height={50}
        className="hidden lg:block"
        style={{ width: "400px", height: "auto" }}
        quality={100}
      />
    </Link>
  );
};

export default Logo;

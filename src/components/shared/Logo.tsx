import Link from "next/link";
import { Icons } from "./Icons";

const Logo = () => {
  return (
    <Link href="/" passHref>
      <div className="flex items-center">
        {/* Light mode logo */}
        <div className="block dark:hidden">
          <Icons.logo />
        </div>

        {/* Dark mode logo */}
        <div className="hidden dark:block">
          <Icons.logoDark />
        </div>
      </div>
    </Link>
  );
};

export default Logo;

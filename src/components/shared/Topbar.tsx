import { Separator } from "../ui/separator";
import { Icons } from "./Icons";
import { ModeToggle } from "./mode-toogle";
import Link from "next/link";

export const Topbar = () => {
  return (
    <div className="text-sm  hidden md:block p-0 text-muted-foreground  bg-background">

      <div className="h-10 max-width flex justify-between items-center">

        <div className="flex items-center space-x-2">
          <Link
            href={"https://wa.me/50671447395"}
            rel=" external nofollow"
            title="Escríbenos por WhatsApp"
            target="_blank"
            className="flex space-x-1 items-center px-1"
          >
            <Icons.whatsapp /> <span className="hover:text-accent hover:dark:text-accent-foreground">(506) 7144-7395</span>
          </Link>
          <Separator orientation="vertical" />
          <Link
            href={"mailto:ventas@arktee.com"}
            rel=" external nofollow"
            title="Escríbenos por WhatsApp"
            target="_blank"
            className="px-1"
          >
            ventas@arktee.com
          </Link>
        </div>

        <div className="flex justify-end items-center space-x-2">
          <ModeToggle />

          <Link href={"/"} className="px-1">Crear cuenta</Link>

          <Separator orientation="vertical" />
 
          <Link href={"/"} className="px-1">Iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
};

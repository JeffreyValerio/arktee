import { Separator } from "../ui/separator";
import { Phone, Mail } from "lucide-react";
import { UserMenu } from "./UserMenu";

export const Topbar = () => {
  return (
    <div className="hidden md:block border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="h-9 max-width flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <a
            href="https://wa.me/50671447395"
            rel="external nofollow"
            title="Escríbenos por WhatsApp"
            target="_blank"
            className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light"
          >
            <Phone size={12} />
            <span>(506) 7144-7395</span>
          </a>
          <Separator orientation="vertical" className="h-4" />
          <a
            href="mailto:ventas@arktee.com"
            rel="external nofollow"
            title="Escríbenos por email"
            className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-light"
          >
            <Mail size={12} />
            <span>ventas@arktee.com</span>
          </a>
        </div>

        <UserMenu />
      </div>
    </div>
  );
};

import Link from "next/link";
import Logo from "./Logo";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Separator } from "../ui/separator";

export const Footer = () => {
  return (
    <div>
      <div className="bg-secondary py-6 sm:py-12 sm:mt-20">
        <footer className="max-width">
          <div className="w-fit">
            <Logo />
          </div>
          <p className="py-4">
            Making the world a better place through constructing elegant
            hierarchies.
          </p>

          <div className="flex space-x-6">
            <Facebook strokeWidth={1} />
            <Instagram strokeWidth={1} />
            <Youtube strokeWidth={1} />
          </div>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-12">
            {/* COL1 */}
            <div className="">
              <h3 className="font-semibold text-xl mb-4">Solutions</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/">Marketing</Link>
                </li>
                <li>
                  <Link href="/">Analytics</Link>
                </li>
                <li>
                  <Link href="/">Automation</Link>
                </li>
                <li>
                  <Link href="/">Commerce</Link>
                </li>
                <li>
                  <Link href="/">Insights</Link>
                </li>
              </ul>
            </div>
            {/* COL2 */}
            <div className="">
              <h3 className="font-semibold text-xl mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/">Marketing</Link>
                </li>
                <li>
                  <Link href="/">Analytics</Link>
                </li>
                <li>
                  <Link href="/">Automation</Link>
                </li>
                <li>
                  <Link href="/">Commerce</Link>
                </li>
                <li>
                  <Link href="/">Insights</Link>
                </li>
              </ul>
            </div>
            {/* COL3 */}
            <div className="">
              <h3 className="font-semibold text-xl mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/">Marketing</Link>
                </li>
                <li>
                  <Link href="/">Analytics</Link>
                </li>
                <li>
                  <Link href="/">Automation</Link>
                </li>
                <li>
                  <Link href="/">Commerce</Link>
                </li>
                <li>
                  <Link href="/">Insights</Link>
                </li>
              </ul>
            </div>
            {/* COL4 */}
            <div className="">
              <h3 className="font-semibold text-xl mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/">Term of service</Link>
                </li>
                <li>
                  <Link href="/">Privacy policy</Link>
                </li>
                <li>
                  <Link href="/">Licence</Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
      <div className="py-4 max-width grid sm:grid-cols-2 items-center justify-center space-y-2">
        <p className="text-center sm:text-start">
          © 2025 <b>ArkTee</b> Todos los derechos reservados
        </p>
        <Separator className="block sm:hidden" />

        <ul className="flex items-center space-x-4 justify-end">
          <li>
            <Link href={"/"}>Política de privacidad</Link>
          </li>
          <Separator orientation="vertical" />
          <li>
            <Link href={"/"}>Términos y condiciones</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

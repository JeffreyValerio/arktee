import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Topbar } from "./Topbar";
import { Icons } from "./Icons";
import { GetCategories } from "@/actions";
import { CartCounter } from "./CartCounter";

export const Navbar = async () => {
  const categories = await GetCategories();

  return (
    <div className="shadow-lg sticky top-0 z-50">
      <Topbar />
      <div className="bg-primary">
        <div className="max-width h-14 hidden sm:flex justify-between items-center">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem className="mr-4">
                <Link href={"/"}>
                  <Icons.logoDark />
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 md:w-[250px] md:grid-cols-1">
                    {categories.map((category) => (
                      <ListItem
                        key={category.id}
                        title={`${category.name}`}
                        href={`/category/${category.name}`}
                      >
                        Ver {category.productCount}{" "}
                        {category.productCount > 1 ? "productos" : "producto"}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/gender/men"
                    className="px-4 py-2 text-sm font-medium text-white"
                  >
                    Hombres
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/gender/women"
                    className="px-4 py-2 text-sm font-medium text-white"
                  >
                    Mujeres
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/gender/kid"
                    className="px-4 py-2 text-sm font-medium text-white"
                  >
                    Niños
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/gender/unisex"
                    className="px-4 py-2 text-sm font-medium text-white"
                  >
                    Unisex
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <CartCounter />
        </div>
      </div>
    </div>
  );
};

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

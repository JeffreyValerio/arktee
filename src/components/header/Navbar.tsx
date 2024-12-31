'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Props {
  className: string
}

const navigation = [
  { label: 'Promociones', href: '/search?query=promociones' },
  { label: 'Liquidaciones', href: '/search?query=liquidaciones' },
  { label: 'Hombres', href: '/search?query=hombres' },
  { label: 'Mujeres', href: '/search?query=mujeres' },
  { label: 'Deportivas', href: '/search?query=deportivas' },
  { label: 'Casuales', href: '/search?query=casuales' },
  { label: 'Estampadas', href: '/search?query=estampadas' },
];

export const Navbar = ({ className }: Props) => {

  const currentPath = usePathname()

  return (
    <nav className={`${className}`}>
      <ul>
        {navigation.map((m) => (
          <li className={
            cn("transition-colors ease-in-out duration-300 rounded px-2 uppercase hover:bg-accent",
              currentPath == m.href ? 'bg-accent px-2 rounded hover:!text-secondary' : '')}
            key={m.label}>
            <Link href={m.href} className="hover:text-secondary">
              {m.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
} 
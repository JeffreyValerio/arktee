'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

const navigation = [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/site/about' },
    { label: 'Política de privacidad', href: '/site/privacy' },
    { label: 'Términos y condiciones', href: '/site/terms' },
    { label: 'FAQ', href: '/site/faq' },
]; 

export const FooterNavigation = () => {

    const currentPath = usePathname()
 
    return (
        <ul className='grid grid-cols-1 gap-y-2'>
            {navigation.map((m) => (
                <li key={m.label} className={cn("w-fit", currentPath === m.href ? "border-b" : "")}>
                    <Link href={m.href}>{m.label}</Link>
                </li>
            ))}
        </ul>
    )
}

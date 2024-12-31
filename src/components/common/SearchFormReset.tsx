'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from 'lucide-react'

export const SearchFormReset = () => {

    const pathname = usePathname()

    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement
        if (form) form.reset()
    }
    return (
        <button type="reset" onClick={reset}>
            <Link href={pathname} className="text-white">
                <X />
            </Link>
        </button>
    )
} 

import Link from 'next/link'
import { Icons } from './Icons'

export const Logo = () => {
    return (
        <Link href='/' title='Logo Arktee' aria-label='Logo Arktee' className='w-fit'>
            <Icons.logo />
        </Link>
    )
}
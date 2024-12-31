'use client'

import { AlignRight } from 'lucide-react'
import { Logo } from '../common/Logo'
import styles from './header.module.css'
import { Icons } from '../common/Icons'
import { useUIStore } from '@/store/ui/ui-store'

export const HeaderMobile = () => {

    const openSideMenu = useUIStore(state => state.openSideMenu)

    return (
        <div className={styles.HeaderMobile}>

            <header className='flex items-center justify-between mb-4 relative md:hidden'>
                <button
                    onClick={openSideMenu}
                    className='transition-all duration-300 ease-in-out hover:bg-slate-300 flex items-center gap-x-1'>
                    <AlignRight strokeWidth={1} size={32} />
                </button>

                <Logo />

                <div className={styles.icons}>
                    <div className={styles.iconsBar}>
                        <Icons.cart />
                    </div>
                </div>
            </header>
        </div>
    )
} 

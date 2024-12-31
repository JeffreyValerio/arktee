import { HeaderMobile } from './HeaderMobile'
import { Icons } from '../common/Icons'
import { Logo } from '../common/Logo'
import { SearchForm } from '../common/SearchForm'
import styles from './header.module.css'
import { Navbar } from './Navbar'

export const Header = () => {
    return (
        <section className={` container`}>

            <HeaderMobile />

            <header className={styles.header}>
                <Logo />

                <SearchForm />

                <div className={styles.icons}>
                    <div className={styles.iconsBar}>
                        <Icons.user />
                        <Icons.favorite />
                        <Icons.cart />
                    </div>
                </div>
            </header>

            <Navbar className={styles.nav} />

        </section>
    )
}

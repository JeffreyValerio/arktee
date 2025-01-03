import { Logo } from '../common/Logo'
import styles from './footer.module.css'
import { FooterNavigation } from './Navigation'

export const Footer = () => {
    return (
        <div className='container'>
            <footer className={styles.footer}>
                <Logo />
                <FooterNavigation />
            </footer>

            <div className={styles.bottom}>
                <p>&copy; 2024 <strong className='border-b'>ARKTEE</strong> | Derechos reservados</p>
                {/* <p>Developed by <Link href={'mailto:jeffreyvalerio@hotmail.com'}>Jeffrey Valerio</Link> </p> */}
            </div>
        </div>
    )
}
import Link from 'next/link'
import styles from './hero.module.css'
export const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={`${styles.banner} hover-effect image`}>
                <Link href={'/'}>
                    Camisetas oversize
                </Link>
            </div>

            <aside className={`${styles.aside} hover-effect image`} />
        </section>
    )
}

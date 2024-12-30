import styles from './carousel.module.css'
import { Slider } from './Slider'

export const Carousel = () => {
    return (
        <section className={styles.carousel}>
            <Slider />
        </section>
    )
}

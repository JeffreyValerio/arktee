import { Button } from '../ui/button'
import styles from './contact.module.css'
import Form from 'next/form'

export const Contact = () => {
    return (
        <section className={`${styles.contact} container`}>

            <Form action={'/'} className={styles.form}>
                <section>
                    <h2>Diseños juntos tu camiseta</h2>
                    <input type="text" placeholder='Nombre completo' />
                    <input type="tel" placeholder='WhatsApp' />
                    <input type="email" placeholder='Tu mejor correo' />
                    <textarea placeholder='Cuéntanos qué diseño buscas' />
                    <input type="file" />

                    <Button variant={'default'} className='w-full md:w-2/3 bg-accent'>Solicitar cotización</Button>
                </section>
            </Form>
            <div className={styles.image}
                style={{ backgroundImage: "url('https://placehold.co/850x430.png')" }}>
            </div>

        </section>
    )
} 
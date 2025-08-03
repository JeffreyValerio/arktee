export const Benefits = () => {
    return (
        <div className='hidden md:grid sm:grid-cols-2 md:grid-cols-3 gap-4 min-h-20 py-4 items-center'>
            <div className="border-r flex flex-col items-center justify-center">
                <p>Descuentos solo en la web</p>
                <strong>Obtén 10% OFF en tu primer pedido</strong>
            </div>
            <div className="border-r flex flex-col items-center justify-center">
                <p>Notificaciones de envío</p>
                <strong>Recibe actualizaciones en tiempo real</strong>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p>Guarda tus favoritos</p>
                <strong>Listas personalizadas en la web</strong>
            </div>
        </div>
    )
}  
import { Truck, Percent, Heart } from "lucide-react";

export const Benefits = () => {
    const benefits = [
        {
            icon: Percent,
            title: "10% OFF",
            description: "Primer pedido",
            color: "text-green-600 dark:text-green-400"
        },
        {
            icon: Truck,
            title: "Envío Gratis",
            description: "Pedidos +$50",
            color: "text-blue-600 dark:text-blue-400"
        },
        {
            icon: Heart,
            title: "Favoritos",
            description: "Guarda preferidos",
            color: "text-red-600 dark:text-red-400"
        }
    ];

    return (
        <div className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'>
            <div className='max-width px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-800'>
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div 
                                key={index}
                                className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 px-2 sm:px-4 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                            >
                                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ${benefit.color}`}>
                                    <Icon size={16} className="sm:w-5 sm:h-5" />
                                </div>
                                <div className="flex-1 min-w-0 text-center sm:text-left">
                                    <div className={`text-sm sm:text-base font-semibold mb-0.5 ${benefit.color}`}>
                                        {benefit.title}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                        {benefit.description}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}  
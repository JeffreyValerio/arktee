'use client'

import { useToaster } from '@/components/providers/ToastifyContext'
import { Button } from '@/components/ui/button'
import { CartProduct } from '@/interfaces/cart-product.interface'
import { currencyFormat } from '@/lib/currency-format'
import { useCartStore } from '@/store/cart/cart-store'
import { MessageCircle, Trash2, ShoppingBag, CheckCircle2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export const OrderSummary = () => {
    const [loaded, setLoaded] = useState(false)
    const clearCart = useCartStore(state => state.clearCart)
    const getSummaryInfo = useCartStore(state => state.getSummaryInfo)
    const cart = useCartStore(state => state.cart)
    const { numberOfItems, subTotal, tax, total } = getSummaryInfo()
    const { showToast } = useToaster()

    const sendToWhatsApp = () => {
        if (numberOfItems === 0) {
            showToast(`El carrito está vacío`, {
                type: 'info',
                duration: 5000
            })
            return;
        }

        // Header
        let message = '🛍️ *NUEVO PEDIDO - ARKTEE*\n\n';

        // Lista de productos
        cart.forEach((item: CartProduct, index: number) => {
            message += `*${index + 1}. ${item.title}*\n`;
            message += `Talla: ${item.size} | Cantidad: ${item.quantity}\n`;
            message += `Precio: ${currencyFormat(item.price)} c/u\n`;
            message += `Subtotal: *${currencyFormat(item.price * item.quantity)}*\n\n`;
        });

        // Resumen
        message += '━━━━━━━━━━━━━━━━━━━━━━━━\n';
        message += `Subtotal: ${currencyFormat(subTotal)}\n`;
        message += `IVA: ${currencyFormat(tax)}\n`;
        message += `*TOTAL: ${currencyFormat(total)}*\n\n`;

        // Pago
        message += '💳 *PAGO:*\n';
        message += 'Transferencia bancaria:\n';
        message += 'Cuenta: 1234-5678-9012-3456\n';
        message += 'A nombre de: ARKTEE\n\n';
        message += '⚠️ Envía el comprobante de pago para procesar tu pedido.\n\n';

        // Footer
        message += '✨ ¡Gracias por tu compra!\n';
        message += '📞 7144-7395 | ventas@arktee.com';

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/50671447395?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        showToast(`Redirigiendo a WhatsApp...`, {
            type: 'success',
            duration: 5000
        })
    };

    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    if (numberOfItems === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Tu carrito está vacío
                    </p>
                    <Link href="/">
                        <Button variant="outline" className="w-full">
                            Continuar Comprando
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Resumen de la Orden
                </h2>
            </div>

            {/* Summary Content */}
            <div className="p-4 sm:p-6 space-y-4">
                {/* Items Count */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {numberOfItems} {numberOfItems === 1 ? "producto" : "productos"}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {currencyFormat(subTotal)}
                    </span>
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {currencyFormat(subTotal)}
                    </span>
                </div>

                {/* Tax */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Impuestos ({((Number(process.env.NEXT_PUBLIC_TAX_RATE) || 0) * 100).toFixed(0)}%)
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {currencyFormat(tax)}
                    </span>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex items-center justify-between pt-2">
                    <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        Total
                    </span>
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {currencyFormat(total)}
                    </span>
                </div>

                {/* Info Badge */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3 mt-4">
                    <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-800 dark:text-blue-200">
                            El pago se realiza mediante transferencia bancaria. Te enviaremos los detalles después de confirmar tu pedido.
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                <Button
                    onClick={sendToWhatsApp}
                    className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                >
                    <MessageCircle className="w-4 h-4" />
                    Enviar Pedido por WhatsApp
                </Button>

                <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
                    size="sm"
                >
                    <Trash2 className="w-4 h-4" />
                    Vaciar Carrito
                </Button>

                <Link href="/" className="block">
                    <Button
                        variant="ghost"
                        className="w-full"
                        size="sm"
                    >
                        Continuar Comprando
                    </Button>
                </Link>
            </div>
        </div>
    )
}

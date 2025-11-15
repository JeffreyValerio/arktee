'use client'

import { deleteProduct } from '@/actions'
import { useToaster } from '@/components/providers/ToastifyContext'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import React from 'react'

interface Props {
    productId: string,
    text?: boolean,
}
export const DeleteProductButton = ({ productId: id, text }: Props) => {

    const { showToast } = useToaster() 

    return (
        <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
            title="Eliminar producto"
            onClick={() => {
                const confirmed = window.confirm(
                    `¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.`
                )
                if (confirmed) {
                    showToast(`El producto fue eliminado con éxito`, {
                        type: 'success',
                        duration: 5000
                    })
                    deleteProduct(id)
                } else {
                    showToast(`La eliminación del producto fue cancelada`, {
                        type: 'warning',
                        duration: 5000
                    })
                }
            }}
        >
            {text ? (
                <span>Eliminar</span>
            ) : (
                <Trash2 size={16} />
            )}
        </Button>
    )
}  
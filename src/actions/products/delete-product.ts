'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { deleteProductImage } from './delete-product-image';

export const deleteProduct = async (productId: string) => {
    try {

        // Obtiene todas las imágenes asociadas al producto
        const productImages = await prisma.productImage.findMany({
            where: { productId }
        });

        // Elimina cada imagen asociada al producto de Cloudinary y de la base de datos
        await Promise.all(productImages.map(async (image) => {
            await deleteProductImage(image.id, image.url);
        }));

        await prisma.product.delete({
            where: { id: productId }
        })

        revalidatePath(`/admin/products`)

        console.log('Producto eliminado con éxito.');
        return {
            ok: true,
            message: 'Producto eliminado con éxito.'
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo eliminar la imagen'
        }
    }
}
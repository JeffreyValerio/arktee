'use server'

import prisma from '@/lib/prisma'
import { v2 as Cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'
Cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export const deleteProductImage = async (imageId: number, imageUrl: string) => {

    if (!imageUrl.startsWith('http')) {
        return {
            ok: false,
            error: 'Invalid image URL'
        }
    }

    const imageName = imageUrl
        .split('/')
        .pop() // Obtener la última parte de la URL
        // ?.split('.')[0] ?? ""; // Dividir por el punto para separar el nombre de la extensión
        ?.split('.') // Dividir por el punto para separar el nombre de la extensión
        .shift() // Obtener el nombre sin la extensión
        ?? ''

    try {
        await Cloudinary.uploader.destroy(`products/${imageName}`)
        const deletedImage = await prisma.productImage.delete({
            where: { id: imageId },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        })


        // Revalidar los paths 
        revalidatePath(`/admin/products`)
        revalidatePath(`/admin/products/${deletedImage.product?.slug}`);
        revalidatePath(`/product/${deletedImage.product?.slug}`);

    } catch (error) {
        console.error('Error deleting image:', error)
        return {
            ok: false,
            error: 'Error deleting image ' + error
        }
    }

}
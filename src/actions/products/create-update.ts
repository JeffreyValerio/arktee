'use server'

import { Gender, Product, Size } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { v2 as cloudinary } from 'cloudinary';
import prisma from '@/lib/prisma';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

// --- Schema ---
const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    stock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform(val => val.split(',')),
    tags: z.string(),
    gender: z.enum(['men', 'women', 'kid', 'unisex']),
    slug: z.string().optional().nullable()
})

export const createUpdateProduct = async (formData: FormData) => {
    const data = Object.fromEntries(formData)

    const parsedData = productSchema.safeParse(data)

    if (!parsedData.success) {
        console.error(parsedData.error)
        return {
            ok: false,
            error: 'Validation error',
            fieldErrors: parsedData.error,
        }
    }

    const product = parsedData.data

    // 👇 Generar slug siempre a partir del título
    const slug = product.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '')
        .trim()

    const { id, ...rest } = product

    try {
        const prismaTx = await prisma?.$transaction(async (tx) => {
            const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase())

            let dbProduct: Product

            if (id) {
                // ACTUALIZAR
                dbProduct = await tx.product.update({
                    where: { id },
                    data: {
                        ...rest,
                        slug,
                        sizes: { set: rest.sizes as Size[] },
                        tags: { set: tagsArray }
                    },
                })
            } else {
                // CREAR
                dbProduct = await tx.product.create({
                    data: {
                        ...rest,
                        slug,
                        sizes: { set: rest.sizes as Size[] },
                        tags: { set: tagsArray }
                    }
                })
            }

            // --- Manejo de imágenes ---
            const files = formData.getAll('images') as File[]
            if (files.length > 0) {
                const uploaded = await uploadImages(files)
                if (uploaded.length > 0) {
                    await tx.productImage.createMany({
                        data: uploaded.map(url => ({
                            url,
                            productId: dbProduct.id, // 👈 usar el id del producto recién creado/actualizado
                        })),
                    })
                }
            }

            // Si son URLs directas (caso cuando ya las tienes y las mandas desde el form)
            const urls = formData.getAll('imageUrls') as string[]
            if (urls.length > 0) {
                await tx.productImage.createMany({
                    data: urls.map(url => ({
                        url,
                        productId: dbProduct.id,
                    })),
                })
            }

            return dbProduct
        })

        revalidatePath('/admin/products')
        revalidatePath(`/admin/products/${product.slug}`)
        revalidatePath(`/${product.slug}`)

        return {
            ok: true,
            product: prismaTx,
            message: id ? 'Producto actualizado' : 'Producto creado',
        }
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo guardar/actualizar el producto: ' + error,
        }
    }
}

// 👇 uploadImages tipado correctamente
const uploadImages = async (filesOrURLs: (File | string)[]): Promise<string[]> => {
    try {
        // Si viene un string directo
        if (typeof filesOrURLs === 'string') {
            const result = await cloudinary.uploader.upload(filesOrURLs, { folder: 'products' });
            return [result.secure_url];
        }

        // Si no es array, devolver vacío
        if (!Array.isArray(filesOrURLs)) {
            console.error('Input is not an array or a string');
            return [];
        }

        const uploadPromises = filesOrURLs.map(async (fileOrURL) => {
            try {
                if (typeof fileOrURL === 'string') {
                    const result = await cloudinary.uploader.upload(fileOrURL, { folder: 'products' });
                    return result.secure_url;
                } else {
                    const buffer = await fileOrURL.arrayBuffer();
                    const base64Image = Buffer.from(buffer).toString('base64');

                    const result = await cloudinary.uploader.upload(
                        `data:image/png;base64,${base64Image}`,
                        { folder: 'products' }
                    );
                    return result.secure_url;
                }
            } catch (error) {
                console.error('Error al subir imagen: ', error);
                return null; // 👈 aquí puede fallar uno, pero lo filtramos después
            }
        });

        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages.filter((url): url is string => url !== null); // 👈 eliminamos nulls
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

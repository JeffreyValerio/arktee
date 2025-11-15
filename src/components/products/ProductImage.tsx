import Image from "next/image";

interface Props {
    src?: string;
    alt: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    width?: number;
    height?: number;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
}
export const ProductImage = ({ 
    src, 
    alt, 
    className, 
    height, 
    width,
    priority = false,
    loading = 'lazy'
}: Props) => {

    const localSrc = (src)
        ? src.startsWith('http')
            ? src
            : `/products/${src}`
        : '/images/placeholder.jpg';

    return (
        <Image
            src={localSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            priority={priority}
            loading={loading}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
        />
    )
}

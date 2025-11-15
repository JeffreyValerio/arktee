import Image from "next/image";

interface Props {
    src?: string;
    alt: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    width?: number;
    height?: number;
}
export const ProductImage = ({ src, alt, className, height, width }: Props) => {

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
        />
    )
}

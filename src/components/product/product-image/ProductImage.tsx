import Image from "next/image";

interface Props {
    src?: string;
    alt: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    width: number;
    height: number;
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
}

export const ProductImage = ({ src, alt, className, width, height, style }: Props) => {
    return (
    <>
        <Image 
            src={src?.startsWith('http') ? src : src ? `/${src.replace(/^\/+/, '')}` : '/imgs/placeholder.jpg'}
            width={ width }
            height={ height }
            alt={ alt }
            className={ className }
            style={ style }
        />
    </> 
  )
}

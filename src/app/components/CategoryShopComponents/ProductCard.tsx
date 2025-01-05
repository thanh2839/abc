import * as React from "react";
import { Star } from "lucide-react";

export interface ProductCardProps {
    id: number;
    image: string;
    title: string;
    originalPrice: number;
    rating: number;
    reviews: number;
    imageAlt: string;
}

export function ProductCard({
    id,
    image,
    title,
    originalPrice,
    rating,
    reviews,
    imageAlt
}: ProductCardProps) {
    const [isHovered, setIsHovered] = React.useState(false);

    // Navigate function
    const handleNavigate = (id: string) => {
        window.location.href = `/pages/products?id=${id}`; 
    };

    return (
        <article
            className="flex flex-col min-w-[200px] w-[220px] transition-transform duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer"
            onClick={() => handleNavigate(id.toString())}  
        >
            <div
                className="flex overflow-hidden gap-1 items-start px-2 pt-2 pb-8 max-w-full rounded bg-neutral-100 w-[220px] relative"
            >
                <div className="flex flex-col text-xs whitespace-nowrap text-neutral-50">
                    <img
                        loading="lazy"
                        src={image}
                        alt={imageAlt}
                        className="object-contain self-end mt-2 max-w-full aspect-[1.13] w-[140px]"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <button
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-opacity duration-300 ease-in-out hover:opacity-80"
                        aria-label="Add to wishlist">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/00d93adab53c5214ab1a164999c542db25c2e68622e0085e7c9140fbeae9a9e5?apiKey=107937b03e68408b93e8f13d8a143773&"
                            alt=""
                            className="object-contain aspect-square w-[28px]"
                        />
                    </button>
                    <button
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-opacity duration-300 ease-in-out hover:opacity-80"
                        aria-label="Quick view">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/92f95af307a693492ef165c4482565d88008392560df9e3855fc15ed6903d028?apiKey=107937b03e68408b93e8f13d8a143773&"
                            alt=""
                            className="object-contain aspect-square w-[28px]"
                        />
                    </button>
                </div>
                {isHovered && (
                    <button
                        className="absolute bottom-0 left-0 right-0 py-2 bg-black text-white text-center text-sm transition-all duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        aria-label={`Add ${title} to cart`}
                    >
                        Add To Cart
                    </button>
                )}
            </div>
            <div className="flex flex-col items-start self-start mt-3 text-sm font-medium">
                <h2 className="self-stretch text-black hover:text-red-500 transition-colors duration-300">{title}</h2>
                <div className="flex gap-2 items-start mt-1 whitespace-nowrap">
                    <span className="text-black opacity-50 text-xs" aria-label={`Original price: $${originalPrice}`}>{originalPrice} VNĐ</span>
                </div>
                <div className="flex gap-1 items-start mt-1 text-xs font-semibold text-black whitespace-nowrap">
                    <div className="flex mt-1" role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < rating ? 'fill-amber-400' : 'fill-gray-200'}`}
                            />
                        ))}
                    </div>
                    <div className="w-6 opacity-50">({reviews})</div>
                </div>
            </div>
        </article>
    );
}

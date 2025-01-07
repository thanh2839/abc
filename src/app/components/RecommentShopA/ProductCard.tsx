import * as React from "react";
import { Star } from "lucide-react";

export interface ProductCardProps {
    id: number;
    image: string;
    title: string;
    currentPrice: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    imageAlt: string;
}

export function ProductCard({
    id,
    image,
    title,
    currentPrice,
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
            className="flex flex-col min-w-[240px] w-[270px] transition-transform duration-300 ease-in-out transform hover:-translate-y-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleNavigate(id.toString())}  
        >
            <div className="flex overflow-hidden gap-1 items-start px-3 pt-3 pb-12 max-w-full rounded bg-neutral-100 w-[270px] relative">
                <div className="flex flex-col text-xs whitespace-nowrap text-neutral-50">
                    <img
                        loading="lazy"
                        src={image}
                        alt={imageAlt}
                        className="object-contain self-end mt-3 max-w-full aspect-[1.13] w-[172px]"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-opacity duration-300 ease-in-out hover:opacity-80"
                        aria-label="Add to wishlist">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/00d93adab53c5214ab1a164999c542db25c2e68622e0085e7c9140fbeae9a9e5?apiKey=107937b03e68408b93e8f13d8a143773&"
                            alt=""
                            className="object-contain aspect-square w-[34px]"
                        />
                    </button>
                    <button
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-opacity duration-300 ease-in-out hover:opacity-80"
                        aria-label="Quick view">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/92f95af307a693492ef165c4482565d88008392560df9e3855fc15ed6903d028?apiKey=107937b03e68408b93e8f13d8a143773&"
                            alt=""
                            className="object-contain aspect-square w-[34px]"
                        />
                    </button>
                </div>
                {isHovered && (
                    <button
                        className="absolute bottom-0 left-0 right-0 py-3 bg-black text-white text-center transition-all duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        aria-label={`Add ${title} to cart`}
                    >
                        Add To Cart
                    </button>
                )}
            </div>
            <div className="flex flex-col items-start self-start mt-4 text-base font-medium">
                <h2 className="self-stretch text-black hover:text-red-500 transition-colors duration-300">{title}</h2>
                <div className="flex gap-3 items-start mt-2 whitespace-nowrap">
                    {/* <span className="text-red-500" aria-label={`Current price: ${currentPrice}`}>${currentPrice}</span> */}
                    <span className="text-black opacity-50" aria-label={`Original price: ${originalPrice}`}>{originalPrice} VNĐ</span>
                </div>
                <div className="flex gap-2 items-start mt-2 text-sm font-semibold text-black whitespace-nowrap">
                    <div className="flex mt-2" role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`w-5 h-5 ${i < rating ? 'fill-amber-400' : 'fill-gray-200'}`}
                            />
                        ))}
                    </div>
                    {/* <div className="flex mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < product.rating ? 'fill-yellow-400' : 'fill-gray-300'}`}
                            />
                        ))}
                    </div> */}
                    <div className="w-8 opacity-50">({reviews})</div>
                </div>
            </div>
        </article>
    );
}
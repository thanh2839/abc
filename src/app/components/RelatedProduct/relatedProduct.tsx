'use client'
import * as React from "react";
import { ProductCard, ProductCardProps } from "./ProductCard";
import { fetchGetRelatedProduct, fetchProductInforList } from "./TypeBestSelling";

const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping: true,
    })
        .format(price)
        .replace(/,/g, '.');
};

interface RelatedProductProps {
    productId: string;
}

export const RelatedProduct: React.FC<RelatedProductProps> = ({ productId }) => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [products, setProducts] = React.useState<ProductCardProps[]>([]);

    const productsPerPage = 4;
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePrevious = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
    };

    const visibleProducts = products.slice(
        currentPage * productsPerPage,
        (currentPage + 1) * productsPerPage
    );

    const bestSelling = async () => {
        try {
            console.log("BDC: ", productId)
            const data = await fetchGetRelatedProduct(Number(productId))
            const productIds = data.map(item => item.productId);
            // console.log("Product IDs: ", productIds);

            // call data
            const dataProduct = await fetchProductInforList(productIds);
            const formattedProducts: ProductCardProps[] = dataProduct.data.map((product: any) => {
                const originalPrice = product.options && product.options.length > 0 ? product.options[0].price : 0;
                return {
                    id: product.id,
                    image: product.image || `https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/e93ad05ae04f0b54f4159cbcf6911a27cb651cbe215adedef39517dbfe9650fd?apiKey=107937b03e68408b93e8f13d8a143773&`,
                    title: product.name,
                    originalPrice: formatPrice(originalPrice === 0 ? 1000000 : originalPrice),                    rating: product.rate,
                    reviews: product.ratingCount,
                    imageAlt: product.imageAlt,
                };
            });
            setProducts(formattedProducts);
        } catch (e) {
            console.error("Error fetching member data:", e);
        }
    }

    React.useEffect(() => {
        bestSelling();
    }, []);

    return (
        <section
            aria-labelledby="flash-sales-title"
            className="px-[50px] mx-auto flex flex-col rounded-none w-full max-w-[1440px]"
        >
            <div className="flex flex-col w-full max-md:max-w-full">
                <header className="flex justify-between items-center w-full max-md:max-w-full mt-6">
                    <div className="flex gap-10 items-center min-w-[240px] max-md:max-w-full">
                        {/* Move Next Button next to Flash Sales */}

                    </div>
                    <div className="flex gap-2 items-center ml-auto">
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 0}
                                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                                aria-label="Previous products"
                            >
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/6d46c131187bfff9eb633481579a064341b51d7196040ee40dd3f9577e445a5e?apiKey=107937b03e68408b93e8f13d8a143773&"
                                    alt="Previous"
                                    className="object-contain shrink-0 aspect-square w-[46px]"
                                />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages - 1}
                                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                                aria-label="Next products"
                            >
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/e88e31fcac886e936832d43b7fb2b7a3e219274da66d8e9d07a08a6cc7094c1b?apiKey=107937b03e68408b93e8f13d8a143773&"
                                    alt="Next"
                                    className="object-contain shrink-0 aspect-square w-[46px]"
                                />
                            </button>
                        </div>
                    </div>
                </header>
                <div className="flex overflow-x-auto gap-8 items-start mt-10 w-full max-md:max-w-full">
                    {visibleProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
{/* 
            <div
                className="shrink-0 mt-16 max-w-full h-0 border border-black border-solid w-full max-md:mt-10"
                role="separator"
            /> */}
        </section>
    );
}
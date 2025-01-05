'use client'
import * as React from "react";
import { CategoryCard } from "./CategoryCard";
import { Category, categories, fetchCategoriesProduct } from "./TypeCategory";
// import { ProductsSection } from "../ShowBrowseCategory/ProductSection";
import { ProductCard, ProductCardProps } from "./ProductCard";
import { productData } from "../RecommentShop/TypeRecommend";
import ApiRoutes from "@/app/services/Api";

const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping: true,
    })
        .format(price)
        .replace(/,/g, '.');
};

export const BrowseCategories: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<string>("Thời trang");
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<number>(1);
    const [products, setProducts] = React.useState<ProductCardProps[]>([]);
    // dieu


    const fetchCategoriesProduct = async (id: number) => {
        try {
            const response = await fetch(ApiRoutes.Product_InforCategory(id), {
                method: "POST"
            });
            if (!response.ok) {
                throw Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            const formattedProducts: ProductCardProps[] = data.data.map((product: any) => {
                const originalPrice = product.options && product.options.length > 0 ? product.options[0].price : 0;
                return {
                    id: product.id,
                    image: product.image || `https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/e93ad05ae04f0b54f4159cbcf6911a27cb651cbe215adedef39517dbfe9650fd?apiKey=107937b03e68408b93e8f13d8a143773&`,
                    title: product.name, 
                    originalPrice: formatPrice(originalPrice),
                    rating: product.rate,
                    reviews: product.ratingCount,
                    imageAlt: product.imageAlt,
                };
            });
            setProducts(formattedProducts);
            console.log("responseAA: ", data.data)

            return data;
        }
        catch (error) {
            console.error('Error fetching category products:', error);
        }
    }

    const handleCategorySelect = (category: string, id: number) => {
        setSelectedCategory(category);
        setSelectedCategoryId(id);
        fetchCategoriesProduct(id);
    };
    React.useEffect(() => {
        // Fetch the products for the default category (id = 1)
        fetchCategoriesProduct(selectedCategoryId);
    }, [selectedCategoryId]); // When selectedCategoryId changes, fetch the products


    return (
        <section
            aria-labelledby="browse-categories-title"
            className="px-4 py-8 max-w-7xl mx-auto"
        >
            <div className="flex flex-col">
                <div className="flex flex-wrap gap-10 items-end max-md:max-w-full">
                    <div className="flex flex-col min-w-[240px]">
                        <div className="flex gap-4 items-center self-start">
                            <div className="flex flex-col self-stretch my-auto w-5">
                                <div className="flex shrink-0 h-10 bg-red-500 rounded" />
                            </div>
                            <div className="self-stretch my-auto text-base font-semibold leading-none text-red-500">
                                Categories
                            </div>
                        </div>
                        <h2
                            id="browse-categories-title"
                            className="mt-5 text-4xl font-semibold tracking-widest leading-none text-black"
                        >
                            Browse By Category
                        </h2>
                    </div>
                </div>
                <div
                    className="flex flex-wrap gap-4 mt-12 max-md:mt-8"
                    role="group"
                    aria-label="Product categories"
                >
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            title={category.title}
                            imageSrc={category.imageSrc}
                            isActive={category.title === selectedCategory}
                            onSelect={() => handleCategorySelect(category.title, category.id)}
                        />
                    ))}
                </div>
                <div
                    className="grid grid-cols-5 gap-8 items-start mt-10 w-full pr-5"
                    style={{ paddingRight: '20px' }}
                >
                    {products.slice(0, 15).map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
                {/* View All Products Button */}
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => {
                        }}
                        className="px-8 py-4 bg-red-500 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                        aria-label="View all products"
                    >
                        View All Products
                    </button>
                </div>
            </div>
        </section>

    );
};
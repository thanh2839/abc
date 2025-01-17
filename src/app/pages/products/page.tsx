'use client';
import Header from '../../components/header';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from '@headlessui/react';
import { ShoppingCart, Star } from 'lucide-react';
import { ImageGallery } from '@/app/components/product/Image';
import { Policies } from '@/app/components/product/policies';
import { Reviews } from '@/app/components/product/reviews';
import { RelatedProducts } from '@/app/pages/products/related-products';
import { Footer } from '@/app/components/Footer';
import { BProduct, getProductByID, fetchGetProductCategory, fetchAddCart } from './product';
import { RelatedProduct } from '@/app/components/RelatedProduct/relatedProduct';



export default function ShopProduct() {
    const idUser = sessionStorage.getItem('UserId')
    const accessToken = sessionStorage.getItem('accessToken')
    // console.log("Id User: ", accessToken)

    const [product, setProduct] = useState<BProduct | null>(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [hoveredRating, setHoveredRating] = useState(null);
    const [productId, setProductId] = useState<string | null>(null);

    const getProductIdFromURL = (): string | null => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    };



    // const maxIndex = relatedProduct.length - 5; // Đảm bảo chỉ có 5 sản phẩm hiển thị

    // // Hàm để cuộn sang phải
    // const handleNext = () => {
    //     if (currentIndex < maxIndex) {
    //         setCurrentIndex(currentIndex + 1);
    //     }
    // };

    // // Hàm để cuộn sang trái
    // const handlePrev = () => {
    //     if (currentIndex > 0) {
    //         setCurrentIndex(currentIndex - 1);
    //     }
    // };

    const basePrice = product?.price || 0;
    const totalPrice = basePrice * quantity;

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = async () => {
        // Check if any option has stock available
        const hasStockAvailable = product?.options?.some(option => option.stockQuantity > 0);

        if (!hasStockAvailable) {
            alert("This product is currently out of stock.");
            return;
        }

        if (!selectedSize?.stockQuantity || selectedSize.stockQuantity <= 0) {
            alert("Please select a size with available stock.");
            return;
        }
        if (idUser !== null && accessToken !== null) {
            if (selectedSize !== undefined && quantity !== undefined) {
                const dataCart = await fetchAddCart(Number(idUser), accessToken, selectedSize, quantity);
                console.log(dataCart);
            } else {
                console.error("selectedSize or quantity is undefined");
            }
        } else {
            console.error("idUser or accessToken is null");
        }
        setIsAdding(true);

        // Simulate adding to cart
        setTimeout(() => {
            setIsAdding(false);
            console.log('Added to cart:', {
                size: selectedSize,
                quantity,
                totalPrice,
            });
        }, 1000);
    };


    useEffect(() => {
        const productId = getProductIdFromURL();
        setProductId(productId)
        const fetchData = async () => {
            try {
                const fetchedProduct = await getProductByID(Number(productId)); // Replace with actual product ID
                setProduct(fetchedProduct.data);
                setSelectedSize(fetchedProduct.data.options);


            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData();
    }, []);

    if (!product) {
        return (
            <div>
                <Header />
                <main className="flex items-center justify-center h-screen">
                    <p className="text-lg font-medium text-gray-500">Loading...</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <main className="px-4 sm:px-8 md:px-16 lg:px-32 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col">
                        <div className="relative">
                            <div className="aspect-w-3 aspect-h-4 rounded-lg bg-gray-100 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-center object-cover"
                                />
                            </div>
                            {/* <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4">
                                <button
                                    onClick={() => setActiveImageIndex(Math.max(0, activeImageIndex - 1))}
                                    className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => setActiveImageIndex(Math.min((product.images?.length || 1) - 1, activeImageIndex + 1))}
                                    className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div> */}
                        </div>
                    </div>

                    <div className="md:w-1/2 flex flex-col gap-6">
                        <div className="flex justify-between">
                            <h1 className="text-xl font-medium text-gray-900">{product.name}</h1>
                            {/* <p className="text-xl font-medium text-gray-900">{product.rate}</p> */}
                        </div>

                        <div className="mt-4">
                            <h2 className="sr-only">Reviews</h2>
                            <div className="flex items-center">
                                <p className="text-sm font-medium text-gray-700">
                                    {product.rate.toFixed(1)}
                                    <span className="sr-only"> out of 5 stars</span>
                                </p>

                                <div className="ml-1 flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <div
                                            key={rating}
                                            className="relative cursor-pointer transition-transform duration-200 hover:scale-110"
                                            onMouseEnter={() => setHoveredRating(rating + 1)}
                                            onMouseLeave={() => setHoveredRating(null)}
                                        >
                                            <Star
                                                className={clsx(
                                                    'h-5 w-5 flex-shrink-0 transition-colors duration-200',
                                                    hoveredRating && rating < hoveredRating
                                                        ? 'text-yellow-500'
                                                        : rating < Math.round(product.rate)
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-200',
                                                    'stroke-2'
                                                )}
                                                fill={rating < Math.round(product.rate) ? 'currentColor' : 'none'}
                                                aria-hidden="true"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                                    ·
                                </div>

                                <div className="ml-4 flex">
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-slate-600 hover:text-slate-500 transition-colors duration-200"
                                    >
                                        Đã có {product.ratingCount || 0} đánh giá
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Mô tả sản phẩm</h2>
                            <div
                                className="prose prose-sm mt-4 text-gray-500"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Lựa chọn thể loại</h3>
                            <RadioGroup
                                value={selectedSize}
                                onChange={setSelectedSize}
                                className="mt-2"
                            >
                                <RadioGroup.Label className="sr-only">Chọn loại</RadioGroup.Label>
                                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                    {product.options.map((size) => (
                                        <RadioGroup.Option
                                            key={size.name}
                                            value={size}
                                            className={({ active, checked }) =>
                                                clsx(
                                                    size.stockQuantity ? 'cursor-pointer' : 'cursor-not-allowed opacity-25',
                                                    active && 'ring-2 ring-slate-500 ring-offset-2',
                                                    checked ? 'bg-slate-600 text-white' : 'bg-white text-gray-900',
                                                    'border rounded-md p-3 text-sm font-medium uppercase'
                                                )
                                            }
                                            disabled={!size.stockQuantity}
                                        >
                                            <RadioGroup.Label>{size.name}</RadioGroup.Label>
                                        </RadioGroup.Option>
                                    ))}
                                </div>
                            </RadioGroup>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-gray-900">Số lượng:</span>
                                    <div className="flex items-center border rounded">
                                        <button
                                            onClick={decreaseQuantity}
                                            className="px-3 py-1 border-r"
                                            type="button"
                                        >
                                            -
                                        </button>
                                        <span className="px-4">{quantity}</span>
                                        <button
                                            onClick={increaseQuantity}
                                            className="px-3 py-1 border-l"
                                            type="button"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-sm font-medium">Tổng:</span>
                                    <p className="text-lg font-semibold">
                                        {new Intl.NumberFormat('vi-VN').format((selectedSize?.price || basePrice) * quantity)} VNĐ
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={
                                    !selectedSize?.stockQuantity || // No stock for selected size
                                    isAdding // Already adding to cart
                                }
                                className={clsx(
                                    'w-full px-6 py-3 rounded-md font-medium text-white flex items-center justify-center',
                                    isAdding ? 'bg-slate-400' : 'bg-slate-600 hover:bg-slate-700',
                                    !selectedSize?.stockQuantity && 'opacity-50 cursor-not-allowed'
                                )}
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                {isAdding ? 'Adding...' : 'Thêm vào giỏ hàng'}
                            </button>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800"
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* <Policies /> */}
                    </div>
                </div>

                <div className="mt-12">
                    {/* <h2 className="text-2xl font-bold">Customer Reviews</h2> */}
                    {/* <div className="max-h-96 overflow-y-auto border-t mt-4"> */}
                        <Reviews />
                        
                    {/* </div> */}
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold">Sản phẩm tương tự</h2>
                    {productId && <RelatedProduct productId={productId} />}
                </div>
            </main>
            <Footer />
        </div>
    );
};


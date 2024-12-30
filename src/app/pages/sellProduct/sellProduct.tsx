'use client'
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";
import { Switch } from '@headlessui/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product, fetchCategories, fetchTag, Tag, Category, fetchProductSearch, fetchProductSell, fetchCategoriesProduct } from './typeSellProduct';
import Link from 'next/link';
import ShopProduct from '../products/page';

export default function ProductsPage() {
    const [category, setCategories] = useState<Category[]>([]);
    const [tag, setTag] = useState<Tag[]>([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [product, setProduct] = useState<Product[]>([]);

    // phân trang 
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);


    // Tính tổng số trang
    const totalPages = Math.ceil(product.length / productsPerPage);

    // Hàm thay đổi trang
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    interface FilterParams {
        tags?: string;
        inStock?: boolean;
        minPrice?: number;
        maxPrice?: number;
        categoryId?: number;
        name?: string;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesData, tagData, product] = await Promise.all([fetchCategories(), fetchTag(), fetchProductSell()])
                setProduct(product.data)
                setCategories(categoriesData.data);
                setTag(tagData.data);
                // console.log('category:', category);
                console.log('Product-AAA:', product);
            }

            catch (error) {
                console.error('Error fetching product data:', error);
            }

        };
        fetchData();
    }, [])



    const handleSliderChange = (value: number[]) => {
        setPriceRange(value);
    };

    const toggleInStock = () => {
        setInStockOnly(!inStockOnly);
    };

    const handleTagToggle = (tagId: number) => {
        setSelectedTags((prev) =>
            prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
        );
    };

    const filteredTags = tag.filter((tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async () => {
        try {
            const tagNames = selectedTags
                .map(tagId => {
                    const foundTag = tag.find((t: Tag) => t.id === tagId);
                    return foundTag?.name;
                })
                .filter((name): name is string => name !== undefined) // Type guard
                .join(',');

            const filterParams: FilterParams = {
                tags: tagNames || undefined,
                inStock: inStockOnly || undefined,
                minPrice: priceRange[0] || undefined,
                maxPrice: priceRange[1] || undefined,
                categoryId: selectedCategory || undefined,
                name: searchQuery || undefined,
            };

            // Type-safe way to remove undefined values
            const cleanedParams: FilterParams = Object.fromEntries(
                Object.entries(filterParams).filter(([_, value]) => value !== undefined)
            ) as FilterParams;

            // console.log('Sending filter parameters:', cleanedParams);
            const filteredProducts = await fetchProductSearch(cleanedParams);

            setProduct(filteredProducts.data);
            console.log('Received products:', product);
            setCurrentPage(1);

        } catch (error) {
            console.error('Error during handleSubmit:', error);
        }
    };

    useEffect(() => {
        console.log('Product updated:', product); // Chỉ được gọi khi product thay đổi
    }, [product]);

    useEffect(() => {
        const fetchProductCategory = async () => {
            if (selectedCategory !== null) {
                const data = await fetchCategoriesProduct(selectedCategory);
                setProduct(data.data)
            }
        };
        fetchProductCategory();
    }, [selectedCategory]);

    const handleNavigate = (id: string) => {
        window.location.href = `/pages/products?id=${id}`; // Truyền productId qua query parameter
    };


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold">Filter</h1>
                <div className="flex items-center gap-4">
                    {/* Cập nhật giá trị của input */}
                    <Input
                        placeholder="Search products..."
                        className="w-[300px]"
                        value={searchQuery} // Liên kết giá trị của input với state searchQuery
                        onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật giá trị khi người dùng nhập
                    />
                    <Button onClick={handleSubmit}>Tìm kiếm</Button>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Filters Sidebar */}
                <div className="w-[280px] flex-shrink-0">
                    <div className="space-y-6 sticky top-4">
                        {/* Categories */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                            <h3 className="font-semibold mb-4">Categories</h3>
                            <div className="space-y-3">
                                {category.map((category) => (
                                    <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="category"
                                            value={category.id}
                                            className="peer hidden"
                                            onChange={() => setSelectedCategory(category.id)}
                                        />
                                        <div className="border-2 w-5 h-5 rounded-full transition-colors peer-checked:bg-black peer-checked:border-black group-hover:border-gray-400" />
                                        <span className="text-gray-700 group-hover:text-black">{category.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Tags Dropdown */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                            <label className="block mb-2 font-semibold">Tags</label>
                            <Select
                                onValueChange={(value) => handleTagToggle(Number(value))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select tags..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className="p-2 flex items-center gap-2">
                                        <input
                                            type="text"
                                            placeholder="Search tags"
                                            className="flex-1 p-2 border rounded-md"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />

                                    </div>
                                    {filteredTags.map(tag => (
                                        <SelectItem key={tag.id} value={tag.id.toString()}>
                                            <div className="flex items-center gap-2">
                                                {tag.name}
                                                {selectedTags.includes(tag.id) && (
                                                    <span className="h-2 w-2 bg-primary rounded-full" />
                                                )}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Selected Tags Display */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedTags.map(tagId => {
                                    const selectedTag = tag.find(t => t.id === tagId);
                                    return selectedTag && (
                                        <div
                                            key={tagId}
                                            className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md"
                                        >
                                            {selectedTag.name}
                                            <button
                                                onClick={() => handleTagToggle(tagId)}
                                                className="hover:text-destructive"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                            <h3 className="font-semibold mb-4">Price Range</h3>
                            <div className="px-2">
                                <Slider
                                    min={0}
                                    max={1000}
                                    step={10}
                                    value={priceRange}
                                    onValueChange={handleSliderChange}
                                    className="mb-4"
                                />
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                            </div>
                        </div>

                        {/* In Stock Filter */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">In Stock Only</h3>
                                <Switch
                                    checked={inStockOnly}
                                    onChange={toggleInStock}
                                    className={`${inStockOnly ? 'bg-black' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                                >
                                    <span
                                        className={`${inStockOnly ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                    />
                                </Switch>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <Button onClick={handleSubmit} className="w-full bg-black text-white hover:bg-gray-800">
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    {product.length > 0 ? (
                        <div className="grid grid-cols-3 gap-6">
                            {currentProducts.map((product, index) => (
                                <div key={index} className="group">
                                    <div className="relative aspect-square mb-4">
                                        <img
                                            src={`/api/placeholder/300/300`} // Thay bằng URL ảnh nếu có
                                            alt={product.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            ♡
                                        </button>
                                    </div>
                                    <div>
                                        <h3 className="font-medium cursor-pointer hover:text-black hover:underline transition-all duration-300"
                                            onClick={() => {
                                                handleNavigate(product.id.toString())
                                            }}
                                        >{product.name}</h3>
                                        <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < product.rate ? 'fill-yellow-400' : 'fill-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500">({product.ratingCount})</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {/* Thay đổi giá hiển thị */}
                                                ${product.price || '0.00'}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-2">
                                            <span>Đã bán: {product.sold}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div></div>
                    )}

                    {/* Phân trang */}
                    <div className="flex justify-center mt-8 gap-2">
                        {[...Array(totalPages).keys()].map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page + 1)}
                                className={`w-8 h-8 rounded-full ${currentPage === page + 1 ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                            >
                                {page + 1}
                            </button>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
}

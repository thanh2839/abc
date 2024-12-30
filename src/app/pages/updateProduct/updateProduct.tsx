'use client'
import React, { useEffect, useState } from 'react';
import { getProductByID, Product, Category, Tag, fetchCategories, fetchTag, createTagAPI } from "./Type-update-Product";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";



const GetupdateProduct = () => {
    const [product, setProduct] = useState<Product>({
        name: '',
        categoryId: 1,
        description: '',
        productTags: [],
        productOptions: []
    });

    const [category, setCategories] = useState<Category[]>([]);
    const [tag, setTag] = useState<Tag[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

    // Fetch product data by ID and populate the form
    useEffect(() => {
        const fetchData = async () => {
            try {

                const [categoriesData, tagData] = await Promise.all([fetchCategories(), fetchTag()])
                setCategories(categoriesData.data);
                setTag(tagData.data);
                console.log('category:', category);
                console.log('tag:', tag);

                const fetchedProduct = await getProductByID(2); // Replace 2 with the desired product ID
                // console.log('Fetched Product:', fetchedProduct);
                const product: Product = {
                    name: fetchedProduct.data.name,
                    categoryId: fetchedProduct.data.category,
                    description: fetchedProduct.data.description,
                    productTags: fetchedProduct.data.tags.map(tag => tag.id) || [],
                    productOptions: fetchedProduct.data.options || []
                    // const tagIds = product.productTags.map(tag => tag.id);
                };

                setProduct(product);
                console.log('taaaaag:', product.productTags);
                console.log('Set Product:', product.categoryId.toString());
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData();
    }, []);

    // Filter tags based on search term
    useEffect(() => {
        setFilteredTags(
            tag.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, tag]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string, index?: number) => {
        if (index !== undefined) {
            // Update product options if index is provided (for productOptions)
            setProduct(prev => {
                const updatedOptions = [...prev.productOptions];
                updatedOptions[index] = { ...updatedOptions[index], [field]: e.target.value };
                return { ...prev, productOptions: updatedOptions };
            });
        } else {
            // Update other fields of the product (like name, description, etc.)
            setProduct(prev => ({ ...prev, [field]: e.target.value }));
        }
    };

    const handleTagToggle = (tagId: number) => {
        setProduct(prev => {
            const productTags = prev.productTags.includes(tagId)
                ? prev.productTags.filter(id => id !== tagId)
                : [...prev.productTags, tagId];
            return { ...prev, productTags };
        });
    };

    const handleCreateTag = async (name: string) => {
        try {
            // Call API to create a new tag
            const newTag = await createTagAPI(name);
            setTag(prev => [...prev, newTag]);
            setFilteredTags(prev => [...prev, newTag]);
        } catch (error) {
            console.error('Error creating tag:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic
        console.log('Product submitted:', product);
    };
    // remove ProductOPtion
    const removeProductOption = (indexToRemove: number) => {
        setProduct(prev => ({
            ...prev,
            productOptions: prev.productOptions.filter((_, index) => index !== indexToRemove)
        }));
    };
    // add Product Option
    const addProductOption = () => {
        setProduct(prev => ({
            ...prev,
            productOptions: [
                ...prev.productOptions,
                {
                    name: '',
                    price: 0,
                    salePrice: 0,
                    stockQuantity: 0
                }
            ]
        }));
    };

    const handleDelete = async () => {
        // if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
        
        // try {
        //   await fetch(`/api/products/${productId}`, {
        //     method: 'DELETE'
        //   });
        //   router.push('/products');
        // } catch (error) {
        //   console.error('Error:', error);
        // }
      };
    return (
        <main className="flex flex-col pb-32 bg-white max-md:pb-24">
            <div className="self-center mt-12 w-full max-w-[1339px] max-md:mt-10 max-md:max-w-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Product Information */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2">Tên Sản Phẩm</label>
                            <Input
                                type="text"
                                value={product.name}
                                onChange={(e) => handleInputChange(e, 'name')}
                                placeholder="Nhập tên sản phẩm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Danh Mục</label>
                            <Select
                                value={product.categoryId.toString()}
                                onValueChange={(value) => setProduct(prev => ({ ...prev, categoryId: Number(value) }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn danh mục" />
                                </SelectTrigger>
                                <SelectContent>
                                    {category.map(category => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2">Mô Tả Sản Phẩm</label>
                        <Textarea
                            value={product.description}
                            onChange={(e) => handleInputChange(e, 'description')}
                            placeholder="Nhập mô tả sản phẩm"
                            rows={4}
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block mb-2">Nhãn Sản Phẩm</label>
                        <Select
                            onValueChange={(value) => {
                                handleTagToggle(Number(value));
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn nhãn sản phẩm" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* Input để tìm kiếm */}
                                <div className="p-2 flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm nhãn sản phẩm"
                                        className="flex-1 p-2 border rounded-md"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button
                                        onClick={() => handleCreateTag(searchTerm)}
                                        className="p-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:bg-gray-300"
                                        disabled={!searchTerm.trim() || tag.some(t => t.name.toLowerCase() === searchTerm.toLowerCase())}
                                    >
                                        Tạo tag
                                    </button>
                                </div>
                                {/* Hiển thị danh sách tag dựa trên từ khóa tìm kiếm */}
                                {filteredTags.map(tag => {
                                    // const isSelected = product.productTags.includes(tag.id);
                                    // const tagIds = product.productTags.map(tag => tag.id);
                                    const isSelected = product.productTags.includes(tag.id);
                                    // const isSelected = tagIds.includes(tag.id) || product.productTags.includes(tag.id);
                                    // const isSelected = tagIds.includes(tag.id);
                                    return (
                                        <SelectItem key={tag.id} value={tag.id.toString()}>
                                            <div className="flex items-center gap-2">
                                                {tag.name}
                                                {isSelected && (
                                                    <span className="h-2 w-2 bg-primary rounded-full" />
                                                )}
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>

                        {/* Hiển thị các tags đã chọn */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {product.productTags.map(tagId => {
                                // const tagId = 
                                const selectedTag = tag.find(t => t.id === tagId);
                                console.log("selected: ", selectedTag)
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

                    {/* Product Options */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Các Phiên Bản Sản Phẩm</h3>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addProductOption}
                            >
                                + Thêm Phiên Bản
                            </Button>
                        </div>

                        {/* Hiển thị các phiên bản sản phẩm từ API */}
                        {product.productOptions && product.productOptions.length > 0 ? (
                            product.productOptions.map((option, index) => (
                                <div key={index} className="border rounded-lg p-4 mb-4 relative">
                                    {product.productOptions.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute top-2 right-2"
                                            onClick={() => removeProductOption(index)}
                                        >
                                            Xóa
                                        </Button>
                                    )}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-2">Tên Phiên Bản</label>
                                            <Input
                                                type="text"
                                                value={option.name}
                                                onChange={(e) => handleInputChange(e, 'name', index)}
                                                placeholder="Ví dụ: Màu Đỏ"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2">Giá Gốc</label>
                                            <Input
                                                type="number"
                                                value={option.price}
                                                onChange={(e) => handleInputChange(e, 'price', index)}
                                                placeholder="Nhập giá"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2">Giá Khuyến Mãi</label>
                                            <Input
                                                type="number"
                                                value={option.salePrice}
                                                onChange={(e) => handleInputChange(e, 'salePrice', index)}
                                                placeholder="Nhập giá khuyến mãi"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2">Số Lượng Tồn Kho</label>
                                            <Input
                                                type="number"
                                                value={option.stockQuantity}
                                                onChange={(e) => handleInputChange(e, 'stockQuantity', index)}
                                                placeholder="Nhập số lượng"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500">Chưa có phiên bản sản phẩm</div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Xóa Sản Phẩm
                        </Button>
                        <Button type="submit">
                            Cập Nhật Sản Phẩm
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );

}

export default GetupdateProduct;
'use client'
import React, { useEffect, useState } from 'react';
import { getProductByID, Product, Category, Tag, fetchCategories, fetchTag, createTagAPI, UpdateProduct, deleteProduct } from "./Type-update-Product";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search } from 'lucide-react';
import { ImagePlus } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cloudName = "dsymtu3j5";
const uploadPreset = "shop_Santuary";

const GetupdateProduct = () => {
    const [product, setProduct] = useState<Product>({
        name: '',
        categoryId: 1,
        image: '',
        description: '',
        productTags: [],
        productOptions: []
    });

    const [category, setCategories] = useState<Category[]>([]);
    const [tag, setTag] = useState<Tag[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const [productId, setProductId] = useState('');
    const list: number[] = [];
    const [error, setError] = useState<string | null>(null);

    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const [searchResults, setSearchResults] = useState(null);

    const accessToken = sessionStorage.getItem('accessToken')

    useEffect(() => {
        const fetchData = async () => {
            try {

                const [categoriesData, tagData] = await Promise.all([fetchCategories(), fetchTag()])
                setCategories(categoriesData.data);
                setTag(tagData.data);
                console.log('category:', category);
                console.log('tag:', tag);
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

    const handleSubmit = async (e: React.FormEvent) => {
        // handleUpload();


        e.preventDefault();
        // Handle form submission logic
        console.log('Product submitted:', product);
        if (!accessToken) { return }
        try {
            const response = await UpdateProduct(Number(productId), accessToken)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
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
    const handleSearch = async () => {
        try {
            // Xử lý tìm kiếm sản phẩm ở đây
            const fetchedProduct = await getProductByID(Number(productId));
            // console.log('Fetched Product:', fetchedProduct);
            const product: Product = {
                name: fetchedProduct.data.name,
                categoryId: fetchedProduct.data.category,
                image: fetchedProduct.data.image,
                description: fetchedProduct.data.description,
                productTags: fetchedProduct.data.tags.map(tag => tag.id) || [],
                productOptions: fetchedProduct.data.options || []
                // const tagIds = product.productTags.map(tag => tag.id);
            };

            setProduct(product);
            setSearchResults(fetchedProduct);
            console.log("Aaaaa", fetchedProduct.data.image)
        } catch (e) {
            console.log(e)
        }
    };

    const handleDelete = async () => {
        if (!accessToken) { return }
        try {
            const list: number[] = [];
            list.push(Number(productId))
            const response = await deleteProduct(accessToken, list)
            console.log(response)
            setSearchResults(null)
            // if (response && response.success) {
            //     toast.success("Xóa sản phẩm thành công!"); // Hiển thị thông báo thành công
            // } else {
            //     toast.error("Xóa sản phẩm thất bại!"); // Hiển thị thông báo lỗi nếu không thành công
            // }
        }
        catch (e) {
            console.log(e)
        }
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

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        if (!image) return;

        const imageFormData = new FormData();
        imageFormData.append('file', image);
        imageFormData.append('upload_preset', "shop_Santuary");

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dsymtu3j5/image/upload', {
                method: 'POST',
                body: imageFormData,
            });

            const data = await response.json();
            if (response.ok) {
                setProduct(prev => ({
                    ...prev,
                    image: data.secure_url,
                }));
            }
        } catch (err) {
            console.log('Image upload failed:', err);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        document.getElementById('avatarInput')?.click();
    };

    return (
        <Card className="flex-1 ml-5 max-w-4xl">
            <CardHeader>
                <CardTitle className="text-xl font-medium text-red-500">
                    Thay đổi sản phẩm
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* <main className="flex flex-col pb-32 bg-white max-md:pb-24"> */}
                <div className="self-center mt-12 w-full max-w-[1339px] max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-2 w-full max-w-sm">
                        <Input
                            type="text"
                            placeholder="Nhập ID sản phẩm..."
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="flex-1"
                        />
                        <Button
                            onClick={handleSearch}
                            className="flex items-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            Tìm kiếm
                        </Button>
                    </div>
                    <br></br>
                    {searchResults && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-50 h-50  bg-neutral-100 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={product.image || 'path/to/default-image.jpg'}
                                                    alt="Profile"
                                                    className="w-48 h-48 object-cover"
                                                />
                                            </div>

                                            <Button variant="outline" className="h-10" onClick={handleClick}>
                                                Change Photo
                                            </Button>
                                            <input
                                                id="avatarInput"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </div>
                                        {/* <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                /> */}
                                    </div>
                                </div>
                            </div>
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
                    )}
                </div>
            </CardContent>
        </Card>
    );

}

export default GetupdateProduct;
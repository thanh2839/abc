'use client'

import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product, Category, Tag, fetchCategories, fetchTag, createTagAPI, createProduct } from './typeAddProduct';
import { access } from 'fs';


const AddProductForm = () => {
  const [product, setProduct] = useState<Product>({
    name: '',
    categoryId: 1,
    description: '',
    image: '',
    productTags: [],
    productOptions: []
  });
  const [category, setCategories] = useState<Category[]>([]);
  const [tag, setTag] = useState<Tag[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const accessToken = sessionStorage.getItem('accessToken')


  //search tag
  const [searchTerm, setSearchTerm] = React.useState('');
  // filter tag
  const filteredTags = tag.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, tagData] = await Promise.all([fetchCategories(), fetchTag()])

        setCategories(categoriesData.data);
        setTag(tagData.data);


        console.log('Fetched Tag:', tag);

      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    console.log('Fetched Category:', category);
    // console.log(category);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, // Cập nhật kiểu của e.target
    field: keyof Product | keyof Product['productOptions'][0], // Cho phép field là thuộc tính của Product hoặc thuộc tính của productOptions
    optionIndex: number | null = null
  ) => {
    const { value } = e.target;

    if (optionIndex !== null) {
      // Handle product option changes
      const newProductOptions = [...product.productOptions];
      newProductOptions[optionIndex] = {
        ...newProductOptions[optionIndex],
        [field]: field === 'price' || field === 'salePrice' || field === 'stockQuantity' ? parseFloat(value) : value
      };
      setProduct(prev => ({
        ...prev,
        productOptions: newProductOptions
      }));
    } else {
      // Handle main product field changes
      setProduct(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };



  const handleTagToggle = (tagId: number) => {
    setProduct(prev => {
      const currentTags = prev.productTags || [];
      const newTags = currentTags.includes(tagId)
        ? currentTags.filter(id => id !== tagId)
        : [...currentTags, tagId];

      return {
        ...prev,
        productTags: newTags
      };
    });
  };

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

  const removeProductOption = (indexToRemove: number) => {
    setProduct(prev => ({
      ...prev,
      productOptions: prev.productOptions.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form data
    console.log('Product to be submitted:', product);
    // TODO: Add API call to submit product
    if (!accessToken) { return }
    try {
      const response = await createProduct(product, accessToken)
      console.log(response)
    }catch (e) {
      console.log(e)
    }
  };

  //call Api create Tag
  const handleCreateTag = async (tagName: string) => {
    if (!tagName.trim()) return;

    try {
      const newTag = await createTagAPI(tagName); // Gọi API để tạo tag
      setTag([...tag, newTag]); // Cập nhật danh sách tag
      handleTagToggle(newTag.id); // Tự động thêm tag mới vào danh sách chọn
      setSearchTerm(''); // Xóa từ khóa tìm kiếm
      alert('Tag mới đã được tạo!');
    } catch (error) {
      console.error('Lỗi khi tạo tag:', error);
      alert('Không thể tạo tag. Vui lòng thử lại.');
    }
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
          Thêm sản phẩm
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="self-center mt-12 w-full max-w-[1339px] max-md:mt-10 max-md:max-w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload Product Image */}
            <div>
              <div className="flex items-center space-x-4">
                <div className="w-50 h-50  bg-neutral-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image || 'path/to/default-image.jpg'}
                    alt="Profile"
                    className="w-48 h-48 object-cover"
                  />
                </div>

                <Button variant="outline" className="h-10" onClick={handleClick}>
                  Đổi ảnh
                </Button>
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
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
                    const isSelected = product.productTags.includes(tag.id);
                    return (
                      <SelectItem
                        key={tag.id}
                        value={tag.id.toString()}
                      >
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

              {product.productOptions.map((option, index) => (
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
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" className="w-full">
                Thêm Sản Phẩm
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;

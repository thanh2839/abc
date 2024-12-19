'use client'

import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Product , Category, Tag, fetchCategories, fetchTag} from './typeAddProduct';
import ApiRoutes from '@/app/services/Api';
import { error } from 'console';

const AddProductForm = () => {
  const [product, setProduct] = useState<Product>({
    name: '',
    categoryId: 1, 
    description: '',
    productTags: [],
    productOptions: []
  });
  const [category, setCategories] = useState<Category[]>([]);
  const [ tag , setTag] = useState<Tag[]>([]);
  
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
  }, [] );



  // const categories = [
  //   { id: 1, name: 'Áo' },
  //   { id: 2, name: 'Quần' },
  //   { id: 3, name: 'Phụ kiện' }
  // ];

  // const availableTags = [
  //   { id: 1, name: 'Mùa hè' },
  //   { id: 2, name: 'Thể thao' },
  //   { id: 3, name: 'Casual' }
  // ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form data
    console.log('Product to be submitted:', product);
    // TODO: Add API call to submit product
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
          <div className="flex flex-wrap gap-2">
            {tag.map(tag => (
              <Button
                key={tag.id}
                type="button"
                variant={product.productTags.includes(tag.id) ? 'default' : 'outline'}
                onClick={() => handleTagToggle(tag.id)}
                size="sm"
              >
                {tag.name}
              </Button>
            ))}
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
    </main>
  );
};

export default AddProductForm;

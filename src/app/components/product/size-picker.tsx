'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { ShoppingCart } from 'lucide-react';
import { product } from '../../app/data';

export function SizePicker() {
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  const basePrice = product.price || 99.99;
  const totalPrice = basePrice * quantity;

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize.inStock) return;
    
    setIsAdding(true);
    
    // Simulate adding to cart - replace with your actual cart logic
    setTimeout(() => {
      setIsAdding(false);
      // Add your cart logic here
      console.log('Added to cart:', {
        size: selectedSize,
        quantity,
        totalPrice
      });
    }, 1000);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Size</h2>
        <a
          href="#"
          className="text-sm font-medium text-slate-600 hover:text-slate-500"
        >
          See sizing chart
        </a>
      </div>

      <RadioGroup
        value={selectedSize}
        onChange={setSelectedSize}
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {product.sizes.map((size) => (
            <RadioGroup.Option
              key={size.name}
              value={size}
              className={({ active, checked }) =>
                clsx(
                  size.inStock
                    ? 'cursor-pointer focus:outline-none'
                    : 'cursor-not-allowed opacity-25',
                  active ? 'ring-2 ring-slate-500 ring-offset-2' : '',
                  checked
                    ? 'border-transparent bg-slate-600 text-white hover:bg-slate-700'
                    : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                  'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1',
                )
              }
              disabled={!size.inStock}
            >
              <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      {/* Quantity and Price Section */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-900">Quantity:</span>
          <div className="flex items-center border border-gray-200 rounded">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 border-r border-gray-200 hover:bg-gray-50"
              type="button"
            >
              -
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 border-l border-gray-200 hover:bg-gray-50"
              type="button"
            >
              +
            </button>
          </div>
        </div>

        <div className="text-right">
          <span className="text-sm font-medium text-gray-900">Total Price:</span>
          <p className="text-lg font-semibold text-slate-900">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-6">
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize.inStock || isAdding}
          className={clsx(
            'w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-md text-base font-medium text-white',
            'transition-all duration-200 ease-in-out',
            isAdding ? 'bg-slate-400' : 'bg-slate-600 hover:bg-slate-700',
            !selectedSize.inStock && 'cursor-not-allowed opacity-50'
          )}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </span>
        </button>
        {!selectedSize.inStock && (
          <p className="mt-2 text-sm text-red-600 text-center">
            Please select an available size
          </p>
        )}
      </div>
    </div>
  );
}
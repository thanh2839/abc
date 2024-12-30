'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartItemProps {
  item: CartProduct;
  onQuantityChange: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange }) => {
  const { id, name, price, quantity, image } = item;
  const subtotal = price * quantity;

  return (
    <Card className="mt-4">
      <CardContent className="flex items-center p-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Image and Name container */}
          <div className="flex items-center gap-4 w-2/5">
            {image ? (
              <img
                src={image}
                alt={name}
                className="object-contain w-16 h-16"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-100 rounded" />
            )}
            <h3 className="font-medium">{name}</h3>
          </div>

          {/* Price, Quantity, Subtotal */}
          <div className="flex items-center justify-between flex-1 gap-8">
            <span className="text-gray-600 w-24">${price.toFixed(2)}</span>
            
            <Input
              type="number"
              value={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value) || 1;
                if (newQuantity > 0) {
                  onQuantityChange(id, newQuantity);
                }
              }}
              className="w-20 text-center"
              min="1"
              aria-label={`Quantity for ${name}`}
            />
            
            <span className="font-medium w-24 text-right">${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([
    {
      id: '1',
      name: "LCD Monitor",
      price: 650,
      quantity: 1,
    },
    {
      id: '2',
      name: "H1 Gamepad",
      price: 550,
      quantity: 2,
      image: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/4ef510b12c0bdbd71683ed3f0134b4f59ce3d3b124d6b4f0f7a3cdb0e6f2c7cb"
    }
  ]);

  const [couponCode, setCouponCode] = useState('');

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader className="flex justify-between p-4 border-b">
          <div className="grid grid-cols-12 w-full">
            <div className="col-span-5">Product</div>
            <div className="col-span-7 grid grid-cols-3">
              <span>Price</span>
              <span>Quantity</span>
              <span className="text-right">Subtotal</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between flex-wrap gap-8">
        <div className="flex gap-4">
          <Button variant="outline" className="whitespace-nowrap">
            Return To Shop
          </Button>
          <Button variant="outline" className="whitespace-nowrap">
            Update Cart
          </Button>
        </div>

        <div className="flex gap-4">
          <Input
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Coupon Code"
            className="w-48"
          />
          <Button variant="destructive">
            Apply Coupon
          </Button>
        </div>
      </div>

      <Card className="mt-8 max-w-md ml-auto">
        <CardHeader>
          <h2 className="text-xl font-semibold">Cart Total</h2>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex justify-between py-2 border-b">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b">
            <span>Shipping:</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          
          <div className="flex justify-between py-2 font-medium">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Button variant="destructive" className="w-full mt-4">
            Proceed to Checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartPage;
'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { fetchDataCart, deleteItem, fetchAdjustQuantityCart } from './typeCart';

interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  optionName?: string;
}

interface CartItemProps {
  item: CartProduct;
  onQuantityChange: (id: string, quantity: number) => void;
  onDelete: (id: string) => void;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  })
    .format(price)
    .replace(/,/g, '.');
};

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onDelete }) => {
  const { id, name, price, quantity, image, optionName } = item;
  const subtotal = price * quantity;

  return (
    <Card className="mt-4">
      <CardContent className="flex items-center p-4">
        <div className="flex items-center gap-4 flex-1">
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
            <div className="flex flex-col">
              <h3 className="font-medium">{name}</h3>
              {optionName && (
                <span className="text-sm text-gray-500">Option: {optionName}</span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between flex-1 gap-8">
            <span className="text-gray-600 w-24">{formatPrice(price)} VNĐ</span>

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

            <span className="font-medium w-32 text-right">{formatPrice(subtotal)} VNĐ</span>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              aria-label={`Delete ${name} from cart`}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const idUser = sessionStorage.getItem('UserId');
  const accessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (idUser && accessToken) {
      fetchDataCart(Number(idUser), accessToken)
        .then((data) => {
          const updatedCartItems: CartProduct[] = data.items.map((item: any) => {
            const selectedOption = item.productOptions.find(
              (option: any) => option.id === item.option
            );
            const price = selectedOption.price;
            return {
              id: item.option,
              name: item.name,
              price: price,
              quantity: item.quantity,
              image: item.image || "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/4ef510b12c0bdbd71683ed3f0134b4f59ce3d3b124d6b4f0f7a3cdb0e6f2c7cb",
              optionName: selectedOption.name
            };
          });

          console.log("Cart items updated:", updatedCartItems);
          setCartItems(updatedCartItems);
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    } else {
      console.error("UserId or accessToken is missing in session storage.");
    }
  }, [idUser, accessToken]);

  const [couponCode, setCouponCode] = useState('');

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDeleteItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    console.log("AAAbd Item: ", id);
    if (idUser && accessToken) {
      deleteItem(Number(idUser), accessToken, Number(id)).then(() => {
        console.log("Item successfully deleted from the server:", id);
      })
        .catch(error => {
          console.error("Error deleting item from server:", error);
        });
    }
  };

  const handleCheckout = () => {
    if (idUser && accessToken) {
      const itemsToCheckout = cartItems.map(item => ({
        productOptionId: item.id,
        quantity: item.quantity,
      }));
      fetchAdjustQuantityCart(Number(idUser), accessToken, itemsToCheckout).then(() => {
        console.log("Cart quantities adjusted successfully.");
        window.location.href = '/pages/checkOut';
      }).catch (e => {
        console.error("Error during checkout:", e);
      })
    }

    console.log("Checkout Items:");
    cartItems.forEach(item => {
      console.log(`Product ID: ${item.id}, Quantity: ${item.quantity}`);
    });
  }


  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader className="flex justify-between p-4 border-b">
          <div className="grid grid-cols-12 w-full">
            <div className="col-span-5">Sản phẩm</div>
            <div className="col-span-7 grid grid-cols-4">
              <span>Giá</span>
              <span>Số lượng</span>
              <span className="text-right">Tổng giá</span>
              <span className="text-right">Xóa</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onDelete={handleDeleteItem}
            />
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between flex-wrap gap-8">
        <div className="flex gap-4">
          {/* <Button variant="outline" className="whitespace-nowrap">
            Return To Shop
          </Button> */}
          {/* <Button variant="outline" className="whitespace-nowrap">
            Xóa giỏ hàng
          </Button> */}
        </div>

        {/* <div className="flex gap-4">
          <Input
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Coupon Code"
            className="w-48"
          />
          <Button variant="destructive">
            Apply Coupon
          </Button>
        </div> */}
      </div>

      <Card className="mt-8 max-w-md ml-auto">
        <CardHeader>
          <h2 className="text-xl font-semibold">Tổng tiền</h2>
        </CardHeader>

        <CardContent className="space-y-4">

          <div className="flex justify-between py-2 font-medium">
            <span>Total:</span>
            <span>{formatPrice(total)} VNĐ</span>
          </div>

          <Button
            variant="destructive"
            className="w-full mt-4"
            onClick={handleCheckout}
          >
            Thanh toán
          </Button>

        </CardContent>
      </Card>
    </div>
  );
};

export default CartPage;
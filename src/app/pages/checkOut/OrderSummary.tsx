'use client'
import * as React from "react";
import { useState, useEffect } from "react";
import { fetchDataCart } from "../Cart/typeCart";
import { fetchGetAllPayment, FormValues, fetchCreateOrder, OrderDetail } from "./TypeCheckOut";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  optionName?: string;
}

interface ShippingMethod {
  id: number;
  name: string;
  cost: string;
  estimatedShipping: string;
  isInner: boolean;
}

interface PaymentMethod {
  id: number;
  name: string;
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

interface OrderSummaryProps {
  formValues: FormValues | undefined;
  selectedShippingMethod: ShippingMethod | undefined;
}

export function OrderSummary({ formValues, selectedShippingMethod }: OrderSummaryProps) {

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<number>(1);
  const [couponCode, setCouponCode] = useState("");
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const idUser = sessionStorage.getItem('UserId');
  const accessToken = sessionStorage.getItem('accessToken');


  useEffect(() => {
    const fetchCart = async () => {
      if (!idUser || !accessToken) {
        setError("Please log in to view your cart");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await fetchDataCart(Number(idUser), accessToken);
        const dataPayment = await fetchGetAllPayment(accessToken);
        setPaymentMethods(dataPayment);

        const updatedCartItems: OrderItem[] = data.items.map((item: any) => {
          const selectedOption = item.productOptions.find(
            (option: any) => option.id === item.option
          );
          if (!selectedOption) {
            throw new Error(`Product option not found for item: ${item.name}`);
          }

          return {
            id: item.option,
            name: item.name,
            price: selectedOption.price,
            quantity: item.quantity,
            image: item.image || "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/4ef510b12c0bdbd71683ed3f0134b4f59ce3d3b124d6b4f0f7a3cdb0e6f2c7cb",
            optionName: selectedOption.name
          };
        });

        setCartItems(updatedCartItems);
        setError(null);
      } catch (err) {
        setError("Failed to load cart items. Please try again later.");
        console.error("Error fetching cart data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [idUser, accessToken]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = selectedShippingMethod ? parseInt(selectedShippingMethod.cost) : 0;
  const shippingSelected = selectedShippingMethod ? selectedShippingMethod.id : 0;
  const total = subtotal + shippingCost;

  const handleApplyCoupon = () => {
    console.log("Applying coupon:", couponCode);
  };

  const handlePlaceOrder = async () => {
    if (!idUser || !accessToken) {
      setError("Please log in to place an order");
      return;
    }
    const itemsToCheckout = cartItems.map(item => ({
      productOptionId: item.id,
      quantity: item.quantity,
    }));

    try {
      const data = await fetchCreateOrder(
        Number(idUser), 
        accessToken, 
        formValues?.streetAddress || "", 
        selectedPayment, 
        shippingSelected, 
        itemsToCheckout
      );

      if (data) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          window.location.href = '/pages/shop'
        }, 3000);
      }
    } catch (e) {
      console.error("Error during checkout:", e);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col w-[400px] bg-gray-50 p-6 rounded-lg max-md:w-full">
        <p className="text-center">Loading order summary...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-[400px] bg-gray-50 p-6 rounded-lg max-md:w-full">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <section
      className="flex flex-col w-[400px] bg-gray-50 p-6 rounded-lg max-md:w-full"
      aria-label="Order Summary"
    >
      <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="flex flex-col space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-center"
            >
              <img
                loading="lazy"
                src={item.image}
                alt={`${item.name} product image`}
                className="w-[54px] h-[54px] object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-800">{item.name}</span>
                    {item.optionName && (
                      <p className="text-sm text-gray-500">{item.optionName}</p>
                    )}
                  </div>
                  <span className="font-medium">{formatPrice((item.price * item.quantity))} VNĐ</span>
                </div>
                <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Method */}
      <div className="mt-8">
        <h3 className="font-medium mb-4">Payment Method</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex gap-4 items-center">
              <input
                type="radio"
                id={`payment-${method.id}`}
                name="payment"
                value={method.id}
                checked={selectedPayment === method.id}
                onChange={(e) => setSelectedPayment(Number(e.target.value))}
                className="w-5 h-5 text-red-500 border-gray-300"
              />
              <label
                htmlFor={`payment-${method.id}`}
                className="text-gray-700"
              >
                {method.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex flex-col mt-6 space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)} VNĐ</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{formatPrice(shippingCost)} VNĐ</span>
        </div>
        <div className="flex justify-between text-lg font-semibold pt-4 border-t">
          <span>Total</span>
          <span>{formatPrice(total)} VNĐ</span>
        </div>
      </div>

      {/* Coupon */}
      <div className="mt-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Coupon Code"
            className="flex-1 px-4 py-3 border rounded"
          />
          <button
            onClick={handleApplyCoupon}
            className="px-6 py-3 bg-red-500 text-white rounded font-medium hover:bg-red-600 disabled:opacity-50"
            disabled={!couponCode}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        disabled={cartItems.length === 0}
        className="w-full mt-8 px-8 py-4 bg-red-500 text-white rounded font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Place Order
      </button>

      {/* Success Dialog */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md flex flex-col items-center p-6">
          <div className="animate-bounce mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Cảm ơn vì đã mua. Đơn hàng của bạn đang được xử lý
          </p>
          <div className="w-full bg-green-100 p-4 rounded-lg">
            <p className="text-sm text-green-800 text-center">
              Đang chuyển sang trang Shop
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

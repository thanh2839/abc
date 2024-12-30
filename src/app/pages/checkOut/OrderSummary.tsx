'use client'
import * as React from "react";
import { useState } from "react";

interface OrderItem {
  image: string;
  name: string;
  price: number;
  alt: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  selected: boolean;
}

export function OrderSummary() {
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [couponCode, setCouponCode] = useState("");

  const orderItems: OrderItem[] = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/4ef510b12c0bdbd71683ed3f0134b4f59ce3d3b124d6b4f0f7a3cdb0e6f2c7cb?apiKey=107937b03e68408b93e8f13d8a143773&",
      name: "LCD Monitor",
      price: 650,
      alt: "LCD Monitor product image"
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/50183c6a595689dc52a6d5657261e924c442ed273a138200ac4bea43a44859b7?apiKey=107937b03e68408b93e8f13d8a143773&",
      name: "H1 Gamepad",
      price: 1100,
      alt: "H1 Gamepad product image"
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    { id: "bank", name: "Bank Transfer", selected: false },
    { id: "cash", name: "Cash on delivery", selected: true }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal; // Add shipping cost here if needed

  return (
    <section 
      className="flex flex-col w-[400px] bg-gray-50 p-6 rounded-lg max-md:w-full" 
      aria-label="Order Summary"
    >
      <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

      <div className="flex flex-col space-y-6">
        {orderItems.map((item, index) => (
          <div 
            key={index} 
            className="flex gap-4 items-center"
          >
            <img
              loading="lazy"
              src={item.image}
              alt={item.alt}
              className="w-[54px] h-[54px] object-cover rounded"
            />
            <div className="flex justify-between items-center flex-1">
              <span className="text-gray-800">{item.name}</span>
              <span className="font-medium">${item.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col mt-6 space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between text-lg font-semibold pt-4 border-t">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-medium mb-4">Payment Method</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex gap-4 items-center">
              <input
                type="radio"
                id={method.id}
                name="payment"
                value={method.id}
                checked={selectedPayment === method.id}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-5 h-5 text-red-500 border-gray-300"
              />
              <label 
                htmlFor={method.id} 
                className="text-gray-700"
              >
                {method.name}
              </label>
            </div>
          ))}
        </div>
      </div>

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
            className="px-6 py-3 bg-red-500 text-white rounded font-medium hover:bg-red-600 disabled:opacity-50"
            disabled={!couponCode}
          >
            Apply
          </button>
        </div>
      </div>

      <button
        className="w-full mt-8 px-8 py-4 bg-red-500 text-white rounded font-medium hover:bg-red-600 transition-colors"
      >
        Place Order
      </button>
    </section>
  );
}
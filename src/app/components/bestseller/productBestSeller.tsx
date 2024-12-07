import * as React from "react";
import { ProductCard } from "./productcard";
import { ProductData } from "../../pages/products/product";

const productData: ProductData[] = [
    {
      name: "T-Shirt",
      categoryid: 1,
      description: "High-quality cotton T-shirt.",
      imageUrl: "https://example.com/images/tshirt.jpg",
      productTags: [1, 2],
      productOptions: [
        { name: "Red", price: 150000, salePrice: 140000, stockQuantity: 20 },
        { name: "Blue", price: 150000, salePrice: 140000, stockQuantity: 15 },
      ],
      buttonColor: "bg-blue-500",
    },
    {
      name: "Jeans",
      categoryid: 2,
      description: "Comfortable and durable denim jeans.",
      imageUrl: "https://example.com/images/jeans.jpg",
      productTags: [3],
      productOptions: [
        { name: "Black", price: 300000, salePrice: 290000, stockQuantity: 10 },
      ],
      buttonColor: "bg-gray-600",
    },
    {
      name: "Sneakers",
      categoryid: 3,
      description: "Stylish and comfortable sneakers.",
      imageUrl: "https://example.com/images/sneakers.jpg",
      productTags: [1, 4],
      productOptions: [
        { name: "White", price: 500000, salePrice: 450000, stockQuantity: 25 },
        { name: "Black", price: 500000, salePrice: 450000, stockQuantity: 30 },
      ],
      buttonColor: "bg-black",
    },
    {
      name: "Hat",
      categoryid: 4,
      description: "Classic baseball cap.",
      imageUrl: "https://example.com/images/hat.jpg",
      productTags: [5],
      buttonColor: "bg-red-400",
    },
    {
      name: "Backpack",
      categoryid: 5,
      description: "Durable and spacious backpack.",
      imageUrl: "https://example.com/images/backpack.jpg",
      productTags: [6, 7],
      productOptions: [
        { name: "Green", price: 250000, salePrice: 230000, stockQuantity: 50 },
      ],
      buttonColor: "bg-green-500",
    },
    {
      name: "Watch",
      categoryid: 6,
      description: "Stylish wristwatch for everyday wear.",
      imageUrl: "https://example.com/images/watch.jpg",
      productTags: [8],
      buttonColor: "bg-gray-800",
    },
    {
      name: "Sunglasses",
      categoryid: 7,
      description: "UV-protection sunglasses.",
      imageUrl: "https://example.com/images/sunglasses.jpg",
      productTags: [1, 9],
      buttonColor: "bg-yellow-500",
    },
    {
      name: "Jacket",
      categoryid: 8,
      description: "Lightweight and warm jacket.",
      imageUrl: "https://example.com/images/jacket.jpg",
      productTags: [2, 10],
      productOptions: [
        { name: "Gray", price: 600000, salePrice: 550000, stockQuantity: 15 },
      ],
      buttonColor: "bg-teal-400",
    },
    {
      name: "Shorts",
      categoryid: 9,
      description: "Comfortable and breathable shorts.",
      imageUrl: "https://example.com/images/shorts.jpg",
      productTags: [3, 7],
      buttonColor: "bg-blue-300",
    },
    {
      name: "Socks",
      categoryid: 10,
      description: "Soft and durable socks.",
      imageUrl: "https://example.com/images/socks.jpg",
      productTags: [4],
      buttonColor: "bg-white",
    },
  ];

export const BestSellingProduct: React.FC = () => {
  return (
    <section className="flex overflow-hidden overflow-x-auto gap-2.5 items-start pt-2.5 pl-2.5 bg-white ml-28">
      <div className="flex flex-col w-64 min-w-[240px]">
        <div className="flex flex-col w-64 max-w-full">
          <h1 className="text-3xl font-bold text-stone-900">
            Best Selling Plants
          </h1>
          <p className="mt-3 text-lg font-medium text-stone-900 text-opacity-50">
            Easiest way to healthy life by buying your favorite plants
          </p>
        </div>
        <button 
          className="flex gap-2.5 items-center self-start px-6 py-3 mt-6 text-lg font-medium rounded-lg bg-slate-300 text-stone-900 max-md:px-5"
          aria-label="See more plants"
        >
          <span className="self-stretch my-auto">See more</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/c037047510b6bf2e65eb6bc15b379339490b38340175df263ec593d02633ef31?apiKey=107937b03e68408b93e8f13d8a143773&"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-[1.2]"
          />
        </button>
      </div>
      <div className="flex overflow-hidden overflow-x-auto flex-col pb-5 min-w-[240px] w-[1661px] max-md:max-w-full">
        <div className="flex overflow-hidden flex-wrap gap-6 items-start p-2.5 bg-white max-md:max-w-full">
          {productData.slice(0, 5).map((p) => (
            <ProductCard
              key={p.categoryid}
              imageUrl={p.imageUrl}
              name={p.name}
              price={"1000"}
              buttonColor={p.buttonColor}
            />
          ))}
        </div>
        <div className="flex overflow-hidden flex-wrap gap-6 items-start p-2.5 mt-5 max-md:max-w-full">
          {productData.slice(5, 10).map((p) => (
            <ProductCard
              key={p.categoryid}
              imageUrl={p.imageUrl}
              name={p.name}
              price={"1000"}
              buttonColor={p.buttonColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
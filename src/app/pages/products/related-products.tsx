'use client'
import relatedProduct from './page';
import Image from 'next/image';
import { useState } from 'react';

export function RelatedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("RelateAAA: ",relatedProduct.data)
  const maxIndex = relatedProduct.length - 5; // Đảm bảo chỉ có 5 sản phẩm hiển thị

  // Hàm để cuộn sang phải
  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Hàm để cuộn sang trái
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section aria-labelledby="related-heading" className="mt-16 sm:mt-5">
      {/* <h2 id="related-heading" className="text-lg font-medium text-gray-900">
        Customers also purchased
      </h2> */}

      <div className="relative mt-6">
        <div className="flex overflow-hidden space-x-6 pb-4">
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 350}px)` }}>
            <div className="flex gap-[20px]">
              {/* {relatedProduct.slice(0, 10).map((product) => (
                <div key={product.id} className="group relative w-64">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md group-hover:opacity-75 bg-gray-200">
                    <Image
                      src={product.imageSrc || "/placeholder-image.png"} // Replace with a default placeholder if no image
                      alt={product.name || "Product image"}
                      className="h-full w-full object-cover object-center"
                      width={256}
                      height={256}
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={`/shop-product/${product.id}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.category?.name}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price ? `${product.price.toLocaleString()} VNĐ` : "N/A"}
                    </p>
                  </div>
                </div>
              ))} */}

            </div>
          </div>

        </div>

        {/* Nút cuộn */}
        <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-between items-center px-2 py-4">
          <button
            onClick={handlePrev}
            className="bg-gray-800 text-white p-2 rounded-full transform -translate-y-7"
            disabled={currentIndex === 0}
          >
            &#60;
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-800 text-white p-2 rounded-full transform -translate-y-7"
            disabled={currentIndex === maxIndex}
          >
            &#62;
          </button>
        </div>


      </div>
    </section>
  );
}

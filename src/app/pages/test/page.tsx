import * as React from "react";
import ProductImageGallery from "./ProductImageGallery";

interface ColorOption {
  color: string;
  selected?: boolean;
}

interface SizeOption {
  label: string;
  selected?: boolean;
}

const ProductDetails: React.FC = () => {
  const thumbnails = [
    { src: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/719bd194bdb06b102b7a94c888c6e5f9f5cc6707697256ba87b415c95cc37083?apiKey=107937b03e68408b93e8f13d8a143773&", alt: "Product thumbnail 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/2bfa799c6c23b52ca624e01dd78d7eed2d31f7fe88138b496ad1a07210360afd?apiKey=107937b03e68408b93e8f13d8a143773&", alt: "Product thumbnail 2" },
    { src: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/cc182a9deb8f7e073a23cfeb02bb63d006f72b9465f7d0f896c42da396479109?apiKey=107937b03e68408b93e8f13d8a143773&", alt: "Product thumbnail 3" },
    { src: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/3d263a612cc789faf0108e039bfd4364303d009e641f4e2520fbf88aa1608da8?apiKey=107937b03e68408b93e8f13d8a143773&", alt: "Product thumbnail 4" },
  ];

  const mainImage = {
    src: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/10996276eabfcd881e2e8c8c41b66f0ecbf43032de670185029bac10af65ae81?apiKey=107937b03e68408b93e8f13d8a143773&",
    alt: "Havic HV G-92 Gamepad main product image",
  };

  const colorOptions: ColorOption[] = [
    { color: "bg-indigo-300", selected: true },
    { color: "bg-red-400" },
  ];

  const sizeOptions: SizeOption[] = [
    { label: "XS" },
    { label: "S" },
    { label: "M", selected: true },
    { label: "L" },
    { label: "XL" },
  ];

  return (
    <div className="rounded-none" role="main">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[64%] max-md:ml-0 max-md:w-full">
          <div className="grow max-md:mt-10 max-md:max-w-full">
            <ProductImageGallery thumbnails={thumbnails} mainImage={mainImage} />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[36%] max-md:ml-0 max-md:w-full">
          <section className="flex flex-col items-start w-full max-md:mt-10">
            <h1 className="text-2xl font-semibold tracking-wider leading-none text-black">
              Havic HV G-92 Gamepad
            </h1>
            <div className="flex gap-4 items-start mt-4 text-sm">
              <div className="flex gap-2 items-start text-black">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/c35d903ef32712f74f1d691c7776b06b738b9c9c861a4482d47d9f9e4b9b6d4a?apiKey=107937b03e68408b93e8f13d8a143773&"
                  alt="Product rating"
                  className="object-contain shrink-0 aspect-[5] w-[100px]"
                />
                <div className="opacity-50" aria-label="150 Reviews">(150 Reviews)</div>
              </div>
              <div className="flex gap-4 items-center text-green-500">
                <div className="shrink-0 self-stretch my-auto w-0 h-4 bg-black border border-black border-solid opacity-50" />
                <div className="self-stretch my-auto opacity-60">In Stock</div>
              </div>
            </div>
            <div className="mt-4 text-2xl tracking-wider leading-none text-black">
              $192.00
            </div>
            <p className="self-stretch mt-6 mr-7 text-sm leading-5 text-black max-md:mr-2.5">
              PlayStation 5 Controller Skin High quality vinyl with air channel
              adhesive for easy bubble free install & mess free removal Pressure
              sensitive.
            </p>
            <hr className="shrink-0 self-stretch mt-6 h-px bg-black border border-black border-solid" />
            <div className="flex gap-6 items-start mt-6" role="group" aria-label="Color selection">
              <div className="text-xl tracking-wide leading-none text-black">
                Colours:
              </div>
              <div className="flex gap-2 items-start">
                {colorOptions.map((option, index) => (
                  <button
                    key={index}
                    className={`flex flex-col w-5 h-5 rounded-full ${
                      option.selected ? "border-2 border-black" : ""
                    }`}
                    aria-label={`Select color ${index + 1}`}
                  >
                    <div className={`flex shrink-0 w-3 h-3 ${option.color} rounded-full`} />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-6 items-center mt-6" role="group" aria-label="Size selection">
              <div className="text-xl tracking-wide leading-none text-black">
                Size:
              </div>
              <div className="flex gap-4 items-start text-sm font-medium text-black">
                {sizeOptions.map((size, index) => (
                  <button
                    key={index}
                    className={`overflow-hidden px-2 py-1.5 w-8 rounded ${
                      size.selected
                        ? "bg-red-500 text-neutral-50"
                        : "border border-solid border-black border-opacity-50"
                    }`}
                    aria-label={`Select size ${size.label}`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 self-stretch mt-6 w-full font-medium">
              <div className="flex items-center gap-0 text-xl leading-snug text-black">
                <button
                  aria-label="Decrease quantity"
                  className="object-contain shrink-0 w-10 rounded"
                >
                  <img src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/ed9ed51dc91da1a317a6ec57e005b4e5f8a1b0bff1721c29819dbbc2af1e9ae3?apiKey=107937b03e68408b93e8f13d8a143773&" alt="" />
                </button>
                <div className="overflow-hidden px-9 py-2 w-20 border-t border-b border-black border-opacity-50 max-md:px-5">
                  2
                </div>
                <button
                  aria-label="Increase quantity"
                  className="object-contain shrink-0 w-10 rounded"
                >
                  <img src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/a09c076caa5a0aa0236a51fa2801afde79e8017a579e89aa6abb403c0af33200?apiKey=107937b03e68408b93e8f13d8a143773&" alt="" />
                </button>
              </div>
              <button className="gap-2.5 px-12 py-2.5 text-base bg-red-500 rounded text-neutral-50 max-md:px-5">
                Buy Now
              </button>
              <button
                aria-label="Add to wishlist"
                className="object-contain shrink-0 self-start rounded w-[41px]"
              >
                <img src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/96b388edb85323f98c8e7e985856939fb1e202a7b2c62362d9367fbfb2293b30?apiKey=107937b03e68408b93e8f13d8a143773&" alt="" />
              </button>
            </div>
            <div className="flex overflow-hidden flex-col items-start self-stretch py-6 mt-10 w-full font-medium rounded border border-solid border-black border-opacity-50">
              <div className="flex gap-4 items-center ml-4 max-md:ml-2.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/2a23f35277ec287bdea2870638bbdacf171666c11a657aa3e10b9901a2334e8b?apiKey=107937b03e68408b93e8f13d8a143773&"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
                />
                <div className="flex flex-col self-stretch my-auto min-w-[240px]">
                  <div className="text-base text-black">Free Delivery</div>
                  <div className="mt-2 text-xs text-black">
                    Enter your postal code for Delivery Availability
                  </div>
                </div>
              </div>
              <hr className="shrink-0 self-stretch mt-4 h-px bg-black border border-black border-solid" />
              <div className="flex gap-4 items-center mt-4 ml-4 text-black max-md:ml-2.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/e8eb9d4232c5c4b5fb4e8c5b395d852ff88717160dc1ebc4089000daaa178e67?apiKey=107937b03e68408b93e8f13d8a143773&"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
                />
                <div className="flex flex-col self-stretch my-auto">
                  <div className="text-base">Return Delivery</div>
                  <div className="mt-2 text-xs leading-5">
                    <button className="underline">Free 30 Days Delivery Returns. Details</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
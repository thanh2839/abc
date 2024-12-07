import * as React from "react";
import { ProductCardProps } from "../../pages/products/product";

export const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, price, name, buttonColor }) => {
  return (
    <article className="flex flex-col items-center px-3.5 py-3.5 bg-white rounded-2xl border border-solid border-zinc-400 min-w-[240px] shadow-[0px_4px_20px_rgba(0,0,0,0.25)] w-[309px]">
      <img
        loading="lazy"
        src={imageUrl}
        alt={`${name} plant`}
        className="object-contain max-w-full rounded-xl aspect-[0.82] w-[281px]"
      />
      <div className="flex flex-col mt-3 text-lg font-medium">
        <h3 className="text-stone-900">{name}</h3>
        <div className="mt-2 text-stone-900 text-opacity-50">₫ {price}</div>
      </div>
      <button 
        className={`gap-2.5 self-stretch mt-3 max-w-full text-base text-white ${buttonColor} rounded-lg min-h-[35px] w-[158px]`}
        aria-label={`Add ${name} to cart`}
      >
        Add to cart
      </button>
    </article>
  );
};
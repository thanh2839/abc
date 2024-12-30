import * as React from "react";

interface ThumbnailProps {
  src: string;
  alt: string;
}

const ProductThumbnail: React.FC<ThumbnailProps> = ({ src, alt }) => (
  <div className="flex overflow-hidden flex-col justify-center px-6 py-3 rounded bg-neutral-100 max-md:px-5">
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className="object-contain w-[121px] aspect-[1.06]"
    />
  </div>
);

interface ProductImageGalleryProps {
  thumbnails: ThumbnailProps[];
  mainImage: {
    src: string;
    alt: string;
  };
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  thumbnails,
  mainImage,
}) => {
  return (
    <div className="flex gap-5 max-md:flex-col">
      <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow max-md:mt-8">
          {thumbnails.map((thumbnail, index) => (
            <div key={index} className={index > 0 ? "mt-4" : ""}>
              <ProductThumbnail {...thumbnail} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full">
        <div className="flex overflow-hidden flex-col grow justify-center px-7 py-36 w-full rounded bg-neutral-100 max-md:px-5 max-md:py-24 max-md:mt-8 max-md:max-w-full">
          <img
            loading="lazy"
            src={mainImage.src}
            alt={mainImage.alt}
            className="object-contain w-full aspect-[1.42] max-md:max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
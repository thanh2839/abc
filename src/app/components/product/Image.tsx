import Image from 'next/image';

const product = {
  images: {
    image: "https://res.cloudinary.com/dsymtu3j5/image/upload/v1736110639/image_89.webp"  // Thêm dấu ngoặc kép cho URL
  }  // Sửa dấu chấm phẩy thành dấu phẩy
};

export function ImageGallery() {
  return (
    <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
      <h2 className="sr-only">Images</h2>

      <div className="flex flex-col text-xs whitespace-nowrap text-neutral-50">
        <img
          loading="lazy"
          src="https://res.cloudinary.com/dsymtu3j5/image/upload/v1736110639/image_89.webp"
          // alt={imageAlt}
          className="object-contain self-end mt-3 max-w-full aspect-[1.13] w-[172px]"
        />
      </div>
    </div>
  );
}
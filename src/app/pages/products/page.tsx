import Header from '../../components/header';
import { ImageGallery } from '@/app/components/product/Image';
import { Materials } from '@/app/components/product/material';
import { Policies } from '@/app/components/product/policies';
import { ProductDetailReviews } from '@/app/components/product/product-detail-reviews';
import { ProductDetails } from '@/app/components/product/product-details';
import { SizePicker } from '@/app/components/product/size-picker';
import { Footer } from '@/app/components/Footer';
import { ProductHeading } from '@/app/components/product/product-heading';
import { Reviews } from '@/app/components/product/reviews';
import { RelatedProducts } from '@/app/components/product/related-products';

const Product = () => {
    return (
        <div>
            <Header />
            <main className="px-4 sm:px-8 md:px-16 lg:px-32 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left: Image Gallery */}
                    <div className="md:w-1/2">
                        <ImageGallery />
                    </div>

                    {/* Right: Product Information */}
                    <div className="md:w-1/2 flex flex-col gap-6">
                        {/* Product Heading */}
                        <ProductHeading />

                        {/* Product Reviews */}
                        <ProductDetailReviews />

                        {/* Product Details */}
                        <ProductDetails />

                        {/* Size Picker */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Select Size</h3>
                            <SizePicker />
                        </div>

                        {/* Materials */}
                        <Materials />

                        {/* Policies */}
                        <Policies />
                    </div>
                </div>

                {/* Customer Reviews */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-2">Customer Reviews</h2>
                    <div
                        className="max-h-96 overflow-y-auto border-t border-gray-200"
                        style={{ scrollbarWidth: 'thin', scrollbarColor: '#ccc transparent' }} // Tùy chỉnh: tùy chỉnh thanh cuộn
                    >
                        <Reviews />
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                    <RelatedProducts />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Product;

export interface ProductCardProps {
    imageUrl?: string;
    price: string;
    name: string;
    buttonColor: string;
  }

export interface ProductOptions {
    name: string;
    price: number;
    salePrice: number;
    stockQuantity: number;

}
export interface ProductData {
    name: string;
    categoryid: number;
    description: string;
    imageUrl?: string;
    productTags: number [];
    productOptions?: ProductOptions [];
    buttonColor: string;
  }
import ApiRoutes from "@/app/services/Api";

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
  productTags: number[];
  productOptions?: ProductOptions[];
  buttonColor: string;
}

export interface BProduct {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
  image: string;
  description: string;
  rate: number;
  ratingCount: number;
  sold: number;
  tags: {
    id: number;
    name: string;
  }[];
  options: {
    id: number;
    name: string;
    productId: number;
    price: number;
    salePrice: number;
    stockQuantity: number;
    image: string;
  }[];
  status: boolean;
}

export const getProductByID = async (id: number): Promise<BProduct> => {
  try {
    const response = await fetch(ApiRoutes.Product_infor(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`, // Uncomment if authentication is needed
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Error ${response.status}: ${errorDetails.message}`);
    }

    const fetchGetProduct = await response.json();
    // console.log('Product Info:', fetchGetProduct);

    // Assign the fetched data to a variable
    const product: BProduct = fetchGetProduct;
    // console.log("Product:", product);

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const fetchGetProductCategory = async (id: number) => {
  try {
    const response = await fetch(ApiRoutes.Product_InforCategory(id), {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const fetchAddCart = async (id: number, accessToken: string, selectedSize: number, quantity: number) => {
  const body = [
    {
      "productOptionId": selectedSize.id,
      "quantity": quantity
    }
  ]
  console.log("body; ", body)
  try {
    const response = await fetch(ApiRoutes.AddItemCart(Number(id)), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Product added to cart:", data.data);
  }
  catch (e) {
    console.error("Error fetching product:", e);
    throw e;
  }
}

export const interact = async(id: string, accessToken: string, body : {productId: number, rating: number, comment: string}) => {
  try {
    const response = await fetch(ApiRoutes.interact(id), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Product added to cart:", data.data);
  }
  catch (e) {
    console.error("Error fetching product:", e);
    throw e;
  }
}
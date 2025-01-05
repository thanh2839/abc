import ApiRoutes from "@/app/services/Api";
import Product from "../products/page";

export interface Product {
    name: string;
    categoryId: number;
    image : string;
    description: string;
    productTags: number[]; 
    productOptions: {
      name: string;
      price: number;
      salePrice: number;
      stockQuantity: number;
    }[];
  }

  export interface Category {
    id: number;
    name: string;
  }
  
  export interface Tag {
    id: number;
    name: string;
  }
  

  const cloudName = "dsymtu3j5";
  const uploadPreset = "shop_Santuary";


  export const getProductByID = async (id: number) => {
    try {
      const response = await fetch(ApiRoutes.Product_infor(id), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Uncomment nếu cần xác thực
        },
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Error ${response.status}: ${errorDetails.message}`);
      }
      
      const fetchGetProduct = await response.json(); 
      console.log('Product Info:', fetchGetProduct); 
      
      const product: Product = {
        name: fetchGetProduct.data.name,
        categoryId: fetchGetProduct.data.category,
        image : fetchGetProduct.data.image,
        description: fetchGetProduct.data.description,
        productTags: fetchGetProduct.data.tags || [], 
        productOptions: fetchGetProduct.data.options|| []
      };
      console.log("Product:" ,product);
      return fetchGetProduct;
    } catch (error) {
      throw error;
    }
  };
  

  export const fetchCategories = async(): Promise<Category[]> => {
    const response = await fetch (ApiRoutes.Category_getAll, {
      method: "POST",
    });
  
    if(!response.ok){
      throw new Error ("Fail to fetch categories");
    }
    // console.log(response);
    return response.json();
  }
  
  // API ALL TAG
  export const fetchTag = async(): Promise<Tag[]> => {
    const response = await fetch (ApiRoutes.Tag_getAll, {
      method: "POST",
    });
  
    if(!response.ok){
      throw new Error ("Fail to fetch Tags");
    }
    // console.log(response);
    return response.json();
  }
  
  // create tag
  export const createTagAPI = async (tag : string) => {
    const response = await fetch(ApiRoutes.Tag_create, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
  
      body: JSON.stringify({ 
        name: tag 
      }),
    });
    if (!response.ok) throw new Error('Failed to create tag');
    return response.json();
  };


import { product } from "@/app/app/data";
import ApiRoutes from "@/app/services/Api";
import exp from "constants";
import { Tag } from "lucide-react";

export interface Product {
    name: string;
    categoryId: number;
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

// export const fetchCategories = async(): Promise<Category[]> => {
//   const response = await fetch (ApiRoutes.Category_getAll);
//   if(!response.ok){
//     throw new Error ("Fail to fetch categories");
//   }
//   return response.json();
// }
// API Categories
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

// export const fetchTag = async() : Promise<Tag[]> => {
//   const response = await fetch (ApiRoutes.Tag_getAll);
//   if (!response.ok) {
//     // console.log(ApiRoutes.Category_getAll)
//     // throw new Error ("Fail to fetch Tag");
//   }
//   return response.json();
// }
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


export const createProduct = async (product: Product): Promise<void> => {
  const response = await fetch (ApiRoutes.Product_create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(product),
  });
  if(!response.ok) {
    throw new Error ("Failed to create product");
  }
  console.log(response);
}

// create Tag
export const createTagAPI = async (tag : string) => {
  const response = await fetch(ApiRoutes.Tag_create, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify({ 
      name: Tag 
    }),
  });
  if (!response.ok) throw new Error('Failed to create tag');
  return response.json();
};
import ApiRoutes from "@/app/services/Api";

export const heroImages = [
  "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/f75ca1b99ab870d891719e1c5517934b573b05d21cb2ef63e0bc1095650cd928?apiKey=107937b03e68408b93e8f13d8a143773&",
  "/images/hero2.jpg", 
  "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/f75ca1b99ab870d891719e1c5517934b573b05d21cb2ef63e0bc1095650cd928?apiKey=107937b03e68408b93e8f13d8a143773&",
  "/images/hero4.jpg",
  "/images/hero5.jpg"
];

export const categoryItems = [];

export interface Category {
    id: number;
    name: string;
  }

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
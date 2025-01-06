import ApiRoutes from "@/app/services/Api";

export const heroImages = [
  "https://intphcm.com/data/upload/banner-tet.jpg",
  "https://intphcm.com/data/upload/banner-tet-giam-gia.jpg",
  "https://intphcm.com/data/upload/banner-tet-la-gi.jpg",
  "https://intphcm.com/data/upload/banner-tet-li-xi.jpg",
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
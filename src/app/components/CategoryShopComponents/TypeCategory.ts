import ApiRoutes from "@/app/services/Api";

export interface Category {
  id: number;
  title: string;
  imageSrc: string;
}

export const categories: Category[] = [
  { id: 1, title: "Thời trang", imageSrc: "https://res.cloudinary.com/dsymtu3j5/image/upload/v1735825274/zlitmip7twlrbt77rbxo.png" },
  { id: 2, title: "Công nghệ", imageSrc: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/9ef664a5783f5e59c9fb41b201db81573724738ed421a81e30a6a3a8e8a98594?apiKey=107937b03e68408b93e8f13d8a143773&" },
  { id: 3, title: "Thể thao", imageSrc: "https://res.cloudinary.com/dsymtu3j5/image/upload/v1735823195/momncij7jminwz0wl0mz.png" },
  { id: 4, title: "Sách", imageSrc: "https://res.cloudinary.com/dsymtu3j5/image/upload/v1735823383/dh8d9vtf3xxgjo0scmg9.png" },
  { id: 5, title: "Sức khỏe", imageSrc: "https://res.cloudinary.com/dsymtu3j5/image/upload/v1735823665/nhukc3tbx0t51baxdxe9.png" },
  { id: 6, title: "Giải trí", imageSrc: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/0a87f125eb0f5406d736a8485921b264e3e5c094e4e1cda9c0c8062d02808d85?apiKey=107937b03e68408b93e8f13d8a143773&" },
  { id: 7, title: "Đồ trang trí", imageSrc: "https://res.cloudinary.com/dsymtu3j5/image/upload/v1735824958/egag9wqrb6l8vrphllu0.png" },
  { id: 8, title: "Phụ kiện", imageSrc: "https://res.cloudinary.com/dsymtu3j5/image/upload/v1735824385/ucszposaaboufzl86pbb.png" }
];

export const fetchCategoriesProduct = async (id: number) => {
  try {
    const response = await fetch(ApiRoutes.Product_InforCategory(id), {
      method: "POST"
    });
    if (!response.ok) {
      throw Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("responseAA: ", data)
    return data;
  }
  catch (error) {
    console.error('Error fetching category products:', error);
  }
}
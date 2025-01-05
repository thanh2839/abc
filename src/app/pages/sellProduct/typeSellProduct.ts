import ApiRoutes from "@/app/services/Api";

export interface Product {
    id: number;
    name: string;
    category: {
        id: number;
        name: string;
    };
    image: string,
    description: string;
    createdAt: string;
    rate: number;
    ratingCount: number;
    sold: number;
    tags: Array<{
        id: number;
        name: string;
    }>;
    status: boolean;
    options: {
        price: string,
        salePrice: string,
    }[]
}

export interface Category {
    id: number;
    name: string;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Filter {
    id: number;
    name: string;
    category: {
        id: number;
        name: string;
    };
    description: string;
    createdAt: string;
    rate: number;
    ratingCount: number;
    sold: number;
    tags: Array<{
        id: number;
        name: string;
    }>;
    status: boolean;
}

export const fetchCategories = async (): Promise<Category[]> => {
    const response = await fetch(ApiRoutes.Category_getAll, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error("Fail to fetch categories");
    }
    console.log(response);
    return response.json();
}

export const fetchTag = async (): Promise<Tag[]> => {
    const response = await fetch(ApiRoutes.Tag_getAll, {
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Fail to fetch Tags");
    }
    // console.log(response);
    return response.json();
}


export const fetchProductSearch = async (filters: any) => {
    const { tags, inStock, maxPrice, minPrice, categoryId, name } = filters;

    // Create query string from parameters
    const queryParams = [];

    // Only add parameters that have values
    if (tags && tags.length > 0) queryParams.push(`tags=${encodeURIComponent(tags)}`);
    if (inStock !== undefined && inStock !== null) queryParams.push(`inStock=${inStock}`);
    if (maxPrice !== undefined && maxPrice !== 1000) queryParams.push(`maxPrice=${maxPrice}`);
    if (minPrice !== undefined && minPrice !== null) queryParams.push(`minPrice=${minPrice}`);
    if (categoryId !== undefined && categoryId !== null) queryParams.push(`categoryId=${categoryId}`);
    if (name) queryParams.push(`name=${encodeURIComponent(name)}`);

    // Construct the URL with query parameters
    const baseUrl = 'http://localhost:3001/api/product/search';
    const url = queryParams.length > 0 ? `${baseUrl}?${queryParams.join('&')}` : baseUrl;
    console.log(url)
    try {
        console.log('Requesting URL:', url); // Debug log

        const response = await fetch(url, {
            method: 'POST', // Changed to GET since we're using query parameters
            // headers: {
            //     'Content-Type': 'application/json'
            // }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log('Fetched Products:', data);
        return data;

    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const fetchProductSell = async () => {

    const baseUrl = 'http://localhost:3001/api/product/search';
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log('Fetched Products:', data);
        return data;

    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const fetchCategoriesProduct = async (id: number) => {
    try {
        const response = await fetch(ApiRoutes.Product_InforCategory(id), {
            method: "POST"
        });
        if(!response.ok) {
            throw Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("responseAA: ",data)
        return data;
    }
    catch (error) {
        console.error('Error fetching category products:', error);
    }
}
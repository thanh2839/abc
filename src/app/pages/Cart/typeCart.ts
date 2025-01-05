import ApiRoutes from "@/app/services/Api";

export interface product {
    name: string,

}
export const fetchDataCart = async (id: number, accessToken: string) => {
    try {
        const response = await fetch(ApiRoutes.InforCart(id), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response}`);
        }
        const data = await response.json();
        console.log("Product added to cart:", data.data);
        return data.data;
    } catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
}

export const deleteItem = async (id: number, accessToken: string, productOptionId: number) => {

    try {
        const response = await fetch(ApiRoutes.DeleteItemFromCart(id, productOptionId), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        console.log("API URL:", ApiRoutes.DeleteItemFromCart(id, productOptionId));
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response}`);
        }
        const data = await response.json();
        console.log("Product added to cart:", data);
        return data;
    }
    catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
}

export const fetchAdjustQuantityCart = async (id: number, accessToken: string, items: { productOptionId: string, quantity: number }[]) => {
    console.log("body; ", items)
    try {
        const response = await fetch(ApiRoutes.adjust_quantity(Number(id)), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(items),
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
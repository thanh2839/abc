import ApiRoutes from "@/app/services/Api";

export type FormValues = {
    [key: string]: string;
}

export interface OrderDetail {
    productOptionId: number,
    quantity: number,
}

export const fetchGetAllPayment = async (accessToken: string) => {
    try {
        const response = await fetch(ApiRoutes.getAllPayment, {
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
        return data.data;
    } catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
}

export const fetchGetAllShipping = async (accessToken: string) => {
    console.log("URL: ", ApiRoutes.getAllShipping)
    try {
        const response = await fetch(ApiRoutes.getAllShipping, {
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
        return data.data;
    } catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
}

export const fetchCreateOrder = async (
    id: number,
    accessToken: string,
    address: string,
    paymentMethod: number,
    shippingMethod: number,
    items: { productOptionId: string, quantity: number }[]) => {
    try {
        const response = await fetch(ApiRoutes.createOrder(id), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                "address": address,
                "paymentMethodId": paymentMethod,
                "shippingMethodId": shippingMethod,
                "orderDetails": items,
            })
        })
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response}`);
        }
        const data = await response.json()
        console.log(data)
        return data
    }catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
}
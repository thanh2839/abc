import ApiRoutes from "@/app/services/Api";
import { StringToBoolean } from "class-variance-authority/types";
import { access } from "fs";

export interface MemberInfor {
    username: string,
    fullname: string,
    email: string,
    avatar: string,
    gender: string,
    dateOfBirth: string,
    tier: {
        id: number,
        name: string,
    }
    point: number,
    bio: string,
    tag: [],
}

export const getMemberInfor = async (id: number, accessToken: string) => {
    try {
        const response = await fetch(ApiRoutes.Member_infor(id), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response}`);
        }
        const data = await response.json()
        console.log("data: ", data.data)
        return data.data;
    } catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
}

export const UpdateMember = async (id: number, accessToken: string, gender: string, dateOfBirth: string, bio: string, memberTags: number[]) => {
    try {
        const response = await fetch(ApiRoutes.Member_Update(id), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                "gender": gender,
                "dateOfBirth": dateOfBirth,
                "bio": bio,
                "memberTags": memberTags,
            })
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response}`);
        }
        const data = await response.json()
        console.log("update Member: ", data)
        return data;
    } catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
}

export const UpdateUser = async (id: number, accessToken: string, fullname: string, email: string, avatar: string) => {
    try {
        const response = await fetch(ApiRoutes.User_Update(id), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                "fullname": fullname,
                "email": email,
                "avatar": avatar,
            })
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response}`);
        }
        const data = await response.json()
        console.log("update User: ", data)
        return data;
    } catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
}

export const getOrderInfor = async (idOrder: number, idUser: number, accessToken: string) => {
    try {
        const response = await fetch(ApiRoutes.getOrderInfor(idOrder, idUser), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response}`);
        }
        const data = await response.json()
        // console.log("Data Order Detail : ", data.data[0].orderDetails)
        return data.data[0].orderDetails
    }
    catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
}

export const getOrderList = async (userId: number, accessToken: string) => {
    try {
        const response = await fetch(ApiRoutes.getOderList(userId), {
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
        console.log("get order List : ", data.data)
        return data.data
    } catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
}

export const getOderAdmin = async (accessToken: string, status: string, from: string, to: string) => {
    try {
        const response = await fetch(ApiRoutes.getOderByAdmin(status, from, to), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response}`);
        }
        const data = response.json();
        console.log("get Order Admin: ", data)
        return data
    }
    catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
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
        // console.log("Payment: ", data.data)
        return data.data;
    } catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
}

export const fetchGetAllShipping = async (accessToken: string) => {
    // console.log("URL: ", ApiRoutes.getAllShipping)
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

export const addShippingMethod = async (accessToken: string, body: { name: string, cost: number, estimatedShipping: number, isInner: boolean }) => {
    try {
        const response = await fetch(ApiRoutes.addShippingMethod, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(body)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response}`);
        }
        const data = response.json()
        console.log("add Shipping Method: ", data)
        return data
    } catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
}

export const addPaymentMethod = async (accessToken: string, body: string) => {
    try {
        const response = await fetch(ApiRoutes.addShippingMethod, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(body)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response}`);
        }
        const data = response.json()
        console.log("add Payment Method: ", data)
        return data
    } catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
}

export const UpdateOderByAdmin = async (accessToken: string, orderId: string, status: string) => {
    try {
        const response = await fetch(ApiRoutes.UpdateOderByAdmin(orderId, status), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response}`);
        }
        const data = await response.json()
        console.log("Update Oder By Admin: ", data)
        return data
    }
    catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
}
import ApiRoutes from "@/app/services/Api";


export const fetchGetRelatedProduct = async (id : number) => {
    try {
        console.log("mcn: ",id)
        const response = await fetch('http://127.0.0.1:8000/content_base/product/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id" : id,
                "top_n": 20
            })
        })
        if (!response.ok) {
            throw Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json()
        console.log("data top related: ", data)
        return data;
    } catch (e) {
        console.error('Error fetching category products:', e);
    }
}

export const fetchProductInforList = async (list: Number[]) => {
    console.log("aaaa: ",list)
    try {
        const response = await fetch(ApiRoutes.Product_inforList, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                list,
            })
        })
        if (!response.ok) {
            throw Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json()
        // console.log("data ProductAA: ", data.data)
        return data;
    } catch (e) {
        console.error('Error fetching category products:', e);
    }
}
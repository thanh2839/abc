// const API = 'http://26.223.176.208:3001';
const API = 'http://localhost:3001'
const ApiRoutes = {
    // Login-Register
    login: `${API}/api/auth/login`,
    register: `${API}/api/auth/register`,

    // User
    User_Infor: (id: number) => `${API}/api/user/infor/${id}`,
    User_Update: (id: number) => `${API}/api/user/update/${id}`,
    User_Delete: (id: number) => `${API}/api/user/delete/${id}`,
    // Role
    Role: `${API}/api/role/get-all`,
    // Member
    Member_Update: (id: number) => `${API}/api/member/update/${id}`,
    Member_infor: (id: number) => `${API}/api/member/info/${id}`,
    // Tag
    Tag_create: `${API}/api/tag/create`,
    Tag_getAll: `${API}/api/tag/get-all`,
    Tag_delete: `${API}/api/tag/delete`,

    // Product
    Product_create: `${API}/api/product/create`,
    Product_update: (id: number) => `${API}/api/product/update/${id}`,
    Product_infor: (id: number) => `${API}/api/product/info/id?productId=${id}`,
    Product_inforList: `${API}/api/product/info/list`,
    Product_InforCategory: (id: number) => `${API}/api/product/info/category?categoryId=${id}`,
    Product_delete: `${API}/api/product/delete`,

    Product_search: (tags: string, inStock: boolean, maxPrice: number, minPrice: number, categoryId: number, name: string) => {
        const params = new URLSearchParams();

        if (tags) params.append('tags', tags);
        if (inStock !== undefined) params.append('inStock', inStock.toString());
        if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString());
        if (minPrice !== undefined) params.append('minPrice', minPrice.toString());
        if (categoryId !== undefined) params.append('categoryId', categoryId.toString());
        if (name) params.append('name', name);

        return `${API}/api/product/search?${params.toString()}`;
    },

    // Category
    Category_create: `${API}/api/category/create`,
    Category_getAll: `${API}/api/category/get-all`,
    Category_delete: `${API}/api/category/delete`,

    //upload Image clound
    uploadImageCloudinary : `${API}/api/upload`,

    AddItemCart : (id : number) => `${API}/api/cart/add-items/${id}`,
    InforCart : (id : number) => `${API}/api/cart/items/${id}`,
    DeleteItemFromCart: (idUser: number, IdProductOption: number) => `${API}/api/cart/delete/${idUser}?productOptionId=${IdProductOption}`,
    adjust_quantity: (idUser : number) => `${API}/api/cart/adjust-quantity/${idUser}`,

    // shipping
    getAllShipping : `${API}/api/shipping/get-all`,
    addShippingMethod : `${API}/api/shipping/create`,



    //payment
    getAllPayment : `${API}/api/payment/get-all`,
    addPaymentMethod : `${API}/api/payment/create`,

    //Order 
    createOrder: (id: number) => `${API}/api/order/create/${id}`,
    getOrderInfor: (orderId : number, userId: number) => `${API}/api/order/get-order/${userId}?orderId=${orderId}`,
    getOderList: (userId: number) => `${API}/api/order/get-orders/${userId}`,
    getOderByAdmin: (status: string, from : string, to : string) => `${API}/api/order/get-all-orders?status=${status}&from=${from}&to=${to}`,
    UpdateOderByAdmin : (oderId : string, status: string) => `${API}/api/order/update-status?orderId=${oderId}&status=${status}`,

};

export default ApiRoutes;
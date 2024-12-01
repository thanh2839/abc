const API = 'http://26.223.176.208:3001';
const ApiRoutes = {
// Login-Register
    login: `${API}/api/auth/login`,
    register: `${API}/api/auth/register`,
    
// User
    User_Infor: (id : number) => `${API}/api/user/infor/${id}`,
    User_Update: (id : number) => `${API}/api/user/update/${id}`,
    User_Delete: (id : number) => `${API}/api/user/delete/${id}`,
// Role
    Role: `${API}/api/role/get-all`,
// Member
    Member_Update: (id : number) => `${API}/api/member/update/${id}`,
    Member_infor: (id : number) => `${API}/api/member/infor/${id}`,
// Tag
    Tag_create: `${API}/api/tag/create`,
    Tag_getAll: `${API}/api/tag/get-all`,
    Tag_delete: `${API}/api/tag/delete`,

// Product
    Product_create: `${API}/api/product/create`,
    Product_update: (id : number) => `${API}/api/product/update/${id}`,
    Product_infor: (id: number) => `${API}/api/product/info/${id}`,
    Product_inforList: `${API}/api/product/info/list`,
    Product_InforCategory: (id: number) => `${API}/api/product/info/category/${id}`,
    Product_delete:  `${API}/api/product/delete`,

// Category
    Category_create: `${API}/api/category/create`,
    Category_getAll: `${API}/api/category/get-all`,
    Category_delete: `${API}/api/category/delete`,
}

export default ApiRoutes;
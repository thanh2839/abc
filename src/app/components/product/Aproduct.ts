export const AProduct = [
    {
      id: 1,
      name: "Áo sơ mi trắng công sở",
      category: {
        id: 1,
        name: "Thời trang",
      },
      description: "Áo sơ mi trắng công sở cho ngày làm việc",
      createdAt: "2024-12-06T23:33:32.803Z",
      rate: 3,
      ratingCount: 8,
      sold: 4,
      tags: [
        { id: 1, name: "thời trang" },
        { id: 4, name: "áo sơ mi" },
        { id: 15, name: "quần áo công sở" },
      ],
      options: [
        { id: 2, name: "Size M", productId: 1, price: "250000", salePrice: "220000", stockQuantity: 120, image: "shirt_m.jpg" },
        { id: 3, name: "Size L", productId: 1, price: "250000", salePrice: "220000", stockQuantity: 150, image: "shirt_l.jpg" },
        { id: 1, name: "Size S", productId: 1, price: "250000", salePrice: "220000", stockQuantity: 100, image: "shirt_s.jpg" }
      ],
      status: false,
    },
    {
      id: 2,
      name: "Áo thun thể thao",
      category: { id: 2, name: "Thể thao" },
      description: "Áo thun thoáng mát cho hoạt động thể thao",
      createdAt: "2024-12-07T23:33:32.803Z",
      rate: 4,
      ratingCount: 15,
      sold: 10,
      tags: [
        { id: 2, name: "thể thao" },
        { id: 5, name: "áo thun" }
      ],
      options: [
        { id: 2, name: "Size M", productId: 2, price: "200000", salePrice: "180000", stockQuantity: 200, image: "tshirt_m.jpg" },
        { id: 3, name: "Size L", productId: 2, price: "200000", salePrice: "180000", stockQuantity: 180, image: "tshirt_l.jpg" },
        { id: 1, name: "Size S", productId: 2, price: "200000", salePrice: "180000", stockQuantity: 220, image: "tshirt_s.jpg" }
      ],
      status: true,
    },
    {
      id: 3,
      name: "Giày thể thao nam",
      category: { id: 3, name: "Giày dép" },
      description: "Giày thể thao nam cao cấp, thoải mái, bền bỉ",
      createdAt: "2024-12-08T23:33:32.803Z",
      rate: 5,
      ratingCount: 20,
      sold: 30,
      tags: [
        { id: 3, name: "giày thể thao" },
        { id: 6, name: "nam" }
      ],
      options: [
        { id: 2, name: "Size 42", productId: 3, price: "500000", salePrice: "450000", stockQuantity: 60, image: "shoe_42.jpg" },
        { id: 3, name: "Size 43", productId: 3, price: "500000", salePrice: "450000", stockQuantity: 70, image: "shoe_43.jpg" },
        { id: 1, name: "Size 41", productId: 3, price: "500000", salePrice: "450000", stockQuantity: 50, image: "shoe_41.jpg" }
      ],
      status: true,
    },
    {
      id: 4,
      name: "Áo khoác mùa đông",
      category: { id: 4, name: "Thời trang" },
      description: "Áo khoác dày giữ ấm trong mùa đông lạnh giá",
      createdAt: "2024-12-09T23:33:32.803Z",
      rate: 4,
      ratingCount: 10,
      sold: 25,
      tags: [
        { id: 1, name: "thời trang" },
        { id: 7, name: "áo khoác" }
      ],
      options: [
        { id: 2, name: "Size L", productId: 4, price: "600000", salePrice: "550000", stockQuantity: 90, image: "coat_l.jpg" },
        { id: 3, name: "Size M", productId: 4, price: "600000", salePrice: "550000", stockQuantity: 80, image: "coat_m.jpg" },
        { id: 1, name: "Size S", productId: 4, price: "600000", salePrice: "550000", stockQuantity: 70, image: "coat_s.jpg" }
      ],
      status: true,
    }
]
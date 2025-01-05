'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Package, Calendar, MapPin } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { getOrderInfor, getOrderList } from './UserInfor';

const userId = sessionStorage.getItem('UserId');
const accessToken = sessionStorage.getItem('accessToken');

interface Order {
    id: number;
    status: 'PENDING' | 'PAYMENT_PENDING' | 'PAID' | 'SHIPPING_PENDING' | 'SHIPPED' |'DELIVERED' | 'COMPLETED' | 'CANCELLED';
    address: string;
    totalPrice: string;
    createdAt: string;
}

interface ProductOption {
    id: number;
    image: string;
    name: string;
    price: string;
    salePrice: string;
    stockQuantity: number;
}

interface OrderDetails {
    orderId: number;
    productOptionId: number;
    quantity: number;
    productOption: ProductOption;
}

const MyOrder = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
    const [orderDetailsMap, setOrderDetailsMap] = useState<Record<number, OrderDetails[]>>({});
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        const fetchOrderList = async () => {
            try {
                if (userId && accessToken) {
                    const data = await getOrderList(Number(userId), accessToken);
                    const orderData : Order [] = data.map(order => ({
                        id: order.id,
                        status: order.status,
                        address: order.address,
                        totalPrice: order.totalPrice,
                        createdAt: order.createdAt
                    }))
                    setOrders(orderData);
                }
            }  catch(e) {
                console.error('Error fetching order list:', e);
            }
        }
        fetchOrderList()
    },[])
    // const orders: Order[] = [
    //     {
    //         id: 101,
    //         status: 'PENDING',
    //         address: "aaaaaa",
    //         totalPrice: "8800000",
    //         createdAt: "2025-01-04T00:34:31.054Z",
    //     },
    //     {
    //         id: 102,
    //         status: 'PROCESSING',
    //         address: "aaaaaa",
    //         totalPrice: "8800000",
    //         createdAt: "2025-01-04T00:39:41.281Z",
    //     },
    // ];

    const handleOrderClick = async (orderId: number) => {
        if (userId && accessToken) {
            if (selectedOrders.includes(orderId)) {
                // Remove orderId from selectedOrders and clear its details
                setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
            } else {
                // Add orderId to selectedOrders and fetch details
                setSelectedOrders([...selectedOrders, orderId]);

                if (!orderDetailsMap[orderId]) {
                    setIsLoading(true);
                    try {
                        const dataOrderDetail = await getOrderInfor(orderId, Number(userId), accessToken);
                        setOrderDetailsMap((prev) => ({ ...prev, [orderId]: dataOrderDetail }));
                    } catch (error) {
                        console.error("Error fetching order details:", error);
                    } finally {
                        setIsLoading(false);
                    }
                }
            }
        }
    };

    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(Number(price));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: Order['status']): string => {
        const colors: Record<Order['status'], string> = {
            PENDING: 'bg-yellow-100 text-yellow-800',
            PAYMENT_PENDING: 'bg-orange-100 text-orange-800',
            PAID: 'bg-blue-100 text-blue-800',
            SHIPPING_PENDING: 'bg-indigo-100 text-indigo-800',
            SHIPPED: 'bg-purple-100 text-purple-800',
            DELIVERED: 'bg-green-100 text-green-800',
            COMPLETED: 'bg-green-500 text-white',
            CANCELLED: 'bg-red-100 text-red-800'
        };
        return colors[status];
    };

    const LoadingSkeleton = () => (
        <div className="space-y-4 p-4 border-t bg-gray-50">
            <Skeleton className="h-5 w-5" />
            {/* Add more skeletons as necessary */}
        </div>
    );

    return (
        <Card className="flex-1 ml-5 max-w-4xl">
            <CardHeader>
                <CardTitle className="text-xl font-medium text-red-500 flex items-center gap-2">
                    <Package className="h-6 w-6" />
                    Danh sách đơn hàng
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg overflow-hidden">
                        <div
                            className="p-4 bg-white hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                            onClick={() => handleOrderClick(order.id)}
                        >
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Đơn hàng #{order.id}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {formatDate(order.createdAt)}
                                    </span>
                                    <span className="font-medium text-red-500">{formatPrice(order.totalPrice)}</span>
                                </div>
                            </div>
                            {selectedOrders.includes(order.id) ? (
                                <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                        </div>

                        {selectedOrders.includes(order.id) && (
                            <>
                                {isLoading ? (
                                    <LoadingSkeleton />
                                ) : (
                                    orderDetailsMap[order.id] && (
                                        <div className="p-4 border-t bg-gray-50">
                                            <div className="space-y-4">
                                                <div className="font-medium">Chi tiết sản phẩm</div>
                                                {orderDetailsMap[order.id].map((detail) => (
                                                    <div key={detail.productOptionId} className="flex items-center justify-between p-3 bg-white rounded-lg">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={detail.productOption.image}
                                                                alt={detail.productOption.name}
                                                                className="w-16 h-16 object-cover rounded"
                                                            />
                                                            <div>
                                                                <div className="font-medium">{detail.productOption.name}</div>
                                                                <div className="text-sm text-gray-600">Số lượng: {detail.quantity}</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="font-medium text-red-500">{formatPrice(detail.productOption.salePrice)}</div>
                                                            <div className="text-sm text-gray-500 line-through">{formatPrice(detail.productOption.price)}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}
                            </>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default MyOrder;

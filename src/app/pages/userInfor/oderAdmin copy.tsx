'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Package, Search, Loader2, CalendarDays, MapPin, Clock } from 'lucide-react';
import { getOderAdmin, UpdateOderByAdmin } from './UserInfor';


type Status = 'ALL' | 'PENDING' | 'PAYMENT_PENDING' | 'PAID' | 'SHIPPING_PENDING' | 'SHIPPED' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED';

interface Order {
    id: string;
    status: Status;
    address: string;
    totalPrice: string;
    createdAt: string;
    updatedAt: string;
    paymentDate?: string;
    startedShippingDate?: string;
    estimatedShippingDay?: string;
    finishedShippingDate?: string;
    shippingId?: string;
    paidId?: string;
    paymentMethodId?: number;
    shippingUnitId?: number;
    memberId?: number;
}

const AdminOrderManagement = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [filters, setFilters] = useState({
        status: 'PENDING' as Status,
        dateFrom: '2024-11-01T00:00:00.000Z',
        dateTo: '2024-11-30T23:59:59.999Z',
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        if (!accessToken) return;
        setIsLoading(true);
        try {
            const response = await getOderAdmin(accessToken, filters.status, filters.dateFrom, filters.dateTo);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Chưa có';
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(Number(price));
    };

    const getStatusColor = (status: Status): string => {
        const colors: Record<Status, string> = {
            ALL: 'bg-gray-100 text-gray-800',
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

    const getNextStatus = (currentStatus: Status): Status | null => {
        const statusFlow: Record<Status, Status | null> = {
            PENDING: 'PAYMENT_PENDING',
            PAYMENT_PENDING: 'PAID',
            PAID: 'SHIPPING_PENDING',
            SHIPPING_PENDING: 'SHIPPED',
            SHIPPED: 'DELIVERED',
            DELIVERED: 'COMPLETED',
            COMPLETED: null,
            CANCELLED: null,
            ALL: null
        };
        return statusFlow[currentStatus];
    };

    const handleStatusUpdate = async (orderId: string, newStatus: Status) => {
        if (!accessToken) return;
        try {
            await UpdateOderByAdmin(accessToken, orderId, newStatus);
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <Card className="max-w-7xl mx-auto">
                <CardContent>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mt-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Từ ngày</label>
                                <Input
                                    type="date"
                                    value={filters.dateFrom.split('T')[0]}
                                    onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: `${e.target.value}T00:00:00.000Z` }))}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Đến ngày</label>
                                <Input
                                    type="date"
                                    value={filters.dateTo.split('T')[0]}
                                    onChange={(e) => setFilters(prev => ({ ...prev, dateTo: `${e.target.value}T23:59:59.999Z` }))}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Trạng thái</label>
                                <Select
                                    value={filters.status}
                                    onValueChange={(value: Status) => setFilters(prev => ({ ...prev, status: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Trạng thái" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">Tất cả</SelectItem>
                                        <SelectItem value="PENDING">Chờ xử lý</SelectItem>
                                        <SelectItem value="PAYMENT_PENDING">Chờ thanh toán</SelectItem>
                                        <SelectItem value="PAID">Đã thanh toán</SelectItem>
                                        <SelectItem value="SHIPPING_PENDING">Chờ vận chuyển</SelectItem>
                                        <SelectItem value="SHIPPED">Đang vận chuyển</SelectItem>
                                        <SelectItem value="DELIVERED">Đã giao hàng</SelectItem>
                                        <SelectItem value="COMPLETED">Hoàn thành</SelectItem>
                                        <SelectItem value="CANCELLED">Đã hủy</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={fetchOrders} className="w-32">
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Search className="h-4 w-4 mr-2" />
                                            Tìm kiếm
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {orders.map((order) => (
                                <Dialog key={order.id}>
                                    <DialogTrigger asChild>
                                        <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                            <div className="p-4">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-lg font-semibold">Đơn hàng #{order.id}</span>
                                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-lg font-semibold">
                                                        {formatPrice(order.totalPrice)}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <CalendarDays className="h-4 w-4" />
                                                        <span>{formatDate(order.createdAt)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{order.address}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        <span>Dự kiến: {order.estimatedShippingDay || 'Chưa xác định'} ngày</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                        <DialogHeader>
                                            <DialogTitle>Chi tiết đơn hàng #{order.id}</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <h3 className="font-semibold">Thông tin chung</h3>
                                                    <p>Mã thành viên: {order.memberId}</p>
                                                    <p>Trạng thái: <span className={`px-2 py-1 rounded ${getStatusColor(order.status)}`}>{order.status}</span></p>
                                                    <p>Tổng tiền: {formatPrice(order.totalPrice)}</p>
                                                    <p>Địa chỉ: {order.address}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="font-semibold">Thời gian</h3>
                                                    <p>Ngày tạo: {formatDate(order.createdAt)}</p>
                                                    <p>Cập nhật lần cuối: {formatDate(order.updatedAt)}</p>
                                                    <p>Ngày thanh toán: {formatDate(order.paymentDate)}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <h3 className="font-semibold">Thông tin vận chuyển</h3>
                                                    <p>Mã vận đơn: {order.shippingId || 'Chưa có'}</p>
                                                    <p>Đơn vị vận chuyển: {order.shippingUnitId || 'Chưa chọn'}</p>
                                                    <p>Ngày bắt đầu vận chuyển: {formatDate(order.startedShippingDate)}</p>
                                                    <p>Ngày dự kiến: {order.estimatedShippingDay || 'Chưa xác định'} ngày</p>
                                                    <p>Ngày hoàn thành: {formatDate(order.finishedShippingDate)}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="font-semibold">Thông tin thanh toán</h3>
                                                    <p>Mã thanh toán: {order.paidId || 'Chưa có'}</p>
                                                    <p>Phương thức thanh toán: {order.paymentMethodId || 'Chưa chọn'}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-4">
                                                {getNextStatus(order.status) && (
                                                    <Button
                                                        onClick={() => handleStatusUpdate(order.id, getNextStatus(order.status)!)}
                                                        variant="outline"
                                                    >
                                                        Chuyển sang {getNextStatus(order.status)}
                                                    </Button>
                                                )}
                                                {order.status !== 'CANCELLED' && order.status !== 'COMPLETED' && (
                                                    <Button
                                                        onClick={() => handleStatusUpdate(order.id, 'CANCELLED')}
                                                        variant="destructive"
                                                    >
                                                        Hủy đơn hàng
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminOrderManagement;
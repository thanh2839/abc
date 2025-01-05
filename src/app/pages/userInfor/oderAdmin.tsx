'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Package, Search, Loader2, Truck, CreditCard } from 'lucide-react';
import { getOderAdmin, UpdateOderByAdmin, fetchGetAllPayment, fetchGetAllShipping } from './UserInfor';

type Status = 'ALL' | 'PENDING' | 'PAYMENT_PENDING' | 'PAID' | 'SHIPPING_PENDING' | 'SHIPPED' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED';

interface Order {
    id: string;
    status: Status;
    address: string;
    totalPrice: string;
    createdAt: string;
    shippingUnit?: { id: number; name: string };
    paymentMethod?: { id: number; name: string };
}

interface ShippingUnit {
    id: number;
    name: string;
}

interface PaymentMethod {
    id: number;
    name: string;
}

const AdminOrderManagement = () => {
    const accessToken = sessionStorage.getItem('accessToken');

    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({
        status: 'PENDING' as Status,
        dateFrom: '2024-11-01T00:00:00.000Z',
        dateTo: '2024-11-30T23:59:59.999Z',
        searchTerm: ''
    });
    const [shippingUnits, setShippingUnits] = useState<ShippingUnit[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [newShippingUnit, setNewShippingUnit] = useState('');
    const [newPaymentMethod, setNewPaymentMethod] = useState('');
    const [showShippingDialog, setShowShippingDialog] = useState(false);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);

    useEffect(() => {
        fetchOrders()
        fetchShippingUnits();
        fetchPaymentMethods();
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

    const fetchShippingUnits = async () => {
        if (!accessToken) return;
        try {
            const response = await fetchGetAllShipping(accessToken);
            setShippingUnits(response);
        } catch (error) {
            console.error('Error fetching shipping units:', error);
        }
    };

    const fetchPaymentMethods = async () => {
        if (!accessToken) return;
        try {
            const response = await fetchGetAllPayment(accessToken);
            setPaymentMethods(response);
        } catch (error) {
            console.error('Error fetching payment methods:', error);
        }
    };

    const handleStatusUpdate = async (orderId: string, newStatus: Status) => {
        if (!accessToken) { return }
        try {
            await UpdateOderByAdmin(accessToken, orderId, newStatus);
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
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

    return (
        <div className="p-6 space-y-6">
            <Card className="max-w-7xl mx-auto">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl font-bold text-red-500 flex items-center gap-2">
                            <Package className="h-6 w-6" />
                            Quản lý đơn hàng
                        </CardTitle>
                        <div className="flex gap-2">
                            <Dialog open={showShippingDialog} onOpenChange={setShowShippingDialog}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <Truck className="h-4 w-4 mr-2" />
                                        Quản lý vận chuyển
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Quản lý đơn vị vận chuyển</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Tên đơn vị vận chuyển mới"
                                                value={newShippingUnit}
                                                onChange={(e) => setNewShippingUnit(e.target.value)}
                                            />
                                            <Button onClick={() => {/* Add shipping unit logic */ }}>Thêm</Button>
                                        </div>
                                        <div className="space-y-2">
                                            {shippingUnits.map((unit) => (
                                                <div key={unit.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                    <span>{unit.name}</span>
                                                    <Button variant="ghost" size="sm">Xóa</Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        Quản lý thanh toán
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Quản lý phương thức thanh toán</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Tên phương thức thanh toán mới"
                                                value={newPaymentMethod}
                                                onChange={(e) => setNewPaymentMethod(e.target.value)}
                                            />
                                            <Button onClick={() => {/* Add payment method logic */ }}>Thêm</Button>
                                        </div>
                                        <div className="space-y-2">
                                            {paymentMethods.map((method) => (
                                                <div key={method.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                    <span>{method.name}</span>
                                                    <Button variant="ghost" size="sm">Xóa</Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Từ ngày</label>
                                <Input
                                    type="date"
                                    value={filters.dateFrom}
                                    onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                                />
                            </div>
                            <div>

                                <label className="text-sm font-medium mb-2 block">Đến ngày</label>
                                <Input
                                    type="date"
                                    value={filters.dateTo}
                                    onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
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
                                <div key={order.id} className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-lg font-semibold">Đơn hàng #{order.id}</span>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Ngày tạo: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
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
                                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                                            <div>
                                                <span className="font-medium">Đơn vị vận chuyển:</span>
                                                <span className="ml-2">{order.shippingUnit?.name || 'Chưa chọn'}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Phương thức thanh toán:</span>
                                                <span className="ml-2">{order.paymentMethod?.name || 'Chưa chọn'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminOrderManagement;
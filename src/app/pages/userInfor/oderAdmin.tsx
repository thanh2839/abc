'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
    Package, 
    Search, 
    Loader2, 
    CalendarDays, 
    MapPin, 
    Clock, 
    CreditCard, 
    Truck,
    Calendar,
    User,
    DollarSign,
    RefreshCcw,
    Package2
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { getOderAdmin, UpdateOderByAdmin, fetchGetAllPayment, fetchGetAllShipping } from './UserInfor';



type Status = 'PENDING' | 'PAYMENT_PENDING' | 'PAID' | 'SHIPPING_PENDING' | 'SHIPPED' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED';

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
            console.log("from Date : ", filters.dateFrom)
            console.log("to Date : ", filters.dateTo)
            const response = await getOderAdmin(accessToken, filters.status, encodeURIComponent(filters.dateFrom), encodeURIComponent(filters.dateTo));
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
            // ALL: 'bg-gray-100 text-gray-800',
            PENDING: 'bg-red-100 text-red-800',
            PAYMENT_PENDING: 'bg-orange-100 text-orange-800',
            PAID: 'bg-blue-100 text-blue-800',
            SHIPPING_PENDING: 'bg-yellow-100 text-yellow-800',
            SHIPPED: 'bg-purple-100 text-purple-800',
            DELIVERED: 'bg-green-100 text-green-800',
            COMPLETED: 'bg-green-500 text-white',
            CANCELLED: 'bg-red-500 text-white'
        };
        return colors[status];
    };

    const getStatusDisplay = (status: Status): string => {
        const statusMap: Record<Status, string> = {
            // ALL: 'Tất cả',
            PENDING: 'Chờ xử lý',
            PAYMENT_PENDING: 'Chờ thanh toán',
            PAID: 'Đã thanh toán',
            SHIPPING_PENDING: 'Chờ vận chuyển',
            SHIPPED: 'Đang vận chuyển',
            DELIVERED: 'Đã giao hàng',
            COMPLETED: 'Hoàn thành',
            CANCELLED: 'Đã hủy'
        };
        return statusMap[status];
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
            // ALL: null
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
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end bg-white p-6 rounded-lg shadow-sm">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Từ ngày</label>
                                <Input
                                    type="date"
                                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                                    value={filters.dateFrom.split('T')[0]}
                                    onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: `${e.target.value}T00:00:00.000Z` }))}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Đến ngày</label>
                                <Input
                                    type="date"
                                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                                    value={filters.dateTo.split('T')[0]}
                                    onChange={(e) => setFilters(prev => ({ ...prev, dateTo: `${e.target.value}T23:59:59.999Z` }))}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Trạng thái</label>
                                <Select
                                    value={filters.status}
                                    onValueChange={(value: Status) => setFilters(prev => ({ ...prev, status: value }))}
                                >
                                    <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                                        <SelectValue placeholder="Trạng thái" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* <SelectItem value="ALL">Tất cả</SelectItem> */}
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
                                <Button 
                                    onClick={fetchOrders} 
                                    className="w-full md:w-32 bg-red-600 hover:bg-red-700"
                                >
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
                                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1">
                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-4">
                                                            <Package2 className="h-5 w-5 text-red-600" />
                                                            <span className="text-lg font-semibold text-gray-900">Đơn hàng #{order.id}</span>
                                                            <Badge className={`${getStatusColor(order.status)}`}>
                                                                {getStatusDisplay(order.status)}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="text-lg font-bold text-red-600">
                                                        {formatPrice(order.totalPrice)}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-6 text-sm text-gray-600">
                                                    <div className="flex items-center gap-3">
                                                        <CalendarDays className="h-4 w-4 text-gray-400" />
                                                        <span className="truncate">{formatDate(order.createdAt)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <MapPin className="h-4 w-4 text-gray-400" />
                                                        <span className="truncate">{order.address}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Clock className="h-4 w-4 text-gray-400" />
                                                        <span>Dự kiến: {order.estimatedShippingDay || 'Chưa xác định'} ngày</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-red-900">
                                                <Package2 className="h-6 w-6 text-red-600" />
                                                Chi tiết đơn hàng #{order.id}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-8 py-4">
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                                                        <User className="h-5 w-5 text-red-600" />
                                                        Thông tin chung
                                                    </div>
                                                    <div className="space-y-3 text-gray-600">
                                                        <p className="flex items-center gap-2">
                                                            <span className="font-medium">Mã thành viên:</span> {order.memberId}
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <span className="font-medium">Trạng thái:</span>
                                                            <Badge className={`${getStatusColor(order.status)}`}>
                                                                {getStatusDisplay(order.status)}
                                                            </Badge>
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <span className="font-medium">Tổng tiền:</span>
                                                            <span className="text-red-600 font-semibold">{formatPrice(order.totalPrice)}</span>
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <span className="font-medium">Địa chỉ:</span> {order.address}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                                                        <Calendar className="h-5 w-5 text-red-600" />
                                                        Thời gian
                                                    </div>
                                                    <div className="space-y-3 text-gray-600">
                                                        <p className="flex items-center gap-2">
                                                            <CalendarDays className="h-4 w-4" />
                                                            <span className="font-medium">Ngày tạo:</span> {formatDate(order.createdAt)}
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <RefreshCcw className="h-4 w-4" />
                                                            <span className="font-medium">Cập nhật:</span> {formatDate(order.updatedAt)}
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <DollarSign className="h-4 w-4"/>
                                                            <span className="font-medium">Thanh toán:</span> {formatDate(order.paymentDate)}
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <Truck className="h-4 w-4" />
                                                            <span className="font-medium">Vận chuyển:</span> {formatDate(order.startedShippingDate)}
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <Clock className="h-4 w-4" />
                                                            <span className="font-medium">Dự kiến giao:</span> {formatDate(order.estimatedShippingDay)}
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <Truck className="h-4 w-4" />
                                                            <span className="font-medium">Hoàn thành vận chuyển:</span> {formatDate(order.finishedShippingDate)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-lg font-semibold text-gray-900">
                                                        Hành động
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {getNextStatus(order.status) && (
                                                            <Button
                                                                onClick={() =>
                                                                    handleStatusUpdate(
                                                                        order.id,
                                                                        getNextStatus(order.status)!
                                                                    )
                                                                }
                                                                className="bg-green-600 hover:bg-green-700"
                                                            >
                                                                Cập nhật trạng thái: {getStatusDisplay(getNextStatus(order.status)!)}
                                                            </Button>
                                                        )}
                                                        {order.status !== 'CANCELLED' && (
                                                            <Button
                                                                onClick={() =>
                                                                    handleStatusUpdate(order.id, 'CANCELLED')
                                                                }
                                                                className="bg-red-600 hover:bg-red-700"
                                                            >
                                                                Huỷ đơn hàng
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">
                                                        Nếu trạng thái hiện tại của đơn hàng là cuối cùng trong quy trình, bạn không thể cập nhật thêm.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))}
                            {!isLoading && orders.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-600">Không tìm thấy đơn hàng nào phù hợp.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminOrderManagement;
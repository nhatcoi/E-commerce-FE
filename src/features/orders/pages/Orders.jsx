import {useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "src/components/ui/tabs";
import {Input} from "src/components/ui/input";
import {Search} from "lucide-react";
import OrderList from "src/features/orders/components/OrderList.jsx";
import {useSearchParams} from "react-router-dom";

// Các trạng thái đơn hàng khả dụng trong hệ thống
const ORDER_STATUSES = [
    {value: "all", label: "Tất cả"},
    {value: "pending", label: "Chờ thanh toán"},
    {value: "paid", label: "Đã thanh toán"},
    {value: "cancelled", label: "Đã hủy"},
    {value: "returns", label: "Đổi/Trả"},
];

const Orders = () => {
    // State lưu trữ từ khóa tìm kiếm
    const [searchQuery, setSearchQuery] = useState("");
    // Hook để xử lý tham số URL
    const [searchParams, setSearchParams] = useSearchParams();

    // Lấy trạng thái hiện tại từ URL hoặc mặc định là "all"
    const currentStatus = searchParams.get("status") || "all";

    // Cập nhật tham số URL khi chuyển tab
    const handleTabChange = (value) => {
        setSearchParams({status: value});
    };

    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-6 space-y-6">
                <h1 className="text-2xl font-bold">Đơn hàng của tôi</h1>

                <div className="flex flex-col space-y-4">
                    {/* Thanh tìm kiếm */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4"/>
                        <Input
                            type="text"
                            placeholder="Tìm kiếm theo tên mã đơn hàng, hoặc tên sản phẩm..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-full"
                        />
                    </div>

                    <h3 className="font-bold">Infinitive Scroll Logic</h3>

                    {/* Tab trạng thái đơn hàng */}
                    <Tabs value={currentStatus} onValueChange={handleTabChange} className="w-full">
                        <TabsList className="w-full justify-start">
                            {ORDER_STATUSES.map((status) => (
                                <TabsTrigger
                                    key={status.value}
                                    value={status.value}
                                    className="flex-1"
                                >
                                    {status.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {/* Nội dung các tab */}
                        {/* Chỉ cần render một TabsContent và truyền status hiện tại vào OrderList */}
                        <TabsContent value={currentStatus}>
                            <OrderList 
                                status={currentStatus} 
                                searchQuery={searchQuery}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Orders;
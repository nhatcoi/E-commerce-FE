import {useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "src/components/ui/tabs";
import {Input} from "src/components/ui/input";
import {Search} from "lucide-react";
import OrderList from "src/features/orders/components/OrderList.jsx";
import {useSearchParams} from "react-router-dom";

const CONSTANTS = {
    DEFAULT_STATUS: "all"
};

/* UI text constants */
const UI_TEXT = {
    PAGE_TITLE: "My Orders",
    SEARCH_PLACEHOLDER: "Search by order ID, product name",
    SCROLL_TITLE: "Infinitive Scroll Logic",
    ORDER_STATUSES: {
        ALL: {
            value: "all", 
            label: "All"
        },
        PENDING: {
            value: "pending", 
            label: "Pending"
        },
        PAID: {
            value: "paid", 
            label: "Paid"
        },
        CANCELLED: {
            value: "cancelled", 
            label: "Cancelled"
        },
        RETURNS: {
            value: "returns", 
            label: "Returns"
        }
    }
};

/* status */
const ORDER_STATUSES = [
    UI_TEXT.ORDER_STATUSES.ALL,
    UI_TEXT.ORDER_STATUSES.PENDING,
    UI_TEXT.ORDER_STATUSES.PAID,
    UI_TEXT.ORDER_STATUSES.CANCELLED,
    UI_TEXT.ORDER_STATUSES.RETURNS,
];

const Orders = () => {
    /* State search */
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    /* status hiện tại từ URL */
    const currentStatus = searchParams.get("status") || CONSTANTS.DEFAULT_STATUS;

    const handleTabChange = (value) => {
        setSearchParams({status: value});
    };

    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-6 space-y-6">
                <h1 className="text-2xl font-bold">{UI_TEXT.PAGE_TITLE}</h1>
                <div className="flex flex-col space-y-4">

                    {/* Thanh tìm kiếm */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4"/>
                        <Input
                            type="text"
                            placeholder={UI_TEXT.SEARCH_PLACEHOLDER}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-full"
                        />
                    </div>

                    <h3 className="font-bold">{UI_TEXT.SCROLL_TITLE}</h3>

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
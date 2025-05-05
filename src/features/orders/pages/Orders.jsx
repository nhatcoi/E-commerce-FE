import {useState, useEffect} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "src/components/ui/tabs";
import {Input} from "src/components/ui/input";
import {Search} from "lucide-react";
import {OrderList} from "src/features/orders/components/OrderList.jsx";
import {useSearchParams} from "react-router-dom";

const Orders = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const currentStatus = searchParams.get("status") || "all";

    const orderStatuses = [
        {value: "all", label: "All"},
        {value: "pending", label: "Pending Payment"},
        {value: "paid", label: "Completed"},
        {value: "cancelled", label: "Cancelled"},
        {value: "returns", label: "Returns/Refunds"},
    ];

    useEffect(() => {
        const isValidStatus = orderStatuses.some(status => status.value === currentStatus);
        if (!isValidStatus) {
            setSearchParams({status: "all"});
        }
    }, [currentStatus, setSearchParams, orderStatuses]);

    const handleTabChange = (value) => {
        setSearchParams({status: value});
    };

    return (
        <div className="home min-h-screen">
            <div className="container mx-auto py-6 space-y-6">
                <h1 className="text-2xl font-bold">My Orders</h1>

                <div className="flex flex-col space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4"/>
                        <Input
                            type="text"
                            placeholder="Search by shop name, order ID, or product name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-full"
                        />
                    </div>

                    {/* Order Status Tabs */}
                    <Tabs value={currentStatus} onValueChange={handleTabChange} className="w-full">
                        <TabsList className="w-full justify-start">
                            {orderStatuses.map((status) => (
                                <TabsTrigger
                                    key={status.value}
                                    value={status.value}
                                    className="flex-1"
                                >
                                    {status.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {/* Tab Contents */}
                        {orderStatuses.map((status) => (
                            <TabsContent key={status.value} value={status.value}>
                                <OrderList status={status.value} searchQuery={searchQuery}/>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Orders;
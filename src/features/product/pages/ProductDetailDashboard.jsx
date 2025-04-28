import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "src/components/ui/use-toast.js";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "src/components/ui/card.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs.jsx";
import { Badge } from "src/components/ui/badge.jsx";
import { Button } from "src/components/ui/button.jsx";
import { Label } from "src/components/ui/label.jsx";
import { Separator } from "src/components/ui/separator.jsx";
import { ScrollArea } from "src/components/ui/scroll-area.jsx";
import { Input } from "src/components/ui/input.jsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "src/components/ui/alert-dialog.jsx";
import { useGetProductByIdQuery, useUpdateProductMutation } from "src/features/product/services/productApi.js";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
    Package,
    Tag,
    DollarSign,
    ShoppingCart,
    Eye,
    TrendingUp,
    AlertTriangle,
    ImagePlus,
    Trash2,
    Save,
    RefreshCw,
    Star,
    Calendar
} from "lucide-react";
import {formatDateTime} from "src/utils/formatDate.js";

const ProductDetailDashboard = () => {
    const { productId: id } = useParams();
    const { data: productData, isLoading } = useGetProductByIdQuery(id);
    const [updateProduct] = useUpdateProductMutation();
    const [isResetStockDialogOpen, setIsResetStockDialogOpen] = useState(false);
    const [stockQuantity, setStockQuantity] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    // Sample analytics data - replace with actual API data
    const analyticsData = {
        views: 1234,
        addedToCart: 567,
        purchases: 89,
        conversionRate: 7.2,
        reviewsCount: 45,
        averageRating: 4.5,
        last30DaysViews: [
            { date: '2024-03-01', views: 45 },
            { date: '2024-03-15', views: 65 },
            { date: '2024-03-30', views: 85 }
        ]
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        setIsUploading(true);
        try {
            // Replace with actual image upload logic
            await new Promise(resolve => setTimeout(resolve, 1000));
            const urls = files.map(() => 'https://placeholder.com/image.jpg');
            const currentImages = productData?.data?.productImages || [];
            await updateProduct({
                id,
                productImages: [...currentImages, ...urls]
            }).unwrap();
            toast({
                title: "Success",
                description: "Product images updated successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to upload images",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveImage = async (index) => {
        try {
            const currentImages = [...productData?.data?.productImages];
            currentImages.splice(index, 1);
            await updateProduct({
                id,
                productImages: currentImages
            }).unwrap();
            toast({
                title: "Success",
                description: "Image removed successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to remove image",
                variant: "destructive",
            });
        }
    };

    const handleResetStock = async () => {
        try {
            await updateProduct({
                id,
                quantity_in_stock: parseInt(stockQuantity)
            }).unwrap();
            setIsResetStockDialogOpen(false);
            toast({
                title: "Success",
                description: "Stock quantity updated successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update stock quantity",
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <RefreshCw className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    const product = productData?.data;
    if (!product) return null;

    const getStockStatus = () => {
        if (product.quantity_in_stock <= 0) return "out_of_stock";
        if (product.quantity_in_stock <= 10) return "low_stock";
        return "in_stock";
    };

    const stockStatusColors = {
        in_stock: "success",
        low_stock: "warning",
        out_of_stock: "destructive"
    };

    const stockStatusText = {
        in_stock: "In Stock",
        low_stock: "Low Stock",
        out_of_stock: "Out of Stock"
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header Section */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <Badge variant={stockStatusColors[getStockStatus()]}>
                            {stockStatusText[getStockStatus()]}
                        </Badge>
                        <Badge variant="outline">SKU: {product.id}</Badge>
                        <Badge variant="outline">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDateTime(product.createdAt)}
                        </Badge>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        Cancel
                    </Button>
                    <Button>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="images">Images</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    <TabsTrigger value="variants">Variants</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>View and update product details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Product Name</Label>
                                    <Input defaultValue={product.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Input defaultValue={product.category?.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Current Price</Label>
                                    <Input type="number" defaultValue={product.price} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Original Price</Label>
                                    <Input type="number" defaultValue={product.originalPrice} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <textarea
                                    className="w-full min-h-[100px] p-2 border rounded-md"
                                    defaultValue={product.description}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="images" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Images</CardTitle>
                            <CardDescription>Manage product images and gallery</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid grid-cols-4 gap-4">
                                    {product.productImages?.map((image, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={image}
                                                alt={`Product ${index + 1}`}
                                                className="w-full aspect-square object-cover rounded-lg"
                                            />
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        id="image-upload"
                                        onChange={handleImageUpload}
                                    />
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => document.getElementById('image-upload').click()}
                                        disabled={isUploading}
                                    >
                                        <ImagePlus className="h-4 w-4 mr-2" />
                                        {isUploading ? 'Uploading...' : 'Add Images'}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="inventory" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Inventory Management</CardTitle>
                            <CardDescription>Manage stock levels and inventory alerts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-lg font-semibold">Current Stock</h4>
                                        <p className="text-3xl font-bold mt-2">{product.quantity_in_stock}</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsResetStockDialogOpen(true)}
                                    >
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Update Stock
                                    </Button>
                                </div>

                                {product.quantity_in_stock <= 10 && (
                                    <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-3 rounded-md">
                                        <AlertTriangle className="h-4 w-4" />
                                        <span className="text-sm">Low stock alert: Order more inventory soon</span>
                                    </div>
                                )}

                                <Separator />

                                <div className="space-y-4">
                                    <h4 className="font-semibold">Stock History</h4>
                                    <div className="h-[200px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={analyticsData.last30DaysViews}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" />
                                                <YAxis />
                                                <Tooltip />
                                                <Line type="monotone" dataKey="views" stroke="#3b82f6" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="variants" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Variants</CardTitle>
                            <CardDescription>Manage product variations and attributes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[400px]">
                                <div className="space-y-4">
                                    {product.attributes?.map((attr, index) => (
                                        <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                                            <Input defaultValue={attr.attributeName} placeholder="Name (e.g., Color)" />
                                            <Input defaultValue={attr.attributeValue} placeholder="Value (e.g., Red)" />
                                            <Input type="number" defaultValue={attr.price} placeholder="Price Adjustment" />
                                            <Input type="number" defaultValue={attr.stockQuantity} placeholder="Stock" />
                                        </div>
                                    ))}
                                    <Button variant="outline" className="w-full">
                                        Add Variant
                                    </Button>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Reviews</CardTitle>
                            <CardDescription>Manage and moderate product reviews</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="text-4xl font-bold">{analyticsData.averageRating}</div>
                                        <div>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-5 w-5 ${
                                                            i < Math.floor(analyticsData.averageRating)
                                                                ? "text-yellow-400 fill-yellow-400"
                                                                : "text-gray-300"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Based on {analyticsData.reviewsCount} reviews
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    {/* Sample review - replace with actual reviews */}
                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">John Doe</span>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${
                                                                i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="text-sm text-muted-foreground">2 days ago</span>
                                        </div>
                                        <p className="text-sm">Great product! Exactly as described.</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Button variant="outline" size="sm">Reply</Button>
                                            <Button variant="outline" size="sm">Delete</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Views</p>
                                        <h3 className="text-2xl font-bold">{analyticsData.views}</h3>
                                    </div>
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Added to Cart</p>
                                        <h3 className="text-2xl font-bold">{analyticsData.addedToCart}</h3>
                                    </div>
                                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Purchases</p>
                                        <h3 className="text-2xl font-bold">{analyticsData.purchases}</h3>
                                    </div>
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                                        <h3 className="text-2xl font-bold">{analyticsData.conversionRate}%</h3>
                                    </div>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Views Trend</CardTitle>
                            <CardDescription>Product views over the last 30 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={analyticsData.last30DaysViews}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="views" stroke="#3b82f6" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <AlertDialog open={isResetStockDialogOpen} onOpenChange={setIsResetStockDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Reset Stock Quantity</AlertDialogTitle>
                        <AlertDialogDescription>
                            Enter the new stock quantity for this product.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                        <Input
                            type="number"
                            placeholder="Enter new stock quantity"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(e.target.value)}
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleResetStock}>Update</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ProductDetailDashboard;
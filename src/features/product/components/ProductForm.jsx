import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "src/components/ui/use-toast.js";
import { useImageUpload } from "src/features/product/hooks/useImageUpload.js";
import { useProductVariants } from "src/features/product/hooks/useProductVariants.js";
import { 
    useCreateProductMutation, 
    useGetProductByIdQuery, 
    useUpdateProductMutation 
} from "src/features/product/services/productApi.js";
import { useGetCategoriesQuery } from "src/store/categoryApi.js";
import ReactMarkdown from 'react-markdown';
import { ImagePlus, Loader2, PlusCircle, Trash2 } from "lucide-react";

// UI Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "src/components/ui/form.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/components/ui/select.jsx";
import { Input } from "src/components/ui/input.jsx";
import { Button } from "src/components/ui/button.jsx";
import { Textarea } from "src/components/ui/textarea.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs.jsx";
import { Card } from "src/components/ui/card.jsx";

// Validation Schemas
const attributeSchema = z.object({
    id: z.number().optional(),
    attributeName: z.string().min(1, "Attribute name is required"),
    attributeValue: z.string().min(1, "Attribute value is required"),
    price: z.number().min(0, "Price must be positive"),
    stockQuantity: z.number().min(0, "Stock must be positive")
});

const productSchema = z.object({
    name: z.string().min(1, "Name is required").max(200, "Name must be less than 200 characters"),
    description: z.string().min(1, "Description is required").max(5000, "Description must be less than 5000 characters"),
    price: z.string().min(1, "Price is required")
        .refine((val) => !isNaN(val) && Number(val) >= 0, "Price must be a positive number")
        .transform(Number),
    originalPrice: z.string()
        .refine((val) => !val || (!isNaN(val) && Number(val) >= 0), "Original price must be a positive number")
        .transform((val) => val ? Number(val) : null)
        .optional(),
    quantity_in_stock: z.string()
        .min(1, "Stock is required")
        .refine((val) => !isNaN(val) && Number(val) >= 0, "Stock must be a positive number")
        .transform(Number),
    categoryId: z.string().min(1, "Category is required"),
    thumbnail: z.string().url("Must be a valid URL"),
    productImages: z.array(z.string().url("Must be a valid URL")),
    specifications: z.array(
        z.object({
            name: z.string().min(1, "Specification name is required"),
            value: z.string().min(1, "Specification value is required"),
        })
    ).default([]),
    attributes: z.array(attributeSchema).default([])
});

// Form Components
const ImageUploadField = ({ field, onUpload, isUploading }) => (
    <div className="space-y-4">
        <FormControl>
            <Input {...field} />
        </FormControl>
        <div className="flex items-center gap-4">
            <Button
                type="button"
                variant="outline"
                onClick={onUpload}
                disabled={isUploading}
            >
                {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2"/>
                ) : (
                    <ImagePlus className="h-4 w-4 mr-2"/>
                )}
                Upload Image
            </Button>
            {field.value && (
                <img
                    src={field.value}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-lg"
                />
            )}
        </div>
    </div>
);

const MarkdownEditor = ({ field }) => (
    <Tabs defaultValue="edit" className="w-full">
        <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
            <FormControl>
                <Textarea className="min-h-[200px] font-mono" {...field} />
            </FormControl>
        </TabsContent>
        <TabsContent value="preview">
            <Card className="p-4 min-h-[200px] prose max-w-none">
                <ReactMarkdown>{field.value}</ReactMarkdown>
            </Card>
        </TabsContent>
    </Tabs>
);

export default function ProductForm({ productId, onSuccess }) {
    const { isUploading, uploadImages } = useImageUpload();
    const { data: categories } = useGetCategoriesQuery();
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    
    const isEdit = !!productId;
    const { data } = useGetProductByIdQuery(productId, { skip: !isEdit });
    const product = isEdit ? data?.data : null;

    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            originalPrice: "",
            quantity_in_stock: "",
            categoryId: "",
            thumbnail: "",
            productImages: [],
            specifications: [{ name: "", value: "" }],
            attributes: [],
        },
    });

    const { 
        attributes, 
        specifications,
        addAttribute,
        removeAttribute,
        updateAttribute,
        addSpecification,
        removeSpecification,
        updateSpecification,
        setAttributes,
        setSpecifications
    } = useProductVariants(
        product?.attributes || [], 
        product?.specifications || [{ name: "", value: "" }]
    );

    useEffect(() => {
        if (product) {
            form.reset({
                ...product,
                price: product.price?.toString(),
                originalPrice: product.originalPrice?.toString(),
                quantity_in_stock: product.quantity_in_stock?.toString(),
                categoryId: product.category_id?.toString()
            });
            setAttributes(product.attributes || []);
            setSpecifications(product.specifications || [{ name: "", value: "" }]);
        }
    }, [product, form.reset]);

    const handleImageUpload = async (e, fieldName) => {
        const files = Array.from(e.target.files);
        const urls = await uploadImages(files);
        
        if (urls.length > 0) {
            if (fieldName === "thumbnail") {
                form.setValue("thumbnail", urls[0]);
            } else {
                const currentImages = form.getValues("productImages") || [];
                form.setValue("productImages", [...currentImages, ...urls]);
            }
        }
    };

    const onSubmit = async (data) => {
        try {
            const formattedData = {
                ...data,
                specifications: specifications.filter(spec => spec.name && spec.value),
                attributes: attributes.filter(attr => attr.attributeName && attr.attributeValue)
            };

            if (product) {
                await updateProduct({ id: product.id, ...formattedData }).unwrap();
                toast({
                    title: "Success",
                    description: "Product updated successfully",
                });
            } else {
                await createProduct(formattedData).unwrap();
                toast({
                    title: "Success",
                    description: "Product created successfully",
                });
            }
            onSuccess?.();
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Name <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Description <span className="text-red-500">*</span></FormLabel>
                            <FormDescription>
                                Supports Markdown formatting. Switch to preview to see how it looks.
                            </FormDescription>
                            <MarkdownEditor field={field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Current Price <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="originalPrice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Original Price</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="quantity_in_stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Stock <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input type="number" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Category <span className="text-red-500">*</span></FormLabel>
                                <Select onValueChange={field.onChange} value={field.value || ""}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories?.data?.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Thumbnail <span className="text-red-500">*</span></FormLabel>
                                <ImageUploadField 
                                    field={field} 
                                    onUpload={() => document.getElementById('thumbnail-upload').click()} 
                                    isUploading={isUploading} 
                                />
                                <input
                                    id="thumbnail-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageUpload(e, "thumbnail")}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="productImages"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Images</FormLabel>
                                <FormDescription>
                                    Add multiple product images. They will be displayed in a gallery.
                                </FormDescription>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-4">
                                        {field.value?.map((url, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={url}
                                                    alt={`Product image ${index + 1}`}
                                                    className="h-20 w-20 object-cover rounded-lg"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => {
                                                        const newImages = field.value.filter((_, i) => i !== index);
                                                        form.setValue("productImages", newImages);
                                                    }}
                                                >
                                                    ×
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById('images-upload').click()}
                                            disabled={isUploading}
                                        >
                                            {isUploading ? (
                                                <Loader2 className="h-4 w-4 animate-spin mr-2"/>
                                            ) : (
                                                <ImagePlus className="h-4 w-4 mr-2"/>
                                            )}
                                            Add Images
                                        </Button>
                                        <input
                                            id="images-upload"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={(e) => handleImageUpload(e, "productImages")}
                                        />
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <FormLabel className="font-bold">Specifications <span className="text-red-500">*</span></FormLabel>
                        <Button type="button" variant="outline" onClick={addSpecification}>
                            Add Specification
                        </Button>
                    </div>
                    {(specifications || []).map((spec, index) => (
                        <div key={index} className="flex gap-4">
                            <Input
                                placeholder="Name"
                                value={spec.name}
                                onChange={(e) => updateSpecification(index, "name", e.target.value)}
                            />
                            <Input
                                placeholder="Value"
                                value={spec.value}
                                onChange={(e) => updateSpecification(index, "value", e.target.value)}
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => removeSpecification(index)}
                            >
                                ×
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <FormLabel className="font-bold">Product Variants</FormLabel>
                        <Button type="button" variant="outline" onClick={addAttribute}>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Add Variant
                        </Button>
                    </div>

                    {attributes.map((attr, index) => (
                        <div key={index} className="grid grid-cols-5 gap-4 items-center border rounded-lg p-4">
                            <div>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    value={attr.attributeName}
                                    onChange={(e) => updateAttribute(index, "attributeName", e.target.value)}
                                    placeholder="e.g., Color, Size"
                                />
                            </div>
                            <div>
                                <FormLabel>Value</FormLabel>
                                <Input
                                    value={attr.attributeValue}
                                    onChange={(e) => updateAttribute(index, "attributeValue", e.target.value)}
                                    placeholder="e.g., Red, XL"
                                />
                            </div>
                            <div>
                                <FormLabel>Price Adjustment</FormLabel>
                                <Input
                                    type="number"
                                    min="0"
                                    value={attr.price}
                                    onChange={(e) => updateAttribute(index, "price", e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <FormLabel>Stock</FormLabel>
                                <Input
                                    type="number"
                                    min="0"
                                    value={attr.stockQuantity}
                                    onChange={(e) => updateAttribute(index, "stockQuantity", e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                            <div className="flex items-end">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="mt-6"
                                    onClick={() => removeAttribute(index)}
                                >
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isUploading}>
                        {isUploading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2"/>
                        ) : null}
                        {product ? "Update Product" : "Create Product"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
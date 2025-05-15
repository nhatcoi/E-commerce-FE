import React, { useMemo } from "react";
import { useGetCategoriesQuery } from "src/store/categoryApi.js";
import ReactMarkdown from 'react-markdown';
import { ImagePlus, Loader2, PlusCircle, Trash2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "src/components/ui/form.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/components/ui/select.jsx";
import { Input } from "src/components/ui/input.jsx";
import { Button } from "src/components/ui/button.jsx";
import { Textarea } from "src/components/ui/textarea.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs.jsx";
import { Card } from "src/components/ui/card.jsx";
import { useProductForm } from "../hooks/useProductForm.js";

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

const buildCategoryTree = (categories) => {
    // Create a map for quick lookup
    const categoryMap = new Map();
    categories?.forEach(category => {
        categoryMap.set(category.id, { ...category, children: [] });
    });

    // Build the tree structure
    const tree = [];
    categories?.forEach(category => {
        const node = categoryMap.get(category.id);
        if (category.parentId === null) {
            tree.push(node);
        } else {
            const parent = categoryMap.get(category.parentId);
            if (parent) {
                parent.children.push(node);
            }
        }
    });

    return tree;
};

const renderCategoryOptions = (categories, level = 0) => {
    if (!categories) return null;

    return categories.map(category => (
        <React.Fragment key={category.id}>
            <SelectItem value={String(category.id)}>
                {"\u00A0".repeat(level * 4)}{category.name}
            </SelectItem>
            {category.children && renderCategoryOptions(category.children, level + 1)}
        </React.Fragment>
    ));
};

export default function ProductForm({ productId, onSuccess }) {
    const { data: categoriesData } = useGetCategoriesQuery();
    const {
        form,
        isEdit,
        isUploading,
        isLoading,
        attributes,
        specifications,
        addAttribute,
        removeAttribute,
        updateAttribute,
        addSpecification,
        removeSpecification,
        updateSpecification,
        handleImageUpload,
        onSubmit
    } = useProductForm({ productId, onSuccess });

    // Build category tree once when categories data changes
    const categoryTree = useMemo(() => {
        return buildCategoryTree(categoriesData?.data);
    }, [categoriesData]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Name <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input {...field} required />
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
                            <FormDescription>Supports Markdown formatting</FormDescription>
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
                                <FormLabel className="font-bold">Price <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input type="number" min="0" step="1.00" required {...field} />
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
                                    <Input type="number" min="0" step="1.00" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="quantity_in_stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Stock <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input type="number" min="0" required {...field} />
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
                                <Select onValueChange={field.onChange} value={field.value} required>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {renderCategoryOptions(categoryTree)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Thumbnail <span className="text-red-500">*</span></FormLabel>
                            <div className="space-y-4">
                                {value && (
                                    <div className="relative inline-block">
                                        <img
                                            src={URL.createObjectURL(value)}
                                            alt="Thumbnail"
                                            className="h-20 w-20 object-cover rounded-lg"
                                            onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute -top-2 -right-2"
                                            onClick={() => form.setValue("thumbnail", null)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                                <div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById('thumbnail').click()}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2"/> : <PlusCircle className="h-4 w-4 mr-2"/>}
                                        {value ? 'Change Thumbnail' : 'Add Thumbnail'}
                                    </Button>
                                    <input
                                        id="thumbnail"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(e, "thumbnail")}
                                        {...field}
                                    />
                                </div>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="productImages"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Product Images - Max 5MB</FormLabel>
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-4">
                                    {value?.map((file, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Product ${index + 1}`}
                                                className="h-20 w-20 object-cover rounded-lg"
                                                onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute -top-2 -right-2"
                                                onClick={() => {
                                                    const newImages = value.filter((_, i) => i !== index);
                                                    form.setValue("productImages", newImages);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById('productImages').click()}
                                    disabled={isUploading}
                                >
                                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2"/> : <PlusCircle className="h-4 w-4 mr-2"/>}
                                    Add Images
                                </Button>
                                <input
                                    id="productImages"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageUpload(e, "productImages")}
                                    {...field}
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <FormLabel className="font-bold">Specifications</FormLabel>
                        <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Specification
                        </Button>
                    </div>
                    {specifications.map((spec, index) => (
                        <div key={index} className="flex gap-4 items-start">
                            <div className="flex-1">
                                <Input
                                    placeholder="Name"
                                    value={spec.name}
                                    onChange={(e) => updateSpecification(index, 'name', e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <Input
                                    placeholder="Value"
                                    value={spec.value}
                                    onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                                />
                            </div>
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeSpecification(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <FormLabel className="font-bold">Variants</FormLabel>
                        <Button type="button" variant="outline" size="sm" onClick={addAttribute}>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Variant
                        </Button>
                    </div>
                    {attributes.map((attr, index) => (
                        <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
                            <Input
                                placeholder="Name"
                                value={attr.attributeName}
                                onChange={(e) => updateAttribute(index, 'attributeName', e.target.value)}
                            />
                            <Input
                                placeholder="Value"
                                value={attr.attributeValue}
                                onChange={(e) => updateAttribute(index, 'attributeValue', e.target.value)}
                            />
                            <Input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Price"
                                value={attr.price}
                                onChange={(e) => updateAttribute(index, 'price', e.target.value)}
                            />
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="Stock"
                                    value={attr.stockQuantity}
                                    onChange={(e) => updateAttribute(index, 'stockQuantity', e.target.value)}
                                />
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeAttribute(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="w-full md:w-auto"
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Loader2 className="h-4 w-4 animate-spin mr-2"/>
                        )}
                        {isEdit ? 'Update' : 'Create'} Product
                    </Button>
                </div>
            </form>
        </Form>
    );
}
import { useState } from 'react';
import { toast } from "src/components/ui/use-toast.js";
import { useDeleteProductMutation } from "src/features/product/services/productApi.js";
import * as XLSX from 'xlsx';

export const useProductActions = () => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deleteProduct] = useDeleteProductMutation();

    const handleEdit = (product) => {
        setEditingProduct(product.id);
        setIsCreateDialogOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id).unwrap();
            toast({
                title: "Success",
                description: "Product deleted successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete product",
                variant: "destructive",
            });
        }
    };

    const handleCloseDialog = () => {
        setIsCreateDialogOpen(false);
        setEditingProduct(null);
    };

    const handleExport = (data) => {
        if (!data?.data) return;

        const exportData = data.data.map(product => ({
            ID: product.id,
            Name: product.name,
            Price: product.price,
            Stock: product.quantity_in_stock,
            Category: product.categoryName,
            Status: product.quantity_in_stock > 0 ? "In Stock" : "Out of Stock",
            CreatedAt: new Date(product.createdAt).toLocaleDateString(),
            UpdatedAt: new Date(product.updatedAt).toLocaleDateString()
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Products");
        XLSX.writeFile(wb, `products-export-${new Date().toISOString()}.xlsx`);
    };

    return {
        isCreateDialogOpen,
        setIsCreateDialogOpen,
        editingProduct,
        handleEdit,
        handleDelete,
        handleCloseDialog,
        handleExport
    };
};
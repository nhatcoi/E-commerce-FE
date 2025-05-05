import { useState, useMemo, useCallback } from "react";
import {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} from "src/store/categoryApi.js";
import { Button } from "src/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "src/components/ui/dialog";
import { Input } from "src/components/ui/input";
import { toast } from "src/components/ui/use-toast";
import { PlusCircle, Loader2, Search } from "lucide-react";
import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";
import { Card, CardContent } from "src/components/ui/card";

export default function Categories() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const { data, isLoading, error } = useGetCategoriesQuery();
    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const filteredCategories = useMemo(() => {
        if (!data?.data) return [];
        const query = searchQuery.toLowerCase().trim();
        if (!query) return data.data;
        
        return data.data.filter(category => 
            category.name.toLowerCase().includes(query) ||
            category.description?.toLowerCase().includes(query)
        );
    }, [data?.data, searchQuery]);

    const handleCloseDialog = useCallback(() => {
        setIsDialogOpen(false);
        setEditingCategory(null);
    }, []);

    const handleSubmit = useCallback(async (formData) => {
        try {
            if (editingCategory) {
                await updateCategory({ id: editingCategory.id, ...formData }).unwrap();
                toast({
                    title: "Success",
                    description: "Category updated successfully",
                });
            } else {
                await createCategory(formData).unwrap();
                toast({
                    title: "Success",
                    description: "Category created successfully",
                });
            }
            handleCloseDialog();
        } catch (err) {
            toast({
                title: "Error",
                description: err.message || "Something went wrong",
                variant: "destructive",
            });
        }
    }, [editingCategory, createCategory, updateCategory, handleCloseDialog]);

    const handleEdit = useCallback((category) => {
        setEditingCategory(category);
        setIsDialogOpen(true);
    }, []);

    const handleDelete = useCallback(async (id) => {
        try {
            await deleteCategory(id).unwrap();
            toast({
                title: "Success",
                description: "Category deleted successfully",
            });
        } catch (err) {
            toast({
                title: "Error",
                description: err.message || "Failed to delete category",
                variant: "destructive",
            });
        }
    }, [deleteCategory]);

    if (error) {
        return (
            <Card className="mx-auto max-w-lg mt-8">
                <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                        <h2 className="text-lg font-semibold text-destructive">Error Loading Categories</h2>
                        <p className="text-muted-foreground">{error.message || "Failed to load categories"}</p>
                        <Button onClick={() => window.location.reload()} variant="outline">
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
                    <p className="text-muted-foreground">
                        Manage your product categories here.
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button disabled={isLoading}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingCategory ? "Edit Category" : "Create New Category"}
                            </DialogTitle>
                        </DialogHeader>
                        <CategoryForm
                            category={editingCategory}
                            onSubmit={handleSubmit}
                            onCancel={handleCloseDialog}
                            isSubmitting={isCreating || isUpdating}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <CategoryTable
                    categories={filteredCategories}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
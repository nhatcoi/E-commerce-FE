import React, { memo } from "react";
import { useGetProductsQuery } from "src/features/product/services/productApi.js";
import { useGetCategoriesQuery } from "src/store/categoryApi.js";
import { Button } from "src/components/ui/button.jsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "src/components/ui/dialog.jsx";
import { PlusCircle, Download } from "lucide-react";
import ProductForm from "../components/ProductForm.jsx";
import ProductsTable from "../components/ProductsTable.jsx";
import ProductFilters from "../components/ProductFilters.jsx";
import { useProductFilters } from "../hooks/useProductFilters.js";
import { useProductActions } from "../hooks/useProductActions.js";
import { ITEMS_PER_PAGE } from "src/features/product/index.js";
import { 
    Pagination, 
    PaginationContent, 
    PaginationItem, 
    PaginationLink, 
    PaginationNext, 
    PaginationPrevious 
} from "src/components/ui/pagination.jsx";

const ProductsDashboard = () => {
    const {
        filters,
        tempFilters,
        handleFilterChange,
        applyFilters,
        clearFilters,
        debouncedSearch,
        handlePageChange
    } = useProductFilters();

    const {
        isCreateDialogOpen,
        setIsCreateDialogOpen,
        editingProduct,
        handleEdit,
        handleDelete,
        handleCloseDialog,
        handleExport
    } = useProductActions();

    const { data: categoriesData } = useGetCategoriesQuery();
    const { data, isLoading, isFetching } = useGetProductsQuery({
        page: (parseInt(filters.page) || 0) + 1, // Convert to 1-based indexing for API
        limit: ITEMS_PER_PAGE,
        search: filters.search,
        ...filters
    });

    console.log("filters", filters);

    const currentPage = parseInt(filters.page) || 0;
    
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                    <p className="text-muted-foreground">
                        Manage your product catalog here.
                    </p>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4"/>
                            Add Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-7xl">
                        <DialogHeader>
                            <DialogTitle>
                                {editingProduct ? "Edit Product" : "Create New Product"}
                            </DialogTitle>
                            <DialogDescription>
                                {editingProduct
                                    ? "Make changes to your product here. Click save when you're done."
                                    : "Add a new product to your catalog. Fill in the details below."}
                            </DialogDescription>
                        </DialogHeader>
                        <ProductForm
                            productId={editingProduct}
                            onSuccess={handleCloseDialog}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-4">
                <div className="flex flex-wrap justify-between gap-4">
                    <ProductFilters
                        tempFilters={tempFilters}
                        categories={categoriesData?.data}
                        onFilterChange={handleFilterChange}
                        onApplyFilters={applyFilters}
                        onClearFilters={clearFilters}
                        onSearch={debouncedSearch}
                        defaultSearch={filters.search}
                    />
                    <Button variant="outline" onClick={() => handleExport(data)}>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>

                <ProductsTable
                    products={data?.data}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {data?.pagination && data.pagination.totalPages > 1 && (
                    <div className="flex justify-center py-4 border-t">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 0}
                                    />
                                </PaginationItem>
                                
                                {Array.from({ length: data.pagination.totalPages }, (_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink
                                            onClick={() => handlePageChange(i)}
                                            isActive={currentPage === i}
                                            className={currentPage === i ? "bg-dark text-white" : ""}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext 
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage >= data.pagination.totalPages - 1}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(ProductsDashboard);
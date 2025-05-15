import React from 'react';
import PropTypes from 'prop-types';
import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "src/components/ui/table.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu.jsx";
import { Button } from "src/components/ui/button.jsx";
import { Badge } from "src/components/ui/badge.jsx";
import { Loader2, MoreHorizontal, Trash } from "lucide-react";
import {TABLE_COLUMNS} from "src/features/product/index.js";
import {useNavigate} from "react-router-dom";



export const ProductsTable = ({
    products,
    isLoading,
    isFetching,
    onDelete
}) => {
    if (isLoading || isFetching) {
        return (
            <div className="relative border rounded-lg">
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin"/>
                        <span className="text-sm font-medium">Loading products...</span>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {TABLE_COLUMNS.map((column) => (
                                <TableHead key={column} className={column === "Actions" ? "w-24" : ""}>
                                    {column}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody />
                </Table>
            </div>
        );
    }
    const navigate = useNavigate();
    const handleRowClick = (userId) => {
        navigate(`/dashboard/products/${userId}`);
    };

    return (
        <div className="relative border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        {TABLE_COLUMNS.map((column) => (
                            <TableHead key={column} className={column === "Actions" ? "w-24" : ""}>
                                {column}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(!products || products.length === 0) ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center">
                                No products found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell key={product.id}
                                           className="flex items-center gap-3 cursor-pointer"
                                           onClick={() => handleRowClick(product.id)}
                                >
                                    <img
                                        src={product.thumbnail}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded-md"
                                    />
                                    <span>{product.name}</span>
                                </TableCell>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>{product.quantity_in_stock}</TableCell>
                                <TableCell>{product.categoryName}</TableCell>
                                <TableCell>
                                    <Badge variant={product.quantity_in_stock > 0 ? "success" : "destructive"}>
                                        {product.quantity_in_stock > 0 ? "In Stock" : "Out of Stock"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {new Date(product.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                className="text-destructive"
                                                onClick={() => onDelete(product.id)}
                                            >
                                                <Trash className="mr-2 h-4 w-4"/>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

ProductsTable.propTypes = {
    products: PropTypes.array,
    isLoading: PropTypes.bool,
    isFetching: PropTypes.bool,
    onDelete: PropTypes.func.isRequired
};

export default ProductsTable;
import React from "react";
import { CircularProgress } from "@mui/material";
import { Filter, Download, SearchIcon } from "lucide-react";
import { Input } from "src/components/ui/input.jsx";
import { Button } from "src/components/ui/button.jsx";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "src/components/ui/sheet.jsx";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "src/components/ui/pagination.jsx";
import { useUsers } from '../hooks/useUsers';
import { userServices } from '../services/userServices';
import { UserFilters, UserStatistics, UserTable } from 'src/features/users/index.js';

export default function UsersDashboard() {
    const {
        users,
        pagination,
        isLoading,
        filters,
        handleFilterChange,
        applyFilters,
        clearFilters,
        handleDelete,
        handlePageChange,
        debouncedSearch,
        search,
        page
    } = useUsers();

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                    <p className="text-muted-foreground">
                        Manage user accounts and permissions here.
                    </p>
                </div>

                <div className="rounded-lg border bg-card min-h-[400px] relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <CircularProgress />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                <p className="text-muted-foreground">
                    Manage user accounts and permissions here.
                </p>
            </div>

            <UserStatistics users={users} />

            <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users..."
                            defaultValue={search}
                            onChange={(e) => debouncedSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Filter Users</SheetTitle>
                            <SheetDescription>
                                Apply filters to refine the user list.
                            </SheetDescription>
                        </SheetHeader>
                        <UserFilters
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onApplyFilters={applyFilters}
                            onClearFilters={clearFilters}
                        />
                    </SheetContent>
                </Sheet>

                <Button variant="outline" onClick={() => userServices.exportToExcel(users)}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                </Button>
            </div>

            <div className="rounded-lg border bg-card min-h-[400px]">
                <UserTable users={users} onDelete={handleDelete} />

                {pagination && pagination.totalPages > 1 && (
                    <div className="flex justify-center py-4 border-t">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 0}
                                    />
                                </PaginationItem>
                                
                                {Array.from({ length: pagination.totalPages }, (_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink
                                            onClick={() => handlePageChange(i)}
                                            isActive={page === i}
                                            className={page === i ? "bg-dark text-white" : ""}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext 
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page >= pagination.totalPages - 1}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
}
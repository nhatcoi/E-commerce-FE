import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "src/components/ui/select.jsx";
import { Input } from "src/components/ui/input.jsx";
import { Button } from "src/components/ui/button.jsx";
import { SheetClose } from "src/components/ui/sheet.jsx";

const CONSTANTS = {
    GENDER_OPTIONS: [
        { label: "All Genders", value: "all" },
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" }
    ],
    STATUS_OPTIONS: [
        { label: "All Status", value: "all" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" }
    ]
};

export const UserFilters = ({ filters, onFilterChange, onApplyFilters, onClearFilters }) => {
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label>Role</label>
                <Select
                    value={filters.role}
                    onValueChange={(value) => onFilterChange("role", value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="MODERATOR">Moderator</SelectItem>
                        <SelectItem value="USER">User</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label>Status</label>
                <Select
                    value={filters.status}
                    onValueChange={(value) => onFilterChange("status", value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        {CONSTANTS.STATUS_OPTIONS.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label>Gender</label>
                <Select
                    value={filters.gender}
                    onValueChange={(value) => onFilterChange("gender", value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                        {CONSTANTS.GENDER_OPTIONS.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label>Birth Year</label>
                <Select
                    value={filters.birthYear}
                    onValueChange={(value) => onFilterChange("birthYear", value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        {yearOptions.map(year => (
                            <SelectItem key={year} value={year.toString()}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label>Country</label>
                <Input
                    placeholder="Filter by country"
                    value={filters.country}
                    onChange={(e) => onFilterChange("country", e.target.value)}
                />
            </div>

            <div className="flex gap-2 mt-6">
                <Button
                    variant="outline"
                    className="flex-1"
                    onClick={onClearFilters}
                >
                    Clear
                </Button>
                <SheetClose asChild>
                    <Button
                        className="flex-1"
                        onClick={onApplyFilters}
                    >
                        Apply Filters
                    </Button>
                </SheetClose>
            </div>
        </div>
    );
};
"use client"

import React from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "src/components/ui/dropdown-menu.jsx";

// eslint-disable-next-line react/prop-types
export function DropdownMenuCheckboxes({ label, options }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {label}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* eslint-disable-next-line react/prop-types */}
                {options.map((option, index) => (
                    <DropdownMenuCheckboxItem
                        key={index}
                        disabled={option.disabled}
                    >
                        {option.name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

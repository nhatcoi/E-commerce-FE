"use client"

import React, { useState } from "react"
import { Button } from "src/components/ui/button.jsx"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu.jsx"

// eslint-disable-next-line react/prop-types
export function DropdownMenuCheckboxes({ options }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {options.map((option, index) => (
                    <DropdownMenuCheckboxItem
                        key={index}
                        checked={option.checked}
                        onCheckedChange={option.onCheckedChange}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

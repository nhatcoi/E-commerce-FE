"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogContent = React.forwardRef(({className, ...props}, ref) => (
    <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/50"/>
        <AlertDialogPrimitive.Content
            ref={ref}
            className={`fixed inset-0 m-auto max-w-md bg-white p-6 rounded-md shadow-lg ${className}`}
            {...props}
        />
    </AlertDialogPrimitive.Portal>
));
export const AlertDialogHeader = ({children}) => <div className="mb-4">{children}</div>;
export const AlertDialogTitle = AlertDialogPrimitive.Title;
export const AlertDialogDescription = AlertDialogPrimitive.Description;
export const AlertDialogFooter = ({children}) => <div className="mt-4 flex justify-end space-x-2">{children}</div>;
export const AlertDialogCancel = React.forwardRef(({className, ...props}, ref) => (
    <AlertDialogPrimitive.Cancel
        ref={ref}
        className={`px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 ${className}`}
        {...props}
    />
));
export const AlertDialogAction = React.forwardRef(({className, ...props}, ref) => (
    <AlertDialogPrimitive.Action
        ref={ref}
        className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${className}`}
        {...props}
    />
));

AlertDialogContent.displayName = "AlertDialogContent";
AlertDialogCancel.displayName = "AlertDialogCancel";
AlertDialogAction.displayName = "AlertDialogAction";

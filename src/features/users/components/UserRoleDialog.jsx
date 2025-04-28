import React from 'react';
import { useUpdateUserRoleMutation } from 'src/store/userApi.js';
import { Button } from "src/components/ui/button.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "src/components/ui/select.jsx";
import { toast } from "src/components/ui/use-toast";

export const UserRoleDialog = ({ user }) => {
    const [updateUserRole] = useUpdateUserRoleMutation();
    const [role, setRole] = React.useState(user.roleNames[0] || "USER");

    const handleUpdateRole = async () => {
        try {
            await updateUserRole({ id: user.id, role }).unwrap();
            toast({
                title: "Success",
                description: "User role updated successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update user role",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-4">
            <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="MODERATOR">Moderator</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
            </Select>
            <div className="flex justify-end space-x-2">
                <Button onClick={handleUpdateRole}>Update Role</Button>
            </div>
        </div>
    );
};
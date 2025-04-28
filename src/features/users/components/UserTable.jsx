import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "src/components/ui/table.jsx";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "src/components/ui/dialog.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu.jsx";
import { Button } from "src/components/ui/button.jsx";
import { Badge } from "src/components/ui/badge.jsx";
import {
    MoreHorizontal,
    Trash,
    UserCog,
    MapPin,
    Phone,
    Calendar,
    Mail,
} from "lucide-react";
import { UserRoleDialog } from './UserRoleDialog';

const roleColors = {
    ADMIN: "bg-red-500 hover:bg-red-600",
    USER: "bg-blue-500 hover:bg-blue-600",
    MODERATOR: "bg-purple-500 hover:bg-purple-600",
};

const UserAddressInfo = ({ address }) => {
    if (!address) return null;
    return (
        <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{`${address.addressLine}, ${address.district}, ${address.city}, ${address.country}`}</span>
        </div>
    );
};

export const UserTable = ({ users, onDelete }) => {
    const navigate = useNavigate();

    const handleRowClick = (userId) => {
        navigate(`/dashboard/users/${userId}`);
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User Info</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow
                        key={user.email}
                    >
                        <TableCell key={user.email}
                                   className="cursor-pointer"
                                   onClick={() => handleRowClick(user.id)}
                        >
                            <div className="space-y-1 flex items-center gap-2">
                                <img
                                    src={user.avatar}
                                    alt={user.fullName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="space-y-1">
                                    <div className="font-medium">{user.fullName}</div>
                                    <div className="text-sm text-muted-foreground">@{user.username}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="space-y-1">
                                <div className="flex items-center text-sm">
                                    <Mail className="h-4 w-4 mr-1" />
                                    <a
                                        href={`mailto:${user.email}`}
                                        className="hover:text-black"
                                    >
                                        {user.email}
                                    </a>
                                </div>
                                {user.phoneNumber && (
                                    <div className="flex items-center text-sm">
                                        <Phone className="h-4 w-4 mr-1" />
                                        <a
                                            href={`tel:${user.phoneNumber}`}
                                            className="hover:text-black"
                                        >
                                            {user.phoneNumber}
                                        </a>
                                    </div>
                                )}
                                {user.dateOfBirth && (
                                    <div className="flex items-center text-sm">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {new Date(user.dateOfBirth).toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>
                            {user.roleNames.map((role) => (
                                <Badge key={role} className={roleColors[role]}>
                                    {role}
                                </Badge>
                            ))}
                        </TableCell>
                        <TableCell>
                            <Badge variant={user.isActive ? "success" : "destructive"}>
                                {user.isActive ? "Active" : "Inactive"}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <UserAddressInfo 
                                address={user.addresses?.find(addr => addr.isMain) || user.addresses?.[0]} 
                            />
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                <UserCog className="mr-2 h-4 w-4" />
                                                Change Role
                                            </DropdownMenuItem>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Update User Role</DialogTitle>
                                            </DialogHeader>
                                            <UserRoleDialog user={user} />
                                        </DialogContent>
                                    </Dialog>
                                    <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={() => onDelete(user.id)}
                                    >
                                        <Trash className="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
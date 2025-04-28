import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { Badge } from "src/components/ui/badge";
import { Calendar, Mail, MapPin, Phone, User } from "lucide-react";
import { useGetUserByIdQuery } from "src/store/userApi.js";
import { sortAddresses, formatAddress } from "src/utils/sortAddresses";
import {formatDateTime} from "src/utils/formatDate.js";

export function UserProfile({ userId }) {
    console.log("userId: ", userId);
    const { data, updateUser, isLoading } = useGetUserByIdQuery(userId);
    const user = data?.data || {};
    console.log("user: ", user);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    const handleEdit = () => {
        setFormData(user);
        setIsEditing(true);
    };

    const handleSave = async () => {
        await updateUser(formData);
        setIsEditing(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>User's basic information and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isEditing ? (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Addresses</Label>
                                {sortAddresses(formData.addresses, { sortBy: 'city' }).map((address) => (
                                    <div key={address.id} className="space-y-2">
                                        <Input
                                            id={`address-${address.id}`}
                                            value={address.addressLine}
                                            onChange={(e) => {
                                                const updatedAddresses = formData.addresses.map(addr =>
                                                    addr.id === address.id
                                                        ? { ...addr, addressLine: e.target.value }
                                                        : addr
                                                );
                                                setFormData({
                                                    ...formData,
                                                    addresses: updatedAddresses
                                                });
                                            }}
                                            placeholder="Address Line"
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input
                                                value={address.district}
                                                onChange={(e) => {
                                                    const updatedAddresses = formData.addresses.map(addr =>
                                                        addr.id === address.id
                                                            ? { ...addr, district: e.target.value }
                                                            : addr
                                                    );
                                                    setFormData({
                                                        ...formData,
                                                        addresses: updatedAddresses
                                                    });
                                                }}
                                                placeholder="District"
                                            />
                                            <Input
                                                value={address.city}
                                                onChange={(e) => {
                                                    const updatedAddresses = formData.addresses.map(addr =>
                                                        addr.id === address.id
                                                            ? { ...addr, city: e.target.value }
                                                            : addr
                                                    );
                                                    setFormData({
                                                        ...formData,
                                                        addresses: updatedAddresses
                                                    });
                                                }}
                                                placeholder="City"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input
                                                value={address.postcode}
                                                onChange={(e) => {
                                                    const updatedAddresses = formData.addresses.map(addr =>
                                                        addr.id === address.id
                                                            ? { ...addr, postcode: e.target.value }
                                                            : addr
                                                    );
                                                    setFormData({
                                                        ...formData,
                                                        addresses: updatedAddresses
                                                    });
                                                }}
                                                placeholder="Postal Code"
                                            />
                                            <Input
                                                value={address.country}
                                                onChange={(e) => {
                                                    const updatedAddresses = formData.addresses.map(addr =>
                                                        addr.id === address.id
                                                            ? { ...addr, country: e.target.value }
                                                            : addr
                                                    );
                                                    setFormData({
                                                        ...formData,
                                                        addresses: updatedAddresses
                                                    });
                                                }}
                                                placeholder="Country"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex space-x-2">
                                <Button onClick={handleSave}>Save Changes</Button>
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span className="font-medium">{user.fullName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>{user.phoneNumber}</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4" />
                                    <span className="font-medium">Addresses</span>
                                </div>
                                {sortAddresses(user.addresses).map((address) => (
                                    <div key={address.id}
                                         className="ml-6 flex items-center justify-between p-2 border rounded-md">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span>{address.addressLine}</span>
                                                {address.isMain && (
                                                    <Badge variant="sucess" className="text-xs">Main</Badge>
                                                )}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {address.district}, {address.city}, {address.country}, Postcode: {address.postcode}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <div className="flex flex-col">
                                    <span>Registered: {formatDateTime(user.createdAt)}</span>
                                    <span>Last Updated: {formatDateTime(user.updatedAt)}</span>
                                </div>
                            </div>
                            <div className="pt-2">
                                <Button onClick={handleEdit}>Edit Profile</Button>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account Status</CardTitle>
                    <CardDescription>Current account standing and roles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="text-sm font-medium">Account Status</div>
                        <Badge variant={user.isActive ? "success" : "destructive"}>
                            {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                    <div className="space-y-2">
                        <div className="text-sm font-medium">User Roles</div>
                        <div className="flex gap-2">
                            {user.roleNames.map((role) => (
                                <Badge key={role} variant="sucesss">
                                    {role}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
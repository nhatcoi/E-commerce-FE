import React from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { UserProfile } from '../components/UserProfile';
import { UserOrders } from '../components/UserOrders';
import { UserActivity } from '../components/UserActivity';
import { UserCart } from '../components/UserCart';
import { UserWishlist } from '../components/UserWishlist';
import { UserReviews } from '../components/UserReviews';
import { UserManagement } from '../components/UserManagement';

export default function UserDetailDashboard() {
    const { userId } = useParams();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">User Details</h2>
                <p className="text-muted-foreground">
                    Comprehensive view of user information and activities.
                </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="cart">Cart</TabsTrigger>
                    <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="management">Management</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                    <UserProfile userId={userId} />
                </TabsContent>

                <TabsContent value="orders" className="space-y-4">
                    <UserOrders userId={userId} />
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                    <UserActivity userId={userId} />
                </TabsContent>

                <TabsContent value="cart" className="space-y-4">
                    <UserCart userId={userId} />
                </TabsContent>

                <TabsContent value="wishlist" className="space-y-4">
                    <UserWishlist userId={userId} />
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                    <UserReviews userId={userId} />
                </TabsContent>

                <TabsContent value="management" className="space-y-4">
                    <UserManagement userId={userId} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
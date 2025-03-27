import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { logout } from "src/store/slices/authSlice.js";
import { authService } from "src/services/authService.js";

// shadcn components
import { Button } from "src/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "src/components/ui/card.jsx";

// Lucide icons
import { User, LogOut, Settings, CreditCard, ShoppingBag } from "lucide-react";

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(logout());
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Loading user profile...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">My Account</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="md:col-span-2"
                >
                    <Card className="border shadow-lg overflow-hidden backdrop-blur-card account-card">
                        <CardHeader className="pb-6 border-b">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center user-avatar-container">
                                    <User className="w-10 h-10 text-primary" />
                                </div>
                            </div>
                            <CardTitle className="text-xl text-center">Profile Information</CardTitle>
                            <CardDescription className="text-center text-muted-foreground">
                                {user.email}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-3 border-b border-border/40">
                                    <span className="font-medium text-muted-foreground">Name</span>
                                    <span className="font-semibold">{user.name}</span>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-border/40">
                                    <span className="font-medium text-muted-foreground">Email</span>
                                    <span className="font-semibold">{user.email}</span>
                                </div>

                                <div className="flex items-center justify-between py-3">
                                    <span className="font-medium text-muted-foreground">Member since</span>
                                    <span className="font-semibold">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                    </span>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4 p-6 pt-2">
                            <Button
                                variant="secondary"
                                className="w-full flex items-center gap-2"
                                onClick={() => navigate("/user/settings")}
                            >
                                <Settings className="w-4 h-4" />
                                <span>Edit Profile</span>
                            </Button>

                            <Button
                                variant="destructive"
                                className="w-full flex items-center gap-2"
                                onClick={handleLogout}
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                {/* Account Options */}
                <div className="md:col-span-1">
                    <Card className="border shadow-md h-full">
                        <CardHeader>
                            <CardTitle className="text-lg">Account Options</CardTitle>
                            <CardDescription>Manage your account settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button 
                                variant="outline" 
                                className="w-full justify-start gap-2"
                                onClick={() => navigate("/user/my-orders")}
                            >
                                <ShoppingBag className="w-4 h-4" />
                                <span>My Orders</span>
                            </Button>
                            
                            <Button 
                                variant="outline" 
                                className="w-full justify-start gap-2"
                                onClick={() => navigate("/user/payment-methods")}
                            >
                                <CreditCard className="w-4 h-4" />
                                <span>Payment Methods</span>
                            </Button>
                            
                            <Button 
                                variant="outline" 
                                className="w-full justify-start gap-2"
                                onClick={() => navigate("/user/wishlist")}
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    className="w-4 h-4"
                                >
                                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                                </svg>
                                <span>Wishlist</span>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
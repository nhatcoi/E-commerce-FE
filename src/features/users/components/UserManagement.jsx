import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Badge } from "src/components/ui/badge";
import { Switch } from "src/components/ui/switch";
import { Separator } from "src/components/ui/separator";
import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "src/components/ui/alert-dialog";
import {
    Shield,
    UserCog,
    Bell,
    Mail,
    Key,
    LogOut,
    Trash2,
    AlertTriangle
} from "lucide-react";

// Sample user management data for development and testing
const SAMPLE_USER_SETTINGS = {
    security: {
        twoFactorEnabled: false,
        lastPasswordChange: "2025-03-15T10:00:00Z",
        activeSessions: 3
    },
    notifications: {
        emailNotifications: true,
        pushNotifications: false,
        marketingEmails: false,
        orderUpdates: true
    },
    privacy: {
        profileVisibility: "public",
        activityVisibility: "private",
        dataSharing: false
    },
    account: {
        status: "active",
        verificationStatus: "verified",
        registrationDate: "2024-01-01T00:00:00Z",
        role: "user"
    }
};

export const UserManagement = ({ userId }) => {
    // In a real implementation, you would fetch user settings from an API
    const settings = SAMPLE_USER_SETTINGS;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            {/* Security Settings */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your account security</CardDescription>
                        </div>
                        <Shield className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                            <div className="font-medium">Two-Factor Authentication</div>
                            <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                        </div>
                        <Switch checked={settings.security.twoFactorEnabled} />
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                            <div className="font-medium">Active Sessions</div>
                            <div className="text-sm text-muted-foreground">{settings.security.activeSessions} devices</div>
                        </div>
                        <Button variant="outline" size="sm">
                            <LogOut className="h-4 w-4 mr-2" />
                            Manage Sessions
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Control how you receive notifications</CardDescription>
                        </div>
                        <Bell className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                            <div className="font-medium">Email Notifications</div>
                            <div className="text-sm text-muted-foreground">Receive order updates via email</div>
                        </div>
                        <Switch checked={settings.notifications.emailNotifications} />
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                            <div className="font-medium">Marketing Emails</div>
                            <div className="text-sm text-muted-foreground">Receive offers and updates</div>
                        </div>
                        <Switch checked={settings.notifications.marketingEmails} />
                    </div>
                </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Privacy Settings</CardTitle>
                            <CardDescription>Manage your privacy preferences</CardDescription>
                        </div>
                        <UserCog className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                            <div className="font-medium">Profile Visibility</div>
                            <div className="text-sm text-muted-foreground">
                                Currently: <Badge variant="outline">{settings.privacy.profileVisibility}</Badge>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                            <div className="font-medium">Data Sharing</div>
                            <div className="text-sm text-muted-foreground">Share usage data to improve services</div>
                        </div>
                        <Switch checked={settings.privacy.dataSharing} />
                    </div>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-destructive">Danger Zone</CardTitle>
                            <CardDescription>Irreversible account actions</CardDescription>
                        </div>
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                </CardHeader>
                <CardContent>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Account
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Delete Account
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    );
};
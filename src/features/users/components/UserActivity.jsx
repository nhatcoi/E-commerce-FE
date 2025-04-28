import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { Badge } from "src/components/ui/badge";
import {
    Activity,
    ShoppingCart,
    Heart,
    MessageSquare,
    Star,
    LogIn,
    Settings,
} from "lucide-react";

// Sample activity data for development and testing
const SAMPLE_ACTIVITIES = [
    {
        id: 1,
        type: 'purchase',
        description: 'Purchased Wireless Headphones',
        timestamp: '2025-04-27T15:30:00Z',
        icon: ShoppingCart,
        details: {
            orderId: 'ORD-001',
            amount: '$199.99'
        }
    },
    {
        id: 2,
        type: 'wishlist',
        description: 'Added Laptop Pro to wishlist',
        timestamp: '2025-04-26T10:15:00Z',
        icon: Heart,
        details: {
            productName: 'Laptop Pro'
        }
    },
    {
        id: 3,
        type: 'review',
        description: 'Reviewed Wireless Mouse',
        timestamp: '2025-04-25T09:45:00Z',
        icon: Star,
        details: {
            rating: 5,
            productName: 'Wireless Mouse'
        }
    },
    {
        id: 4,
        type: 'login',
        description: 'Logged in from new device',
        timestamp: '2025-04-24T14:20:00Z',
        icon: LogIn,
        details: {
            device: 'iPhone 15',
            location: 'Hanoi, Vietnam'
        }
    },
    {
        id: 5,
        type: 'settings',
        description: 'Updated profile information',
        timestamp: '2025-04-23T11:05:00Z',
        icon: Settings,
        details: {
            changes: ['email', 'phone number']
        }
    }
];

// Activity type to variant mapping for badges
const ACTIVITY_VARIANTS = {
    purchase: 'default',
    wishlist: 'secondary',
    review: 'success',
    login: 'warning',
    settings: 'outline'
};

export const UserActivity = ({ userId }) => {
    // In a real implementation, you would fetch activities from an API
    const activities = SAMPLE_ACTIVITIES;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const renderActivityDetails = (activity) => {
        switch (activity.type) {
            case 'purchase':
                return `Order ${activity.details.orderId} - ${activity.details.amount}`;
            case 'wishlist':
                return `Product: ${activity.details.productName}`;
            case 'review':
                return `${activity.details.productName} - ${activity.details.rating} stars`;
            case 'login':
                return `${activity.details.device} from ${activity.details.location}`;
            case 'settings':
                return `Changed: ${activity.details.changes.join(', ')}`;
            default:
                return '';
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>User's recent actions and events</CardDescription>
                        </div>
                        <Activity className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div className="mt-1">
                                    {React.createElement(activity.icon, {
                                        className: "h-5 w-5 text-muted-foreground"
                                    })}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium leading-none">
                                            {activity.description}
                                        </p>
                                        <Badge variant={ACTIVITY_VARIANTS[activity.type]}>
                                            {activity.type}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {renderActivityDetails(activity)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDate(activity.timestamp)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

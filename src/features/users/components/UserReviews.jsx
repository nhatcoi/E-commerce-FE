import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Badge } from "src/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "src/components/ui/table";
import { Star, MessageSquare, Edit2, Trash2 } from "lucide-react";

// Sample reviews data for development and testing
const SAMPLE_REVIEWS = [
    {
        id: 1,
        productName: "Wireless Headphones Pro",
        rating: 5,
        comment: "Excellent sound quality and battery life. The noise cancellation is top-notch!",
        date: "2025-04-27T15:30:00Z",
        status: "published",
        helpful: 12,
        productId: "PRD001"
    },
    {
        id: 2,
        productName: "Smart Watch Series 5",
        rating: 4,
        comment: "Great features but battery life could be better. Overall very satisfied with the purchase.",
        date: "2025-04-26T10:15:00Z",
        status: "published",
        helpful: 8,
        productId: "PRD002"
    },
    {
        id: 3,
        productName: "Laptop Stand",
        rating: 3,
        comment: "Does the job but build quality could be improved. A bit wobbly with heavier laptops.",
        date: "2025-04-25T09:45:00Z",
        status: "pending",
        helpful: 2,
        productId: "PRD003"
    }
];

const REVIEW_STATUS_VARIANTS = {
    published: 'success',
    pending: 'warning',
    rejected: 'destructive'
};

export const UserReviews = ({ userId }) => {
    // In a real implementation, you would fetch reviews from an API
    const reviews = SAMPLE_REVIEWS;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <Star
                key={index}
                className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Product Reviews</CardTitle>
                            <CardDescription>Your reviews and ratings</CardDescription>
                        </div>
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent>
                    {reviews.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                            No reviews yet
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div key={review.id} className="border rounded-lg p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium">{review.productName}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex">
                                                    {renderStars(review.rating)}
                                                </div>
                                                <span className="text-sm text-muted-foreground">
                                                    {formatDate(review.date)}
                                                </span>
                                            </div>
                                        </div>
                                        <Badge variant={REVIEW_STATUS_VARIANTS[review.status]}>
                                            {review.status}
                                        </Badge>
                                    </div>
                                    
                                    <p className="text-sm">{review.comment}</p>
                                    
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="text-sm text-muted-foreground">
                                            {review.helpful} people found this helpful
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="sm">
                                                <Edit2 className="h-4 w-4 mr-2" />
                                                Edit
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-between items-center pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {reviews.length} reviews
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
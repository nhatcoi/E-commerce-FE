import React, { useState } from "react";
import { Card, CardContent } from "src/components/ui/card";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

const NewsletterSubscribe = ({ className }) => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success("Successfully subscribed to newsletter!");
            setEmail("");
        } catch (error) {
            toast.error("Failed to subscribe. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className={className}>
            <CardContent className="p-6 sm:p-8">
                <div className="grid gap-6 sm:grid-cols-2 items-center">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                        <p className="text-muted-foreground">
                            Get the latest posts and updates delivered straight to your inbox.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <div className="relative flex-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                                required
                            />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Subscribing
                                </>
                            ) : (
                                "Subscribe"
                            )}
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
};

export default NewsletterSubscribe; 
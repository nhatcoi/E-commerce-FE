import React from 'react';
import { XCircle } from "lucide-react";
import { Button } from "src/components/ui/button";
import { useNavigate } from 'react-router-dom';

const ServerError = ({ message }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
            <div className="text-center space-y-6 max-w-md mx-auto">
                {/* Error Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 animate-ping rounded-full bg-red-400/20" />
                        <XCircle className="h-16 w-16 text-red-500 relative" />
                    </div>
                </div>

                {/* Error Code */}
                <h1 className="text-4xl font-bold text-gray-900">500</h1>
                
                {/* Error Title */}
                <h2 className="text-xl font-semibold text-gray-800">
                    Internal Server Error
                </h2>

                {/* Error Message */}
                <p className="text-muted-foreground">
                    {message || "Oops! Something went wrong on our end. We're working to fix it."}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Button 
                        variant="outline" 
                        onClick={() => window.location.reload()}
                        className="space-x-2"
                    >
                        Try Again
                    </Button>
                    <Button 
                        onClick={() => navigate('/')}
                        className="space-x-2"
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ServerError; 
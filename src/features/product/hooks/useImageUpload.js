import { useState } from 'react';
import { toast } from "src/components/ui/use-toast.js";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const useImageUpload = () => {
    const [isUploading, setIsUploading] = useState(false);

    const validateFile = (file) => {
        if (file.size > MAX_FILE_SIZE) {
            toast({
                title: "Error",
                description: `${file.name} is too large. Maximum size is 5MB.`,
                variant: "destructive",
            });
            return false;
        }

        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            toast({
                title: "Error",
                description: `${file.name} has an invalid format. Accepted formats: JPG, PNG, WEBP`,
                variant: "destructive",
            });
            return false;
        }

        return true;
    };

    const uploadImages = async (files) => {
        if (!files.length) return [];
        
        setIsUploading(true);
        try {
            const validFiles = Array.from(files).filter(validateFile);
            
            const uploadPromises = validFiles.map(async (file) => {
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error("Upload failed");

                const data = await response.json();
                return data.url;
            });

            return await Promise.all(uploadPromises);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to upload images. Please try again.",
                variant: "destructive",
            });
            return [];
        } finally {
            setIsUploading(false);
        }
    };

    return {
        isUploading,
        uploadImages
    };
};
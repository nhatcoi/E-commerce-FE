import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "src/components/ui/dialog";
import { Button } from "src/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
import { Upload, X } from "lucide-react";

export default function GalleryForm({ open, onOpenChange, image = null }) {
    const isEditing = !!image;

    const form = useForm({
        defaultValues: {
            title: image?.title || "",
            description: image?.description || "",
            tags: image?.tags?.join(", ") || "",
            type: image?.type || "",
            url: image?.url || "",
        },
    });

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            tags: data.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        };
        
        // TODO: Implement API call
        console.log(formattedData);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Edit Image" : "Add New Image"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Update the image details below"
                            : "Fill in the image details below"}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-4">
                                            {field.value ? (
                                                <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                                                    <img
                                                        src={field.value}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-1 right-1 h-6 w-6"
                                                        onClick={() => form.setValue("url", "")}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="w-24 h-24"
                                                    onClick={() => {
                                                        // TODO: Implement file upload
                                                        form.setValue("url", "https://picsum.photos/200");
                                                    }}
                                                >
                                                    <Upload className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Upload an image or provide an image URL
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="title"
                            rules={{ required: "Title is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter image title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter image description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter tags (comma-separated)"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Separate tags with commas (e.g., banner, homepage, product)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            rules={{ required: "Type is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter image type"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        E.g., banner, product, blog
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                {isEditing ? "Update" : "Create"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
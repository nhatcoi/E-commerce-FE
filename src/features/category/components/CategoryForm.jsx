import { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
import { Button } from "src/components/ui/button";

const categorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    imageUrl: z.string().url("Must be a valid URL").optional(),
});

export default function CategoryForm({ category, onSubmit, onCancel, isSubmitting }) {
    const form = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            description: "",
            imageUrl: "",
        },
    });

    useEffect(() => {
        if (category) {
            form.reset(category);
        } else {
            form.reset();
        }
    }, [category, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {category ? "Update Category" : "Create Category"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

CategoryForm.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        imageUrl: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
};
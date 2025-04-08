import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "src/components/ui/use-toast";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { Textarea } from "src/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "src/components/ui/select";
import { Loader2 } from "lucide-react";

// Form validation schema
const formSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    topic: z.string().min(1, "Please select a topic"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            topic: "",
            message: "",
        },
    });

    const topics = [
        { value: "general", label: "General Support" },
        { value: "technical", label: "Technical Support" },
        { value: "billing", label: "Billing Inquiry" },
        { value: "partnership", label: "Business Partnership" },
        { value: "complaint", label: "File a Complaint" },
    ];

    const onSubmit = async (data) => {
        if (!recaptchaValue) {
            toast({
                title: "reCAPTCHA Required",
                description: "Please complete the reCAPTCHA verification",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast({
                title: "Message Sent!",
                description: "We'll get back to you as soon as possible.",
                variant: "success",
            });

            form.reset();
            setRecaptchaValue(null);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send message. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Jackie" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="jackie@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone (Optional)</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="+84 123 456 789" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Topic */}
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Topic</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a topic" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {topics.map((topic) => (
                                        <SelectItem key={topic.value} value={topic.value}>
                                            {topic.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Message */}
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="How can we help you?"
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                    <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "your-recaptcha-site-key"}
                        onChange={setRecaptchaValue}
                    />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Send Message"
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default ContactForm; 
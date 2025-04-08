import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "src/components/ui/calendar";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "src/components/ui/select";
import { toast } from "src/components/ui/use-toast";
import { Loader2, Calendar as CalendarIcon } from "lucide-react";

const AppointmentScheduler = () => {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [purpose, setPurpose] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Available time slots
    const timeSlots = [
        "09:00 AM", "10:00 AM", "11:00 AM",
        "02:00 PM", "03:00 PM", "04:00 PM"
    ];

    // Meeting purposes
    const purposes = [
        "Product Demo",
        "Business Partnership",
        "Technical Support",
        "Sales Inquiry",
        "Other"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!date || !time || !name || !email || !purpose) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast({
                title: "Appointment Scheduled!",
                description: `Your appointment is set for ${format(date, "MMMM do, yyyy")} at ${time}`,
                variant: "success",
            });

            // Reset form
            setDate(null);
            setTime("");
            setName("");
            setEmail("");
            setPurpose("");
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to schedule appointment. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calendar */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Select Date</label>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        disabled={(date) => {
                            const day = date.getDay();
                            return day === 0 || day === 6; // Disable weekends
                        }}
                    />
                </div>

                {/* Time and Details */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Select Time</label>
                        <Select value={time} onValueChange={setTime}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose a time slot" />
                            </SelectTrigger>
                            <SelectContent>
                                {timeSlots.map((slot) => (
                                    <SelectItem key={slot} value={slot}>
                                        {slot}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Jackie Chan"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="jackie@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Meeting Purpose</label>
                        <Select value={purpose} onValueChange={setPurpose}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                            <SelectContent>
                                {purposes.map((p) => (
                                    <SelectItem key={p} value={p}>
                                        {p}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Selected Date/Time Summary */}
            {date && time && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                        Your appointment will be on{" "}
                        <strong>{format(date, "MMMM do, yyyy")}</strong> at{" "}
                        <strong>{time}</strong>
                    </span>
                </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Scheduling...
                    </>
                ) : (
                    "Schedule Appointment"
                )}
            </Button>
        </form>
    );
};

export default AppointmentScheduler; 
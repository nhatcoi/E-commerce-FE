import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs";
import { Card } from "src/components/ui/card";

// Components
import ContactInfo from "src/features/contact/ContactInfo";
import ContactForm from "src/features/contact/ContactForm";
import LiveSupport from "src/features/contact/LiveSupport";
import AppointmentScheduler from "src/features/contact/AppointmentScheduler";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Get in Touch
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We&#39;re here to help! Whether you have a question, feedback, or want to explore business opportunities,
                            our team is ready to assist you.
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Info & Live Support */}
                        <div className="lg:col-span-1 space-y-6">
                            <ContactInfo />
                            <LiveSupport />
                        </div>

                        {/* Contact Form & Appointment */}
                        <div className="lg:col-span-2">
                            <Card className="overflow-hidden border-border/40">
                                <Tabs defaultValue="contact" className="w-full">
                                    <TabsList className="w-full grid grid-cols-2">
                                        <TabsTrigger value="contact">Contact Us</TabsTrigger>
                                        <TabsTrigger value="appointment">Schedule Meeting</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="contact" className="p-6">
                                        <ContactForm />
                                    </TabsContent>
                                    <TabsContent value="appointment" className="p-6">
                                        <AppointmentScheduler />
                                    </TabsContent>
                                </Tabs>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;

import React from "react";
import { Card, CardContent } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
} from "lucide-react";

const ContactInfo = () => {
    const contactDetails = {
        address: "Phu Lam, Ha Dong, Hanoi, Vietnam",
        phone: {
            hotline: "+84 (0) 37 6696 037",
            support: "+84 (0) 37 6696 037",
        },
        email: {
            general: "info@oggy.com",
            support: "support@oggy.com",
            complaints: "complaints@oggy.com",
        },
        hours: "Mon - Fri: 9:00 AM - 6:00 PM",
    };

    const socialLinks = [
        { icon: Facebook, href: "https://facebook.com/nhatcoi037", color: "text-blue-600" },
        { icon: Instagram, href: "https://instagram.com/nhatcooi", color: "text-pink-600" },
        { icon: Twitter, href: "https://twitter.com/oggy", color: "text-blue-400" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/jackie06/", color: "text-blue-700" },
    ];

    return (
        <Card className="overflow-hidden border-border/40">
            <CardContent className="p-6 space-y-6">
                {/* Company Info */}
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-1" />
                        <div>
                            <h3 className="font-medium">Our Office</h3>
                            <p className="text-sm text-muted-foreground">{contactDetails.address}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-primary mt-1" />
                        <div>
                            <h3 className="font-medium">Phone</h3>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <p>Hotline: {contactDetails.phone.hotline}</p>
                                <p>Support: {contactDetails.phone.support}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-primary mt-1" />
                        <div>
                            <h3 className="font-medium">Email</h3>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <p>General: {contactDetails.email.general}</p>
                                <p>Support: {contactDetails.email.support}</p>
                                <p>Complaints: {contactDetails.email.complaints}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary mt-1" />
                        <div>
                            <h3 className="font-medium">Business Hours</h3>
                            <p className="text-sm text-muted-foreground">{contactDetails.hours}</p>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-border/40">
                    <h3 className="text-sm font-medium mb-3">Connect With Us</h3>
                    <div className="flex gap-2">
                        {socialLinks.map((social, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="icon"
                                className={`hover:${social.color} transition-colors`}
                                asChild
                            >
                                <a href={social.href} target="_blank" rel="noopener noreferrer">
                                    <social.icon className="w-4 h-4" />
                                </a>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Google Maps */}
                <div className="pt-4 border-t border-border/40">
                    <h3 className="text-sm font-medium mb-3">Find Us</h3>
                    <div className="aspect-video w-full rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d750.1263306125853!2d105.74847197802652!3d20.96179235721542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313452efff394ce3%3A0x391a39d4325be464!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBQaGVuaWthYQ!5e1!3m2!1svi!2s!4v1743412969937!5m2!1svi!2s"
                            width="100%"
                            height="100%"
                            style={{border: 0}}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            >
                    </iframe>
                </div>
            </div>
        </CardContent>
</Card>
)
    ;
};

export default ContactInfo; 
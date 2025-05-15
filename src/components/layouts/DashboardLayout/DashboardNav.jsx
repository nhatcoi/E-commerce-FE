import React from "react";
import {NavLink} from "react-router-dom";
import {cn} from "src/utils/utils.js";
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    LayoutGrid,
    ShoppingCart,
    Settings,
    FileText,
    ImageIcon,
    Clock,
    MapPin,
    CogIcon,
    HelpCircle,
    MessageSquare,
    FileQuestion,
    Database,
    ChevronDown,
    UserIcon,
    UserCog
} from "lucide-react";

// Social media icons
const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-blue-500">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const navigation = {
    "MAIN HOME": [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, hasSubmenu: false },
    ],
    "ALL PAGE": [
        { name: "Ecommerce", href: "/dashboard/products", icon: ShoppingCart, hasSubmenu: true },
        { name: "Category", href: "/dashboard/categories", icon: LayoutGrid, hasSubmenu: true },
        { name: "Attributes", href: "/dashboard/attributes", icon: Database, hasSubmenu: false },
        { name: "Order", href: "/dashboard/orders", icon: ShoppingBag, hasSubmenu: true },
        { name: "User", href: "/dashboard/users", icon: UserIcon, hasSubmenu: true },
        { name: "Roles", href: "/dashboard/roles", icon: UserCog, hasSubmenu: true },
        { name: "Gallery", href: "/dashboard/gallery", icon: ImageIcon, hasSubmenu: false },
        { name: "Report", href: "/dashboard/reports", icon: FileText, hasSubmenu: false }
    ],
    "SETTING": [
        { name: "Location", href: "/dashboard/location", icon: MapPin, hasSubmenu: true },
        { name: "Setting", href: "/dashboard/settings", icon: Settings, hasSubmenu: false },
        { name: "Pages", href: "/dashboard/pages", icon: FileText, hasSubmenu: true }
    ],
    "CUSTOMERS": [
        { name: "Components Care", href: "/dashboard/customers", icon: Database, hasSubmenu: false }
    ],
    "SUPPORT": [
        { name: "Help Center", href: "/dashboard/help", icon: HelpCircle, hasSubmenu: false },
        { name: "FAQs", href: "/dashboard/faqs", icon: FileQuestion, hasSubmenu: false },
        { name: "Privacy Policy", href: "/dashboard/privacy", icon: FileText, hasSubmenu: false }
    ]
};

const DashboardNav = ({className}) => {
    return (
        <div className={cn("flex flex-col justify-between h-full", className)}>
            <nav className="space-y-6">
                {Object.entries(navigation).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                        <h3 className="text-xs font-medium text-gray-400 px-3">{category}</h3>
                        <div className="space-y-1">
                            {items.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className={({isActive}) =>
                                        cn(
                                            "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-black",
                                            isActive ? "bg-accent text-black" : "text-gray-700"
                                        )
                                    }
                                >
                                    <div className="flex items-center gap-2">
                                        <item.icon className="h-4 w-4 flex-shrink-0" />
                                        <span>{item.name}</span>
                                    </div>
                                    {item.hasSubmenu && <ChevronDown className="h-4 w-4" />}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Social Media Links */}
            <div className="mt-auto pt-6 pb-4">
                <h3 className="text-xs font-medium text-gray-400 px-3 mb-2">CONNECT US</h3>
                <div className="flex justify-start space-x-4 px-3">
                    <a href="#" aria-label="Facebook">
                        <FacebookIcon />
                    </a>
                    <a href="#" aria-label="Twitter" className="text-blue-400">
                        <TwitterIcon />
                    </a>
                    <a href="#" aria-label="LinkedIn">
                        <LinkedInIcon />
                    </a>
                    <a href="#" aria-label="Instagram">
                        <InstagramIcon />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;
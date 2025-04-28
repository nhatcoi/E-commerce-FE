import React from "react";
import {Outlet, Link} from "react-router-dom";
import {cn} from "src/lib/utils.js";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "src/components/ui/sheet.jsx";
import {Button} from "src/components/ui/button.jsx";
import {Menu, Search, Bell, MessageSquare, Maximize, Grid} from "lucide-react";
import DashboardNav from "./DashboardNav.jsx";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu.jsx";

export default function DashboardLayout() {
    const {user, isAuthenticated} = useSelector((state) => state.auth2);
    const [isMobile, setIsMobile] = React.useState(false);

    if (!isAuthenticated || !user?.roleNames?.includes("ADMIN")) {
        return <Navigate to="/login" replace/>;
    }

    React.useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header
                className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    {isMobile && (
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon"
                                        className="mr-2 px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden">
                                    <Menu className="h-6 w-6"/>
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-72">
                                <div className="flex items-center mb-6">
                                    <Link to="/dashboard" className="flex items-center">
                                        <div className="text-xl font-bold text-black">JackieShop</div>
                                    </Link>
                                </div>
                                <DashboardNav className="px-2"/>
                            </SheetContent>
                        </Sheet>
                    )}

                    {/* Logo */}
                    <div className="mr-4 hidden md:flex">
                        <Link to="/dashboard" className="flex items-center">
                            <div className="text-xl font-bold text-black">JackieShop</div>
                        </Link>
                    </div>

                    {/* Search input */}
                    <div className="relative flex-1 max-w-md">
                        <div className="relative flex items-center">
                            <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Search here..."
                                className="pl-8 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-2 ml-auto">
                        {/* Theme toggle - simplified as a placeholder */}
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                            <div className="rounded-full bg-muted h-6 w-6"></div>
                        </Button>

                        {/* Notifications */}
                        <Button variant="ghost" size="icon" className="relative h-9 w-9">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">1</span>
                        </Button>

                        {/* Messages */}
                        <Button variant="ghost" size="icon" className="relative h-9 w-9">
                            <MessageSquare className="h-5 w-5" />
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white">3</span>
                        </Button>

                        {/* Fullscreen button */}
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Maximize className="h-5 w-5" />
                        </Button>

                        {/* App grid */}
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Grid className="h-5 w-5" />
                        </Button>

                        {/* User profile */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-9 flex items-center gap-2 px-2">
                                    <div className="avatar">
                                        <img
                                            src="https://github.com/shadcn.png"
                                            alt="User"
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-medium">Kristin Watson</p>
                                        <p className="text-xs text-muted-foreground">Admin</p>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div
                className="container flex-1 items-start md:grid md:grid-cols-[240px_1fr] md:gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
                {!isMobile && (
                    <aside
                        className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
                        <DashboardNav className="p-4"/>
                    </aside>
                )}
                <main className="flex w-full flex-col overflow-hidden p-4">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}
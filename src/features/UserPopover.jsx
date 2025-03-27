import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {motion, AnimatePresence} from "framer-motion";
import {logout} from "src/store/slices/authSlice.js";
import {authService} from "src/services/authService.js";
import "src/css/main/user-popover.css";

// Shadcn components
import {Button} from "src/components/ui/button.jsx";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "src/components/ui/sheet.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu.jsx";

// Icons
import {
    User,
    LogOut,
    Settings,
    UserPlus,
    LogIn,
    HelpCircle,
    Heart,
    ShoppingBag,
    Package,
    ChevronRight,
    Lock,
} from "lucide-react";

const UserPopover = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isAuthenticated} = useSelector((state) => state.auth);

    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(logout());
            setOpen(false);
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleNavigate = (path) => {
        setOpen(false);
        navigate(path);
    };

    return (
        <>
            {/* User Dropdown Trigger */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative p-0 bg-transparent hover:bg-transparent user-trigger-btn"
                        aria-label="User account"
                    >
                        <User className="w-5 h-5 text-foreground"/>
                        {isAuthenticated && (
                            <span
                                className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background user-status-badge"></span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="mt-2 min-w-[240px] p-2 bg-background/95 backdrop-blur-md border border-border/60 rounded-xl shadow-lg dropdown-user-content">
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-3 px-2 py-2.5 mb-1 avatar-container">
                                <div
                                    className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="w-5 h-5 text-primary"/>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
                                    <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
                                </div>
                            </div>

                            <DropdownMenuSeparator/>

                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer user-menu-item"
                                              onClick={() => handleNavigate("/user/profile")}>
                                <User className="w-4 h-4 text-muted-foreground item-icon"/>
                                <span>My Profile</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer user-menu-item"
                                              onClick={() => handleNavigate("/user/my-orders")}>
                                <Package className="w-4 h-4 text-muted-foreground item-icon"/>
                                <span>My Orders</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer user-menu-item"
                                              onClick={() => handleNavigate("/user/wishlist")}>
                                <Heart className="w-4 h-4 text-muted-foreground item-icon"/>
                                <span>Wishlist</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator/>

                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer user-menu-item"
                                              onClick={() => setOpen(true)}>
                                <Settings className="w-4 h-4 text-muted-foreground item-icon"/>
                                <span>Account Settings</span>
                                <ChevronRight className="w-3.5 h-3.5 ml-auto text-muted-foreground/70"/>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer user-menu-item"
                                              onClick={() => handleNavigate("/support")}>
                                <HelpCircle className="w-4 h-4 text-muted-foreground item-icon"/>
                                <span>Support</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator/>

                            <DropdownMenuItem
                                className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive destructive-button"
                                onClick={handleLogout}>
                                <LogOut className="w-4 h-4 item-icon"/>
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <>
                            <div className="text-center py-2 mb-1 avatar-container">
                                <div
                                    className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                    <User className="w-6 h-6 text-primary"/>
                                </div>
                                <p className="text-sm font-medium">Welcome</p>
                                <p className="text-xs text-muted-foreground">Sign in to your account</p>
                            </div>

                            <DropdownMenuSeparator/>

                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer user-menu-item"
                                              onClick={() => handleNavigate("/login")}>
                                <LogIn className="w-4 h-4 text-muted-foreground item-icon"/>
                                <span>Sign In</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer user-menu-item"
                                              onClick={() => handleNavigate("/login")}>
                                <UserPlus className="w-4 h-4 text-muted-foreground item-icon"/>
                                <span>Create Account</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator/>

                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer user-menu-item"
                                              onClick={() => handleNavigate("/support")}>
                                <HelpCircle className="w-4 h-4 text-muted-foreground item-icon"/>
                                <span>Support</span>
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Settings Sheet */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="right"
                              className="w-full sm:w-[380px] p-0 border-l border-border/60 backdrop-blur-md bg-background/95">
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <SheetHeader className="px-4 py-3 border-b border-border/30">
                            <div className="flex items-center justify-between">
                                <SheetTitle className="flex items-center gap-2 text-lg font-medium">
                                    <Settings className="w-4 h-4 text-primary/70"/>
                                    Account Settings
                                </SheetTitle>
                                <SheetClose
                                    className="rounded-full w-7 h-7 flex items-center justify-center transition-colors hover:bg-muted">
                                    <span className="sr-only">Close</span>
                                </SheetClose>
                            </div>
                        </SheetHeader>

                        {/* Settings Content */}
                        <div className="flex-1 overflow-auto p-4">
                            <AnimatePresence initial={false}>
                                <motion.div
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.2}}
                                >
                                    <div className="space-y-5">
                                        {/* Profile Section */}
                                        <div className="space-y-3 settings-section">
                                            <h3 className="text-sm font-medium text-muted-foreground">Profile</h3>
                                            <div className="space-y-1.5">
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start gap-3 pl-2.5 settings-button"
                                                    onClick={() => handleNavigate("/user/profile")}
                                                >
                                                    <User className="w-4 h-4 item-icon"/>
                                                    <span>Edit Profile</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start gap-3 pl-2.5 settings-button"
                                                    onClick={() => handleNavigate("/user/settings/password")}
                                                >
                                                    <Lock className="w-4 h-4 item-icon"/>
                                                    <span>Change Password</span>
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Shopping Section */}
                                        <div className="space-y-3 settings-section">
                                            <h3 className="text-sm font-medium text-muted-foreground">Shopping</h3>
                                            <div className="space-y-1.5">
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start gap-3 pl-2.5 settings-button"
                                                    onClick={() => handleNavigate("/user/my-orders")}
                                                >
                                                    <ShoppingBag className="w-4 h-4 item-icon"/>
                                                    <span>My Orders</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start gap-3 pl-2.5 settings-button"
                                                    onClick={() => handleNavigate("/user/wishlist")}
                                                >
                                                    <Heart className="w-4 h-4 item-icon"/>
                                                    <span>Wishlist</span>
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Account Section */}
                                        <div className="space-y-3 settings-section">
                                            <h3 className="text-sm font-medium text-muted-foreground">Account</h3>
                                            <div className="space-y-1.5">
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start gap-3 pl-2.5 settings-button"
                                                    onClick={() => handleNavigate("/user/settings/notifications")}
                                                >
                                                    <Settings className="w-4 h-4 item-icon"/>
                                                    <span>Notification Preferences</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start gap-3 pl-2.5 text-destructive hover:text-destructive hover:bg-destructive/10 destructive-button"
                                                    onClick={handleLogout}
                                                >
                                                    <LogOut className="w-4 h-4 item-icon"/>
                                                    <span>Logout</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default UserPopover;

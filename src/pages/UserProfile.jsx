import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "src/components/ui/tabs";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "src/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "src/components/ui/avatar";
import {Button} from "src/components/ui/button";
import {Input} from "src/components/ui/input";
import {Label} from "src/components/ui/label";
import {RadioGroup, RadioGroupItem} from "src/components/ui/radio-group";
import {Switch} from "src/components/ui/switch";
import {Separator} from "src/components/ui/separator";
import {Badge} from "src/components/ui/badge";
import {Alert, AlertDescription, AlertTitle} from "src/components/ui/alert";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "src/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "src/components/ui/alert-dialog.jsx";
import {
    User,
    Mail,
    Phone,
    Edit,
    Lock,
    LogOut,
    Shield,
    AlertTriangle,
    Smartphone,
    Laptop,
    Clock,
    MapPin,
    UserX,
    Camera,
    Save,
    X,
    Eye,
    EyeOff,
} from "lucide-react";
import {useToast} from "src/components/ui/use-toast";
import {useDispatch} from "react-redux";
import {userService} from "src/services/userService.js";
import {useLazyGetMyInfoQuery} from "src/store/authApi.js";
import {useUpdateProfileMutation} from "src/store/userApi.js";
import {setUser as setUserProfile} from "src/store/auth2Slice.js";

const UserProfile = () => {
    const dispatch = useDispatch();
    const {toast} = useToast();
    const userData = useSelector((state) => state.auth2.user);
    const [triggerGetMyInfo] = useLazyGetMyInfoQuery();
    const [updateProfile, {isLoading, error: loginError}] = useUpdateProfileMutation();

    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);

    const [user, setUser] = useState({
        fullName: "",
        username: "",
        phoneNumber: "",
        email: "",
        dateOfBirth: "",
        isActive: false,
        addresses: [],
        roleNames: [],
        avatar: ""
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (userData) {
            setUser({
                fullName: userData.fullName || "",
                username: userData.username || "",
                phoneNumber: userData.phoneNumber || "",
                email: userData.email || "",
                dateOfBirth: userData.dateOfBirth || "",
                isActive: userData.isActive ?? false,
                addresses: userData.addresses || [],
                roleNames: userData.roleNames || [],
                avatar: userData.avatar || "https://github.com/shadcn.png"
            });

            if (isEditing) {
                setEditForm({
                    name: userData.fullName || "",
                    email: userData.email || "",
                    phone: userData.phoneNumber || "",
                    birthdate: userData.dateOfBirth || "",
                    addresses: userData.addresses || []
                });
            }
        }
    }, [userData]);

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        phone: "",
        birthdate: "",
        addresses: []
    });

    useEffect(() => {
        if (user) {
            setEditForm({
                phone: user.phoneNumber || '',
                email: user.email || '',
                name: user.fullName || '',
                birthdate: user.dateOfBirth || '',
                addresses: user.addresses || [],
            });
        }
    }, [user]);


    useEffect(() => {
        setEditForm({
            name: user.fullName || "",
            email: user.email || "",
            phone: user.phoneNumber || "",
            birthdate: user.dateOfBirth || "",
            addresses: user.addresses || []
        });
    }, [user]);


    const handleEditToggle = () => {
        if (isEditing) {
            setEditForm({
                name: user.fullName || "",
                email: user.email || "",
                phone: user.phoneNumber || "",
                birthdate: user.dateOfBirth || "",
                addresses: user.addresses || []
            });
        }
        setIsEditing(!isEditing);
    };

    const handleEditFormChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveChanges = async () => {
        const formattedData = {
            phoneNumber: editForm.phone || user.phoneNumber,
            email: editForm.email || user.email,
            fullName: editForm.name || user.fullName,
            dateOfBirth: editForm.birthdate || user.dateOfBirth,
            addresses: editForm.addresses.map(address => ({
                id: address.id,
                addressLine: address.addressLine,
                city: address.city,
                district: address.district,
                postcode: address.postcode,
                country: address.country,
                isMain: address.isMain
            }))
        };
        try {
            const res = await updateProfile(formattedData).unwrap();
            setIsEditing(false);
            dispatch(setUserProfile(res.data));
            toast({
                title: "Profile Updated",
                description: "Your profile information has been updated successfully.",
            });
        } catch (error) {
            toast({
                title: "Update Failed",
                description: error?.data?.message || "Failed to update profile. Please try again.",
                variant: "destructive",
            });
        }

    };

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };


    const handlePasswordChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordSubmit = async () => {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast({
                title: "Passwords don't match",
                description: "Please make sure your passwords match.",
                variant: "destructive",
            });
            return;
        }

        try {
            await userService.updatePassword({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            });

            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            toast({
                title: "Success",
                description: "Your password has been changed successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to change password. Please try again.",
                variant: "destructive",
            });
        }
    };

    const [sessions, setSessions] = useState([
        {
            id: "session-1",
            device: "iPhone 13",
            location: "New York, USA",
            ip: "192.168.1.1",
            time: "Just now",
            current: true,
            deviceType: "mobile",
        },
        {
            id: "session-2",
            device: "MacBook Pro",
            location: "New York, USA",
            ip: "192.168.1.2",
            time: "Yesterday at 2:45 PM",
            current: false,
            deviceType: "desktop",
        },
        {
            id: "session-3",
            device: "Chrome on Windows",
            location: "Boston, USA",
            ip: "192.168.1.3",
            time: "3 days ago",
            current: false,
            deviceType: "desktop",
        },
    ]);


    const handleSessionLogout = (sessionId) => {
        setSessions(sessions.filter(session => session.id !== sessionId));
        toast({
            title: "Session Ended",
            description: "You have been logged out from the selected device.",
        });
    };


    const handleAvatarChange = (e) => {
        // In a real application, you would upload the file to a server
        // and receive a URL back. For this example, we'll simulate that.
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditForm({
                    ...editForm,
                    avatar: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };


    const handleDeleteAccount = () => {
        // Account deletion logic would go here
        toast({
            title: "Account Deleted",
            description: "Your account has been permanently deleted.",
            variant: "destructive",
        });
        // Redirect to homepage or login page
    };


    const handleTwoFactorToggle = (checked) => {
        setTwoFactorEnabled(checked);
        toast({
            title: checked ? "Two-factor authentication enabled" : "Two-factor authentication disabled",
            description: checked
                ? "Your account is now more secure."
                : "Two-factor authentication has been disabled.",
        });
    };


    const handleAddressChange = (addressId, field, value) => {
        const newAddresses = editForm.addresses.map(address =>
            address.id === addressId
                ? {...address, [field]: value}
                : address
        );
        setEditForm({
            ...editForm,
            addresses: newAddresses
        });
    };


    const handleAddAddress = () => {
        // Generate a new unique ID (timestamp + random number for uniqueness)
        const newId = Date.now() + Math.floor(Math.random() * 1000);

        setEditForm({
            ...editForm,
            addresses: [...editForm.addresses, {
                id: newId,
                addressLine: "",
                city: "",
                district: "",
                postcode: "",
                country: "",
                isMain: editForm.addresses.length === 0 // Set as component if it's the first address
            }]
        });
    };

    const handleSetMainAddress = (addressId) => {
        const newAddresses = editForm.addresses.map(address => ({
            ...address,
            isMain: address.id === addressId
        }));
        setEditForm({
            ...editForm,
            addresses: newAddresses
        });
    };

    const handleRemoveAddress = (addressId) => {
        const newAddresses = editForm.addresses.filter(address => address.id !== addressId);
        setEditForm({
            ...editForm,
            addresses: newAddresses
        });
    };

    const sortAddresses = (addresses) => {
        return [...addresses].sort((a, b) => {
            if (a.isMain && !b.isMain) return -1;
            if (!a.isMain && b.isMain) return 1;
            return 0;
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Summary Card */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="text-center pb-2">
                            <div className="relative mx-auto mb-4 w-24 h-24">
                                <Avatar className="w-24 h-24 border-4 border-background">
                                    <AvatarImage src={user.avatar} alt={user.fullName}/>
                                    <AvatarFallback>{user.fullName}</AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <label
                                        htmlFor="avatar-upload"
                                        className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer"
                                    >
                                        <Camera size={16}/>
                                        <input
                                            id="avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                    </label>
                                )}
                            </div>

                            <CardTitle className="text-xl">{user.fullName}</CardTitle>
                            <CardDescription className="flex items-center justify-center">
                                <Mail size={14} className="mr-1"/> {user.email}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="text-sm">
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <Phone size={14} className="mr-2 text-muted-foreground"/>
                                    <span>{user.phoneNumber}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin size={14} className="mr-2 text-muted-foreground"/>
                                    <span>
                                        {user.addresses.find(addr => addr.isMain)
                                            ? `${user.addresses.find(addr => addr.isMain).addressLine}, ${user.addresses.find(addr => addr.isMain).district}, ${user.addresses.find(addr => addr.isMain).city}, ${user.addresses.find(addr => addr.isMain).country}`
                                            : "No default address set"}
                                    </span>
                                </div>
                                {!isEditing && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mt-4 w-full"
                                        onClick={handleEditToggle}
                                    >
                                        <Edit size={14} className="mr-2"/> Edit Profile
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Management Card */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="text-lg">Account Management</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <Shield size={16} className="mr-2 text-muted-foreground"/>
                                    <span>Two-factor authentication</span>
                                </div>
                                <Switch
                                    checked={twoFactorEnabled}
                                    onCheckedChange={handleTwoFactorToggle}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <Mail size={16} className="mr-2 text-muted-foreground"/>
                                    <span>Email notifications</span>
                                </div>
                                <Switch
                                    checked={emailNotifications}
                                    onCheckedChange={setEmailNotifications}
                                />
                            </div>
                            <Separator/>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Lock size={14} className="mr-2"/> Change Password
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Change Password</DialogTitle>
                                        <DialogDescription>
                                            Update your password to keep your account secure.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="current-password"
                                                    name="currentPassword"
                                                    type={showPasswords.current ? "text" : "password"}
                                                    value={passwordForm.currentPassword}
                                                    onChange={handlePasswordChange}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => togglePasswordVisibility('current')}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPasswords.current ? (
                                                        <EyeOff size={16}/>
                                                    ) : (
                                                        <Eye size={16}/>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="new-password"
                                                    name="newPassword"
                                                    type={showPasswords.new ? "text" : "password"}
                                                    value={passwordForm.newPassword}
                                                    onChange={handlePasswordChange}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => togglePasswordVisibility('new')}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPasswords.new ? (
                                                        <EyeOff size={16}/>
                                                    ) : (
                                                        <Eye size={16}/>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">Confirm Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="confirm-password"
                                                    name="confirmPassword"
                                                    type={showPasswords.confirm ? "text" : "password"}
                                                    value={passwordForm.confirmPassword}
                                                    onChange={handlePasswordChange}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => togglePasswordVisibility('confirm')}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPasswords.confirm ? (
                                                        <EyeOff size={16}/>
                                                    ) : (
                                                        <Eye size={16}/>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handlePasswordSubmit}>Save Changes</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm" className="w-full">
                                        <UserX size={14} className="mr-2"/> Delete Account
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            account and remove all your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDeleteAccount}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                            Delete Account
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="grid grid-cols-2 mb-8">
                            <TabsTrigger value="profile">
                                <User size={16} className="mr-2"/> Profile Information
                            </TabsTrigger>
                            <TabsTrigger value="security">
                                <Shield size={16} className="mr-2"/> Security
                            </TabsTrigger>
                        </TabsList>

                        {/* Profile Tab */}
                        <TabsContent value="profile">
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>Profile Information</CardTitle>
                                        {!isEditing ? (
                                            <Button variant="outline" size="sm" onClick={handleEditToggle}>
                                                <Edit size={14} className="mr-2"/> Edit
                                            </Button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <Button size="sm" onClick={handleSaveChanges}>
                                                    <Save size={14} className="mr-2"/> Save
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={handleEditToggle}>
                                                    <X size={14} className="mr-2"/> Cancel
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    <CardDescription>
                                        Manage your personal information and preferences
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {/* Personal Information Form */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                {isEditing ? (
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        value={editForm.name}
                                                        onChange={handleEditFormChange}
                                                    />
                                                ) : (
                                                    <div
                                                        className="p-2 border rounded-md bg-muted/20">{user.fullName}</div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                {isEditing ? (
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={editForm.email}
                                                        onChange={handleEditFormChange}
                                                    />
                                                ) : (
                                                    <div
                                                        className="p-2 border rounded-md bg-muted/20">{user.email}</div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                {isEditing ? (
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        value={editForm.phone}
                                                        onChange={handleEditFormChange}
                                                    />
                                                ) : (
                                                    <div
                                                        className="p-2 border rounded-md bg-muted/20">{user.phoneNumber}</div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="birthdate">Birth Date</Label>
                                                {isEditing ? (
                                                    <Input
                                                        id="birthdate"
                                                        name="birthdate"
                                                        type="date"
                                                        value={editForm.birthdate}
                                                        onChange={handleEditFormChange}
                                                    />
                                                ) : (
                                                    <div className="p-2 border rounded-md bg-muted/20">
                                                        {new Date(user.dateOfBirth).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2 col-span-2">
                                                <div className="flex justify-between items-center mb-4">
                                                    <Label>Addresses</Label>
                                                    {isEditing && (
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={handleAddAddress}
                                                        >
                                                            Add Address
                                                        </Button>
                                                    )}
                                                </div>

                                                {isEditing ? (
                                                    <div className="space-y-4">
                                                        {sortAddresses(editForm.addresses).map((address, index) => (
                                                            <Card key={address.id} className="p-4">
                                                                <div className="flex justify-between items-start mb-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <h4 className="font-medium">Address {index + 1}</h4>
                                                                        {address.isMain && (
                                                                            <Badge variant="secondary">Default</Badge>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        {!address.isMain && (
                                                                            <Button
                                                                                type="button"
                                                                                variant="outline"
                                                                                size="sm"
                                                                                onClick={() => handleSetMainAddress(address.id)}
                                                                            >
                                                                                Set as Default
                                                                            </Button>
                                                                        )}
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={() => handleRemoveAddress(address.id)}
                                                                        >
                                                                            <X size={14}
                                                                               className="text-muted-foreground"/>
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor={`addressLine-${address.id}`}>Address
                                                                            Line</Label>
                                                                        <Input
                                                                            id={`addressLine-${address.id}`}
                                                                            value={address.addressLine}
                                                                            onChange={(e) => handleAddressChange(address.id, 'addressLine', e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label
                                                                            htmlFor={`district-${address.id}`}>District</Label>
                                                                        <Input
                                                                            id={`district-${address.id}`}
                                                                            value={address.district}
                                                                            onChange={(e) => handleAddressChange(address.id, 'district', e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label
                                                                            htmlFor={`city-${address.id}`}>City</Label>
                                                                        <Input
                                                                            id={`city-${address.id}`}
                                                                            value={address.city}
                                                                            onChange={(e) => handleAddressChange(address.id, 'city', e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label
                                                                            htmlFor={`postcode-${address.id}`}>Postcode</Label>
                                                                        <Input
                                                                            id={`postcode-${address.id}`}
                                                                            value={address.postcode}
                                                                            onChange={(e) => handleAddressChange(address.id, 'postcode', e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label
                                                                            htmlFor={`country-${address.id}`}>Country</Label>
                                                                        <Input
                                                                            id={`country-${address.id}`}
                                                                            value={address.country}
                                                                            onChange={(e) => handleAddressChange(address.id, 'country', e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {sortAddresses(user.addresses).map((address, index) => (
                                                            <Card key={address.id} className="p-4">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <h4 className="font-medium">Address {index + 1}</h4>
                                                                    {address.isMain && (
                                                                        <Badge variant="secondary">Default</Badge>
                                                                    )}
                                                                </div>
                                                                <div className="text-sm text-muted-foreground">
                                                                    <p>{address.addressLine}</p>
                                                                    <p>{address.district}, {address.city}</p>
                                                                    <p>{address.postcode}</p>
                                                                    <p>{address.country}</p>
                                                                </div>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Gender</Label>
                                                {isEditing ? (
                                                    <RadioGroup
                                                        value={editForm.gender}
                                                        onValueChange={(value) =>
                                                            setEditForm({...editForm, gender: value})
                                                        }
                                                        className="flex gap-4"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="male" id="male"/>
                                                            <Label htmlFor="male">Male</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="female" id="female"/>
                                                            <Label htmlFor="female">Female</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="other" id="other"/>
                                                            <Label htmlFor="other">Other</Label>
                                                        </div>
                                                    </RadioGroup>
                                                ) : (
                                                    <div className="p-2 border rounded-md bg-muted/20 capitalize">
                                                        {user.gender}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Security Tab */}
                        <TabsContent value="security">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Security Settings</CardTitle>
                                    <CardDescription>
                                        Manage your account security and active sessions
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Two-Factor Authentication */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Add an extra layer of security to your account
                                                </p>
                                            </div>
                                            <Switch
                                                checked={twoFactorEnabled}
                                                onCheckedChange={handleTwoFactorToggle}
                                            />
                                        </div>

                                        {twoFactorEnabled ? (
                                            <Alert>
                                                <Shield className="h-4 w-4"/>
                                                <AlertTitle>Authentication is enabled</AlertTitle>
                                                <AlertDescription>
                                                    Your account is protected with two-factor authentication.
                                                </AlertDescription>
                                            </Alert>
                                        ) : (
                                            <Alert variant="destructive">
                                                <AlertTriangle className="h-4 w-4"/>
                                                <AlertTitle>Authentication is disabled</AlertTitle>
                                                <AlertDescription>
                                                    Enable two-factor authentication to increase your account security.
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                    </div>

                                    <Separator/>

                                    {/* Recent Login Activity */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Recent Login Activity</h3>

                                        {sessions.map((session) => (
                                            <div
                                                key={session.id}
                                                className="mb-4 p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
                                            >
                                                <div className="flex items-center">
                                                    {session.deviceType === 'mobile' ? (
                                                        <Smartphone className="h-8 w-8 mr-4 text-primary"/>
                                                    ) : (
                                                        <Laptop className="h-8 w-8 mr-4 text-primary"/>
                                                    )}
                                                    <div>
                                                        <div className="flex items-center">
                                                            <span className="font-medium">{session.device}</span>
                                                            {session.current && (
                                                                <Badge className="ml-2">Current</Badge>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 mt-1">
                                                            <span className="flex items-center">
                                                                <MapPin size={12} className="mr-1"/> {session.location}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Clock size={12} className="mr-1"/> {session.time}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {!session.current && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleSessionLogout(session.id)}
                                                    >
                                                        <LogOut size={14} className="mr-2"/> Log out
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full">
                                        <LogOut size={14} className="mr-2"/> Log Out from All Devices
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
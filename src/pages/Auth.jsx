import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";
import {authApi} from "src/api/authApi.js";
import "src/styles/component/Auth.css";

// shadcn components
import {Button} from "src/components/ui/button.jsx";
import {Input} from "src/components/ui/input.jsx";
import {Label} from "src/components/ui/label.jsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "src/components/ui/card.jsx";
import {Alert, AlertDescription} from "src/components/ui/alert.jsx";
import {toast} from "src/components/ui/use-toast";

// RTK Query
import {useLoginMutation, useLazyGetMyInfoQuery} from "src/store/authApi";
import {setCredentials} from "src/store/auth2slice";

// Lucide icons
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle,
    Loader2
} from "lucide-react";

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {user, isAuthenticated} = useSelector((state) => state.auth2);
    const [login, { isLoading, error: loginError }] = useLoginMutation();
    const [triggerGetMyInfo] = useLazyGetMyInfoQuery();


    const [activeTab, setActiveTab] = useState("login");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [redirectMessage, setRedirectMessage] = useState("");


    useEffect(() => {
        if (location.state?.message) {
            setRedirectMessage(location.state.message);
        }
    }, [location.state]);

    useEffect(() => {
        if (isAuthenticated && user) {
            const redirectTo = location.state?.from || "/";
            navigate(redirectTo, { replace: true });
        }
    }, [isAuthenticated, user, navigate, location.state]);

    useEffect(() => {
        if (activeTab === "login" || activeTab === "register") {
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
            setFormErrors({});
            setSuccessMessage("");
        }
    }, [activeTab]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            console.log("Starting login process");
            const loginRes = await login({
                userIdentifier: formData.email,
                password: formData.password
            }).unwrap();

            const accessToken = loginRes.data.accessToken;
            console.log("Received access token:", accessToken ? "Token exists" : "No token");

            try {
                const userInfoRes = await triggerGetMyInfo().unwrap();
                console.log("User info retrieved successfully");

                dispatch(setCredentials({
                    accessToken,
                    user: userInfoRes.data
                }));

                // Verify redux state was updated
                const currentState = store.getState().auth2;
                console.log("Auth state after login:", 
                    currentState.accessToken ? "Token set in state" : "No token in state",
                    currentState.user ? "User set in state" : "No user in state"
                );

                toast({
                    title: "Success",
                    description: "Logged in successfully",
                });

                navigate(location.state?.from || "/", { replace: true });
            } catch (userInfoErr) {
                console.error("Failed to get user info:", userInfoErr);
                toast({
                    variant: "destructive",
                    title: "Login Error",
                    description: "Failed to get user information"
                });
            }
        } catch (err) {
            console.error("Login failed:", err);
            toast({
                variant: "destructive",
                title: "Login failed",
                description: err.data?.message || "An unexpected error occurred"
            });
        }
    };


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error for this field when typing
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ""
            });
        }
    };

    const validateForm = () => {
        const errors = {};

        if (activeTab === "register" && !formData.name.trim()) {
            errors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (activeTab === "register" && formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };



    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            // Make API call to register endpoint
            await authApi.register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            toast({
                title: "Success",
                description: "Registration successful! Please log in.",
            });

            setActiveTab("login");

            // Reset form
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Registration failed",
                description: err.response?.data?.message || "An error occurred during registration"
            });
        }
    };

    const formVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0, transition: {duration: 0.3}}
    };

    if (isAuthenticated && user) {
        return null;
    }

    return (
        <div className="w-full py-12 md:py-16 lg:py-20 px-4 min-h-[calc(100vh-200px)] bg-background/50 account-page-bg">
            <div className="max-w-md mx-auto">
                {/* Only show the login/register form since we're redirecting authenticated users */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={formVariants}
                        className="w-full"
                    >
                        <Card className="border shadow-lg overflow-hidden backdrop-blur-card account-card">
                            <CardHeader className="space-y-1 pb-4">
                                <CardTitle className="text-xl text-center">
                                    {activeTab === "login" ? "Login" : "Register"}
                                </CardTitle>
                                <CardDescription className="text-center">
                                    {activeTab === "login"
                                        ? "Enter your email below to login to your account"
                                        : "Fill out the form below to create a new account"}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4 pt-0">
                                {/* Display redirect message if it exists */}
                                {redirectMessage && (
                                    <Alert className="mb-4 border-amber-500 bg-amber-50 text-amber-900">
                                        <AlertCircle className="h-4 w-4 text-amber-500" />
                                        <AlertDescription>{redirectMessage}</AlertDescription>
                                    </Alert>
                                )}

                                {/* Error and success alerts */}
                                <AnimatePresence>
                                    {(loginError?.data?.message || formErrors.general) && (
                                        <motion.div
                                            initial={{opacity: 0, height: 0}}
                                            animate={{opacity: 1, height: "auto"}}
                                            exit={{opacity: 0, height: 0}}
                                            transition={{duration: 0.2}}
                                            className="error-animation"
                                        >
                                            <Alert variant="destructive" className="mb-4">
                                                <AlertCircle className="h-4 w-4"/>
                                                <AlertDescription>
                                                    {loginError?.data?.message || formErrors.general}
                                                </AlertDescription>
                                            </Alert>
                                        </motion.div>
                                    )}

                                    {successMessage && (
                                        <motion.div
                                            initial={{opacity: 0, height: 0}}
                                            animate={{opacity: 1, height: "auto"}}
                                            exit={{opacity: 0, height: 0}}
                                            transition={{duration: 0.2}}
                                            className="success-animation"
                                        >
                                            <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
                                                <CheckCircle className="h-4 w-4 text-green-500"/>
                                                <AlertDescription className="text-green-700">
                                                    {successMessage}
                                                </AlertDescription>
                                            </Alert>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Form */}
                                <form onSubmit={activeTab === "login" ? handleLogin : handleRegister}>
                                    <div className="space-y-4">
                                        {/* Name field (only for register) */}
                                        {activeTab === "register" && (
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-sm font-medium">
                                                    Name
                                                </Label>
                                                <div className="relative input-focus-ring">
                                                    <div
                                                        className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <User className="h-4 w-4 text-muted-foreground"/>
                                                    </div>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter your name"
                                                        className={`pl-12 pr-4 form-input-animated ${formErrors.name ? 'border-red-500 focus-visible:ring-red-300' : ''}`}
                                                    />
                                                </div>
                                                {formErrors.name && (
                                                    <p className="text-sm text-red-500">{formErrors.name}</p>
                                                )}
                                            </div>
                                        )}

                                        {/* Email field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-medium">
                                                Email
                                            </Label>
                                            <div className="relative input-focus-ring">
                                                <div
                                                    className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <Mail className="h-4 w-4 text-muted-foreground"/>
                                                </div>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="name@example.com"
                                                    className={`pl-12 pr-4 form-input-animated ${formErrors.email ? 'border-red-500 focus-visible:ring-red-300' : ''}`}
                                                />
                                            </div>
                                            {formErrors.email && (
                                                <p className="text-sm text-red-500">{formErrors.email}</p>
                                            )}
                                        </div>

                                        {/* Password field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="password" className="text-sm font-medium">
                                                Password
                                            </Label>
                                            <div className="relative input-focus-ring">
                                                <div
                                                    className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <Lock className="h-4 w-4 text-muted-foreground"/>
                                                </div>
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    placeholder="••••••••"
                                                    className={`pl-12 pr-12 form-input-animated ${formErrors.password ? 'border-red-500 focus-visible:ring-red-300' : ''}`}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    tabIndex="-1"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4"/>
                                                    ) : (
                                                        <Eye className="h-4 w-4"/>
                                                    )}
                                                </button>
                                            </div>
                                            {formErrors.password && (
                                                <p className="text-sm text-red-500">{formErrors.password}</p>
                                            )}
                                        </div>

                                        {/* Confirm Password field (only for register) */}
                                        {activeTab === "register" && (
                                            <div className="space-y-2">
                                                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                                    Confirm Password
                                                </Label>
                                                <div className="relative input-focus-ring">
                                                    <div
                                                        className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <Lock className="h-4 w-4 text-muted-foreground"/>
                                                    </div>
                                                    <Input
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        value={formData.confirmPassword}
                                                        onChange={handleInputChange}
                                                        placeholder="••••••••"
                                                        className={`pl-12 pr-12 form-input-animated ${formErrors.confirmPassword ? 'border-red-500 focus-visible:ring-red-300' : ''}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        tabIndex="-1"
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff className="h-4 w-4"/>
                                                        ) : (
                                                            <Eye className="h-4 w-4"/>
                                                        )}
                                                    </button>
                                                </div>
                                                {formErrors.confirmPassword && (
                                                    <p className="text-sm text-red-500">{formErrors.confirmPassword}</p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        className="w-full mt-6 flex items-center justify-center gap-2"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                <span>Please wait</span>
                                            </>
                                        ) : (
                                            activeTab === "login" ? "Sign In" : "Create Auth"
                                        )}
                                    </Button>
                                </form>
                            </CardContent>

                            <CardFooter className="flex flex-col items-center justify-center space-y-2 pt-0">
                                <div className="text-sm text-center text-muted-foreground">
                                    {activeTab === "login" ? (
                                        <p>Don't have an account?</p>
                                    ) : (
                                        <p>Already have an account?</p>
                                    )}
                                </div>

                                <Button
                                    variant="outline"
                                    type="button"
                                    className="w-full tab-transition"
                                    onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
                                >
                                    {activeTab === "login" ? "Create Auth" : "Sign In"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Auth;
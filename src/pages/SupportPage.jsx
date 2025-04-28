import {useState} from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "src/components/ui/accordion.jsx";
import {Button} from "src/components/ui/button.jsx";
import {Input} from "src/components/ui/input.jsx";
import {Textarea} from "src/components/ui/textarea.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "src/components/ui/tabs.jsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "src/components/ui/card.jsx";
import {Badge} from "src/components/ui/badge.jsx";
import {Separator} from "src/components/ui/separator.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "src/components/ui/select.jsx";

import {
    Search,
    Phone,
    Mail,
    MessageSquare,
    Clock,
    ShoppingBag,
    Truck,
    RefreshCw,
    User,
    Tag,
    HelpCircle,
    FileText,
    Shield,
    Package,
    AlertTriangle,
    ChevronRight,
} from "lucide-react";

const SupportPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [orderNumber, setOrderNumber] = useState("");

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section with Search */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
                    <p className="text-muted-foreground mb-6">
                        Find answers to your questions or contact our support team
                    </p>
                    <div className="flex w-full max-w-lg mx-auto">
                        <Input
                            placeholder="Search for help topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <Button variant="default" className="rounded-l-none">
                            <Search className="h-4 w-4 mr-2"/>
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            {/* Quick Help Categories */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-center">Quick Help</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="text-center cursor-pointer transition-all hover:border-primary hover:shadow-md">
                        <CardContent className="pt-6">
                            <ShoppingBag className="h-10 w-10 mx-auto mb-3 text-primary"/>
                            <h3 className="font-medium">Orders & Payments</h3>
                        </CardContent>
                    </Card>
                    <Card className="text-center cursor-pointer transition-all hover:border-primary hover:shadow-md">
                        <CardContent className="pt-6">
                            <Truck className="h-10 w-10 mx-auto mb-3 text-primary"/>
                            <h3 className="font-medium">Shipping & Delivery</h3>
                        </CardContent>
                    </Card>
                    <Card className="text-center cursor-pointer transition-all hover:border-primary hover:shadow-md">
                        <CardContent className="pt-6">
                            <RefreshCw className="h-10 w-10 mx-auto mb-3 text-primary"/>
                            <h3 className="font-medium">Returns & Refunds</h3>
                        </CardContent>
                    </Card>
                    <Card className="text-center cursor-pointer transition-all hover:border-primary hover:shadow-md">
                        <CardContent className="pt-6">
                            <User className="h-10 w-10 mx-auto mb-3 text-primary"/>
                            <h3 className="font-medium">Account & Profile</h3>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Main Support Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Left Column: FAQs and How-to Guides */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="faq">
                        <TabsList className="w-full grid grid-cols-2 mb-6">
                            <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
                            <TabsTrigger value="guides">How-to Guides</TabsTrigger>
                        </TabsList>

                        <TabsContent value="faq">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Frequently Asked Questions</CardTitle>
                                    <CardDescription>
                                        Find answers to the most common questions about our services
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">
                                        {/* Payments FAQs */}
                                        <div className="mb-4">
                                            <Badge variant="outline" className="mb-2">
                                                Payments
                                            </Badge>
                                            <AccordionItem value="payment-methods">
                                                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                                                <AccordionContent>
                                                    We accept all major credit cards (Visa, MasterCard, American
                                                    Express),
                                                    PayPal, Apple Pay, Google Pay, and bank transfers. Payment options
                                                    may
                                                    vary depending on your location.
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="payment-issues">
                                                <AccordionTrigger>My payment failed. What should I
                                                    do?</AccordionTrigger>
                                                <AccordionContent>
                                                    Please verify that your payment details are correct and that your
                                                    card
                                                    has not expired. If problems persist, contact your bank to ensure
                                                    there
                                                    are no restrictions on your card, or try an alternative payment
                                                    method.
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="refund-time">
                                                <AccordionTrigger>How long do refunds take to
                                                    process?</AccordionTrigger>
                                                <AccordionContent>
                                                    Once we approve your refund request, it typically takes 5-10
                                                    business
                                                    days for the amount to be credited back to your original payment
                                                    method.
                                                    Bank processing times may vary.
                                                </AccordionContent>
                                            </AccordionItem>
                                        </div>

                                        {/* Shipping FAQs */}
                                        <div className="mb-4">
                                            <Badge variant="outline" className="mb-2">
                                                Shipping
                                            </Badge>
                                            <AccordionItem value="shipping-time">
                                                <AccordionTrigger>How long will my delivery take?</AccordionTrigger>
                                                <AccordionContent>
                                                    Standard shipping typically takes 3-5 business days within the
                                                    country
                                                    and 7-14 business days for international orders. Express shipping
                                                    options
                                                    are available at checkout for faster delivery.
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="tracking-order">
                                                <AccordionTrigger>How can I track my order?</AccordionTrigger>
                                                <AccordionContent>
                                                    Once your order ships, you'll receive a tracking number via email.
                                                    You can
                                                    also view your order status by logging into your account and
                                                    visiting the
                                                    "Order History" section, or use our Order Tracking tool on this
                                                    page.
                                                </AccordionContent>
                                            </AccordionItem>
                                        </div>

                                        {/* Returns FAQs */}
                                        <div className="mb-4">
                                            <Badge variant="outline" className="mb-2">
                                                Returns & Refunds
                                            </Badge>
                                            <AccordionItem value="return-policy">
                                                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                                                <AccordionContent>
                                                    We offer a 30-day return policy for most items. Products must be in
                                                    their
                                                    original condition and packaging. Some items like personalized
                                                    products or
                                                    hygiene products cannot be returned for safety and sanitary reasons.
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="return-process">
                                                <AccordionTrigger>How do I return a product?</AccordionTrigger>
                                                <AccordionContent>
                                                    To initiate a return, log in to your account, find the order in your
                                                    Order
                                                    History, and select "Return Item." Follow the instructions to
                                                    generate a
                                                    return shipping label. Pack the item securely and drop it off at a
                                                    shipping location.
                                                </AccordionContent>
                                            </AccordionItem>
                                        </div>

                                        {/* Account FAQs */}
                                        <div className="mb-4">
                                            <Badge variant="outline" className="mb-2">
                                                User Accounts
                                            </Badge>
                                            <AccordionItem value="create-account">
                                                <AccordionTrigger>How do I create an account?</AccordionTrigger>
                                                <AccordionContent>
                                                    Click on the "Sign Up" or "Register" button at the top of the page.
                                                    Fill
                                                    in your email address, create a password, and provide the required
                                                    personal information. You can also register using your Google or
                                                    Facebook accounts.
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="reset-password">
                                                <AccordionTrigger>I forgot my password. How do I reset
                                                    it?</AccordionTrigger>
                                                <AccordionContent>
                                                    Click on "Login," then select "Forgot Password." Enter the email
                                                    address
                                                    associated with your account, and we'll send you instructions to
                                                    reset your password.
                                                </AccordionContent>
                                            </AccordionItem>
                                        </div>

                                        {/* Promotions FAQs */}
                                        <div>
                                            <Badge variant="outline" className="mb-2">
                                                Promotions & Discounts
                                            </Badge>
                                            <AccordionItem value="apply-discount">
                                                <AccordionTrigger>How do I apply a discount code?</AccordionTrigger>
                                                <AccordionContent>
                                                    During checkout, you'll find a field labeled "Discount Code" or
                                                    "Promo Code"
                                                    on the payment page. Enter your code and click "Apply" to see the
                                                    discount
                                                    reflected in your order total.
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="discount-not-working">
                                                <AccordionTrigger>Why isn't my discount code working?</AccordionTrigger>
                                                <AccordionContent>
                                                    Discount codes may have expired, be case-sensitive, or apply to
                                                    specific products only.
                                                    Make sure the code is entered correctly and check the terms and
                                                    conditions of the offer.
                                                    Some codes cannot be combined with other promotions.
                                                </AccordionContent>
                                            </AccordionItem>
                                        </div>
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="guides">
                            <Card>
                                <CardHeader>
                                    <CardTitle>How-to Guides</CardTitle>
                                    <CardDescription>
                                        Step-by-step instructions to help you navigate our platform
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {/* Guide 1 */}
                                        <div className="bg-muted/50 p-4 rounded-lg">
                                            <h3 className="text-lg font-medium mb-2">How to Place an Order</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
                                                    <p>Browse our catalog and select the items you wish to purchase by
                                                        clicking "Add to Cart."</p>
                                                </div>
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
                                                    <p>When you're ready to check out, click the cart icon and select
                                                        "Proceed to Checkout."</p>
                                                </div>
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
                                                    <p>Enter your shipping information or select a saved address.</p>
                                                </div>
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</span>
                                                    <p>Choose a shipping method and enter payment details.</p>
                                                </div>
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">5</span>
                                                    <p>Review your order and click "Place Order" to complete your
                                                        purchase.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Guide 2 */}
                                        <div className="bg-muted/50 p-4 rounded-lg">
                                            <h3 className="text-lg font-medium mb-2">How to Track Your Order</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
                                                    <p>Log in to your account and navigate to "Order History."</p>
                                                </div>
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
                                                    <p>Find the order you want to track and click "Track Order."</p>
                                                </div>
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
                                                    <p>Alternatively, use the Order Tracking tool on this page with your
                                                        order number and email.</p>
                                                </div>
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</span>
                                                    <p>You'll see the current status and location of your order, along
                                                        with estimated delivery date.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Guide 3 */}
                                        <div className="bg-muted/50 p-4 rounded-lg">
                                            <h3 className="text-lg font-medium mb-2">How to Process a Return</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
                                                    <p>Log in to your account and go to "Order History."</p>
                                                </div>
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
                                                    <p>Find the order containing the item you want to return and select
                                                        "Return Item."</p>
                                                </div>
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
                                                    <p>Select the reason for your return and whether you prefer a refund
                                                        or exchange.</p>
                                                </div>
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</span>
                                                    <p>Print the provided return shipping label.</p>
                                                </div>
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">5</span>
                                                    <p>Pack the item in its original packaging (if possible) and attach
                                                        the shipping label.</p>
                                                </div>
                                                <div className="flex items-start">
                                                    <span
                                                        className="bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">6</span>
                                                    <p>Drop off the package at your nearest shipping carrier
                                                        location.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Column: Contact, Order Tracking, Self-Service */}
                <div className="space-y-8">
                    {/* Contact Support */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <MessageSquare className="mr-2 h-5 w-5"/> Contact Support
                            </CardTitle>
                            <CardDescription>Get help from our support team</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 mr-3 text-muted-foreground"/>
                                <div>
                                    <p className="font-medium">Hotline</p>
                                    <p className="text-sm text-muted-foreground">1-800-123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 mr-3 text-muted-foreground"/>
                                <div>
                                    <p className="font-medium">Email</p>
                                    <p className="text-sm text-muted-foreground">support@yourstore.com</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <MessageSquare className="h-5 w-5 mr-3 text-muted-foreground"/>
                                <div>
                                    <p className="font-medium">Live Chat</p>
                                    <p className="text-sm text-muted-foreground">Available in the bottom right
                                        corner</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-5 w-5 mr-3 text-muted-foreground"/>
                                <div>
                                    <p className="font-medium">Working Hours</p>
                                    <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>
                                </div>
                            </div>
                            <Separator/>
                            <Button className="w-full">Start Live Chat</Button>
                        </CardContent>
                    </Card>

                    {/* Order Tracking */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Package className="mr-2 h-5 w-5"/> Track Your Order
                            </CardTitle>
                            <CardDescription>Enter your order details to check status</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    placeholder="Order Number"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                />
                                <Input placeholder="Email Address"/>
                            </div>
                            <Button className="w-full">Track Order</Button>
                        </CardContent>
                    </Card>

                    {/* Self-service Request Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <HelpCircle className="mr-2 h-5 w-5"/> Submit a Request
                            </CardTitle>
                            <CardDescription>Tell us how we can help you</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Select defaultValue="general">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="general">General Inquiry</SelectItem>
                                    <SelectItem value="order-issue">Order Issue</SelectItem>
                                    <SelectItem value="return-request">Return Request</SelectItem>
                                    <SelectItem value="product-question">Product Question</SelectItem>
                                    <SelectItem value="website-feedback">Website Feedback</SelectItem>
                                    <SelectItem value="other-issue">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input placeholder="Subject"/>
                            <Textarea placeholder="Describe your issue in detail" rows={4}/>
                            <div className="pt-2">
                                <Button className="w-full">Submit Request</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Policies and Complaint Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Policies & Terms */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <FileText className="mr-2 h-5 w-5"/> Policies & Terms
                        </CardTitle>
                        <CardDescription>Read our policies and terms of service</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center">
                                <Shield className="h-5 w-5 mr-3 text-muted-foreground"/>
                                <p className="font-medium group-hover:text-primary transition-colors">Privacy Policy</p>
                            </div>
                            <ChevronRight
                                className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"/>
                        </div>
                        <Separator/>
                        <div className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center">
                                <FileText className="h-5 w-5 mr-3 text-muted-foreground"/>
                                <p className="font-medium group-hover:text-primary transition-colors">Terms of
                                    Service</p>
                            </div>
                            <ChevronRight
                                className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"/>
                        </div>
                        <Separator/>
                        <div className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center">
                                <Truck className="h-5 w-5 mr-3 text-muted-foreground"/>
                                <p className="font-medium group-hover:text-primary transition-colors">Shipping
                                    Policy</p>
                            </div>
                            <ChevronRight
                                className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"/>
                        </div>
                        <Separator/>
                        <div className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center">
                                <RefreshCw className="h-5 w-5 mr-3 text-muted-foreground"/>
                                <p className="font-medium group-hover:text-primary transition-colors">Return Policy</p>
                            </div>
                            <ChevronRight
                                className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"/>
                        </div>
                    </CardContent>
                </Card>

                {/* Complaint Resolution */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <AlertTriangle className="mr-2 h-5 w-5"/> Complaint Resolution
                        </CardTitle>
                        <CardDescription>Resolve issues with your orders</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="font-medium">Have an issue with your order?</h3>
                            <p className="text-sm text-muted-foreground">
                                If you've received damaged, incorrect, or incomplete items, or if your order
                                hasn't arrived within the expected timeframe, we're here to help.
                            </p>
                            <div className="bg-muted/50 p-4 rounded-lg mt-4">
                                <h4 className="font-medium mb-2">Steps to file a complaint:</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start">
                                        <span
                                            className="bg-primary w-5 h-5 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-xs">1</span>
                                        <p>Log into your account and visit "Order History"</p>
                                    </div>
                                    <div className="flex items-start">
                                        <span
                                            className="bg-primary w-5 h-5 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-xs">2</span>
                                        <p>Select the problematic order and click "Report an Issue"</p>
                                    </div>
                                    <div className="flex items-start">
                                        <span
                                            className="bg-primary w-5 h-5 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-xs">3</span>
                                        <p>Select the issue type and provide details</p>
                                    </div>
                                    <div className="flex items-start">
                                        <span
                                            className="bg-primary w-5 h-5 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-xs">4</span>
                                        <p>Upload photos if applicable</p>
                                    </div>
                                    <div className="flex items-start">
                                        <span
                                            className="bg-primary w-5 h-5 rounded-full text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-xs">5</span>
                                        <p>Submit your complaint and track its resolution status</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                            <Button className="sm:flex-1">Report an Issue</Button>
                            <Button variant="outline" className="sm:flex-1">Check Status</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Technical Support */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Technical Support</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="transition-all hover:border-primary hover:shadow-md">
                        <CardContent className="pt-6">
                            <div className="text-center mb-4">
                                <User className="h-10 w-10 mx-auto mb-3 text-primary"/>
                                <h3 className="font-medium text-lg">Account Issues</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                                <p className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mr-2 text-primary"/>
                                    Login problems
                                </p>
                                <p className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mr-2 text-primary"/>
                                    Password reset issues
                                </p>
                                <p className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mr-2 text-primary"/>
                                    Account verification
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">Get Help</Button>
                        </CardFooter>
                    </Card>

                    <Card className="transition-all hover:border-primary hover:shadow-md">
                        <CardContent className="pt-6">
                            <div className="text-center mb-4">
                                <ShoppingBag className="h-10 w-10 mx-auto mb-3 text-primary"/>
                                <h3 className="font-medium text-lg">Payment Issues</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                                <p className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mr-2 text-primary"/>
                                    Payment failures
                                </p>
                                <p className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mr-2 text-primary"/>
                                    Double charges
                                </p>
                                <p className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mr-2 text-primary"/>
                                    Missing refunds
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">Get Help</Button>
                        </CardFooter>
                    </Card>

                    <Card className="transition-all hover:border-primary hover:shadow-md">
                        <CardContent className="pt-6">
                            <div className="text-center mb-4">
                                <HelpCircle className="h-10 w-10 mx-auto mb-3 text-primary"/>
                                <h3 className="font-medium text-lg">Website Issues</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                                <p className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mr-2 text-primary"/>
                                    Pages not loading
                                </p>
                                <p className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mr-2 text-primary"/>
                                    Checkout errors
                                </p>
                                <p className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mr-2 text-primary"/>
                                    Browser compatibility
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">Get Help</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
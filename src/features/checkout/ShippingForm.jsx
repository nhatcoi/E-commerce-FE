import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Checkbox } from "src/components/ui/checkbox";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "src/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "src/components/ui/card";
import { RadioGroup, RadioGroupItem } from "src/components/ui/radio-group";
import { MapPin, Clock } from "lucide-react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const shippingMethods = [
    {
        id: "standard",
        name: "Standard Shipping",
        description: "3-5 business days",
        price: 5.99,
        icon: Clock,
    },
    {
        id: "express",
        name: "Express Shipping",
        description: "1-2 business days",
        price: 15.99,
        icon: Clock,
    },
];

const ShippingForm = ({ onSubmit, initialData }) => {
    const navigate = useNavigate();
    const [useExistingAddress, setUseExistingAddress] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: initialData || {},
    });

    // get data user from state
    const auth  = useSelector((state) => state.auth2);
    const user = auth.user || null;
    if (!user) {
        navigate("/login");
        return;
    };
    const addresses = user?.addresses || [];


    const handleSavedAddressSelect = (addressId) => {
        const address = addresses.find(addr => addr.id === addressId);
        if (address) {
            Object.entries(address).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    };

    const handleFormSubmit = (data) => {
        onSubmit({ ...data, shippingMethod: data.shippingMethod || "standard" });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Shipping Information</h2>
                <p className="text-muted-foreground">
                    Enter your shipping details below
                </p>
            </div>

            {addresses.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Saved Addresses</CardTitle>
                        <CardDescription>
                            Select from your saved addresses or enter a new one
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="useExisting"
                                checked={useExistingAddress}
                                onCheckedChange={setUseExistingAddress}
                            />
                            <Label htmlFor="useExisting">Use saved address</Label>
                        </div>

                        {useExistingAddress && (
                            <Select
                                onValueChange={(value) => handleSavedAddressSelect(Number(value))}
                                className="mt-4"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an address" />
                                </SelectTrigger>
                                <SelectContent>
                                    {addresses.map((address) => (
                                        <SelectItem key={address.id} value={address.id.toString()}>
                                            {address.addressLine}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </CardContent>
                </Card>
            )}

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            defaultValue={user.fullName || ""}
                            {...register("fullName", { required: "Full name is required" })}
                            error={errors.fullName?.message}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            type="tel"
                            defaultValue={user.phoneNumber || ""}
                            {...register("phoneNumber", { required: "Phone number is required" })}
                            error={errors.phoneNumber?.message}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address Line</Label>
                        <Input
                            id="addressLine"
                            {...register("addressLine", { required: "Address is required" })}
                            error={errors.addressLine?.message}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            {...register("city", { required: "City is required" })}
                            error={errors.city?.message}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="state">District</Label>
                        <Input
                            id="district"
                            {...register("district", { required: "District is required" })}
                            error={errors.district?.message}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                        <Input
                            id="postcode"
                            {...register("postcode", { required: "ZIP code is required" })}
                            error={errors.postcode?.message}
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                            id="country"
                            {...register("country", { required: "Country is required" })}
                            error={errors.country?.message}
                        />
                    </div>
                </div>


                {/*Shipping Method*/}

                {/*<Card>*/}
                {/*    <CardHeader>*/}
                {/*        <CardTitle className="text-lg">Shipping Method</CardTitle>*/}
                {/*        <CardDescription>*/}
                {/*            Choose your preferred shipping method*/}
                {/*        </CardDescription>*/}
                {/*    </CardHeader>*/}
                {/*    <CardContent>*/}
                {/*        <RadioGroup*/}
                {/*            defaultValue="standard"*/}
                {/*            onValueChange={(value) => setValue("shippingMethod", value)}*/}
                {/*            className="space-y-4"*/}
                {/*        >*/}
                {/*            {shippingMethods.map((method) => (*/}
                {/*                <div*/}
                {/*                    key={method.id}*/}
                {/*                    className="flex items-center space-x-4 rounded-lg border p-4"*/}
                {/*                >*/}
                {/*                    <RadioGroupItem value={method.id} id={method.id} />*/}
                {/*                    <Label*/}
                {/*                        htmlFor={method.id}*/}
                {/*                        className="flex flex-1 items-center justify-between"*/}
                {/*                    >*/}
                {/*                        <div className="space-y-1">*/}
                {/*                            <p className="font-medium">{method.name}</p>*/}
                {/*                            <p className="text-sm text-muted-foreground">*/}
                {/*                                {method.description}*/}
                {/*                            </p>*/}
                {/*                        </div>*/}
                {/*                        <p className="font-medium">${method.price}</p>*/}
                {/*                    </Label>*/}
                {/*                </div>*/}
                {/*            ))}*/}
                {/*        </RadioGroup>*/}
                {/*    </CardContent>*/}
                {/*</Card>*/}

                <div className="flex justify-end">
                    <Button type="submit" className="w-full md:w-auto">
                        Continue to Payment
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};

export default ShippingForm; 
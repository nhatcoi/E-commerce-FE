import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs.jsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form.jsx";
import { Input } from "src/components/ui/input.jsx";
import { Button } from "src/components/ui/button.jsx";
import { Separator } from "src/components/ui/separator.jsx";
import { Switch } from "src/components/ui/switch.jsx";

const storeSettingsSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  supportEmail: z.string().email("Invalid email address"),
  orderPrefix: z.string().min(1, "Order prefix is required"),
  currency: z.string().min(1, "Currency is required"),
  taxRate: z.number().min(0).max(100),
});

const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  orderUpdates: z.boolean(),
  newProducts: z.boolean(),
  marketingEmails: z.boolean(),
});

export default function Settings() {
  const storeForm = useForm({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues: {
      storeName: "Your Store",
      supportEmail: "support@example.com",
      orderPrefix: "ORD",
      currency: "USD",
      taxRate: 10,
    },
  });

  const notificationForm = useForm({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailNotifications: true,
      orderUpdates: true,
      newProducts: false,
      marketingEmails: false,
    },
  });

  const onStoreSubmit = async (data) => {
    // Handle store settings update
    console.log(data);
  };

  const onNotificationSubmit = async (data) => {
    // Handle notification settings update
    console.log(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your store settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="store" className="space-y-4">
        <TabsList>
          <TabsTrigger value="store">Store Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="store" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Manage your store details and configuration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...storeForm}>
                <form onSubmit={storeForm.handleSubmit(onStoreSubmit)} className="space-y-4">
                  <FormField
                    control={storeForm.control}
                    name="storeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={storeForm.control}
                    name="supportEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Support Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={storeForm.control}
                      name="orderPrefix"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Prefix</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Prefix for order numbers (e.g., ORD-001)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={storeForm.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={storeForm.control}
                    name="taxRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Rate (%)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="0" max="100" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Save Store Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-4">
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Email Notifications</FormLabel>
                          <FormDescription>
                            Receive notifications via email
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={notificationForm.control}
                    name="orderUpdates"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Order Updates</FormLabel>
                          <FormDescription>
                            Get notified about order status changes
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={notificationForm.control}
                    name="newProducts"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>New Products</FormLabel>
                          <FormDescription>
                            Get notified when new products are added
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={notificationForm.control}
                    name="marketingEmails"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Marketing Emails</FormLabel>
                          <FormDescription>
                            Receive marketing and promotional emails
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Save Notification Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
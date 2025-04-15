
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PageLayout from "@/components/layout/PageLayout";
import DashboardNav from "@/components/loyalty/DashboardNav";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Award, Check, Lock, ShieldCheck } from "lucide-react";

// Define form schema
const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  notificationEmail: z.boolean(),
  notificationSms: z.boolean(),
});

const tierBenefits = {
  Silver: [
    "Welcome amenity on arrival",
    "10% discount at spa",
    "Early check-in (subject to availability)",
    "Earn 10 points per €1 spent"
  ],
  Gold: [
    "All Silver benefits",
    "20% discount at spa",
    "Room upgrade (subject to availability)",
    "Late check-out until 2pm",
    "Earn 15 points per €1 spent"
  ],
  Platinum: [
    "All Gold benefits",
    "30% discount at spa",
    "Guaranteed room upgrade",
    "Late check-out until 4pm",
    "Complimentary breakfast",
    "Earn 20 points per €1 spent"
  ]
};

const LoyaltyProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // Initialize form
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notificationEmail: true,
      notificationSms: false,
    },
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/auth");
        return;
      }
      
      fetchUserData(data.session.user.id);
    };

    checkAuth();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      
      setProfile(data);
      
      // Set form values
      form.reset({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
        notificationEmail: data.notification_email,
        notificationSms: data.notification_sms,
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    if (!profile) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          phone: values.phone,
          notification_email: values.notificationEmail,
          notification_sms: values.notificationSms,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (error) throw error;
      
      toast.success("Profile updated successfully");
      fetchUserData(profile.id); // Refresh data
      
    } catch (error: any) {
      toast.error("Failed to update profile: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          
          <DashboardNav />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Profile Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your account details and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              Used for important updates about your reservations
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Notification Preferences</h3>
                        
                        <FormField
                          control={form.control}
                          name="notificationEmail"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Email Notifications
                                </FormLabel>
                                <FormDescription>
                                  Receive updates about your reservations and special offers
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
                        
                        <FormField
                          control={form.control}
                          name="notificationSms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  SMS Notifications
                                </FormLabel>
                                <FormDescription>
                                  Receive text message reminders about upcoming appointments
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
                      </div>
                      
                      <CardFooter className="px-0 pb-0">
                        <Button 
                          type="submit" 
                          className="bg-amber-500 hover:bg-amber-600"
                          disabled={isSaving}
                        >
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                      </CardFooter>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              {/* Security Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-gray-500">Change your password</p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Data & Privacy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    Data & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    We take your privacy seriously. Your data is securely stored and never shared with third parties without your consent.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start sm:w-auto">
                      Download My Data
                    </Button>
                    <Button variant="outline" className="text-red-500 w-full justify-start sm:w-auto">
                      Delete My Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Tier Benefits */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    Your Tier Benefits
                  </CardTitle>
                  <CardDescription>
                    Currently at {profile?.loyalty_tier} level with {profile?.loyalty_points} points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.keys(tierBenefits).map((tier) => {
                      const isCurrentTier = profile?.loyalty_tier === tier;
                      const isUnlocked = 
                        (tier === "Silver") || 
                        (tier === "Gold" && ["Gold", "Platinum"].includes(profile?.loyalty_tier)) ||
                        (tier === "Platinum" && profile?.loyalty_tier === "Platinum");
                        
                      return (
                        <div key={tier} className={`rounded-lg p-4 ${
                          isCurrentTier 
                            ? "bg-amber-50 border border-amber-200" 
                            : "border"
                        }`}>
                          <h3 className={`font-semibold mb-2 flex items-center justify-between ${
                            isUnlocked ? "text-gray-900" : "text-gray-400"
                          }`}>
                            {tier} Benefits
                            {isCurrentTier && (
                              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                                Current
                              </span>
                            )}
                          </h3>
                          <ul className="space-y-2">
                            {tierBenefits[tier as keyof typeof tierBenefits].map((benefit, index) => (
                              <li key={index} className={`flex items-start gap-2 ${
                                isUnlocked ? "text-gray-700" : "text-gray-400"
                              }`}>
                                <Check className={`h-5 w-5 mt-0.5 ${
                                  isUnlocked ? "text-green-500" : "text-gray-300"
                                }`} />
                                <span className="text-sm">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoyaltyProfilePage;

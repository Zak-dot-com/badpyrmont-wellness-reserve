
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/layout/PageLayout';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, CreditCard, User, LogOut, Clock, CalendarDays, CalendarCheck } from 'lucide-react';

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (!session) {
          navigate('/auth');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account."
      });
      
      navigate('/');
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message || "There was a problem signing you out."
      });
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-20rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
            <p className="mt-4">Loading your dashboard...</p>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  const userMetadata = user?.user_metadata || {};
  const firstName = userMetadata.first_name || 'Valued';
  const lastName = userMetadata.last_name || 'Member';
  const email = user?.email || '';

  const upcomingAppointments = [
    {
      id: 1,
      serviceName: 'Deep Tissue Massage',
      datetime: new Date(Date.now() + 86400000 * 3), // 3 days from now
      duration: 60,
    },
    {
      id: 2,
      serviceName: 'Spa Package: Ultimate Relaxation',
      datetime: new Date(Date.now() + 86400000 * 10), // 10 days from now
      duration: 180,
    },
  ];
  
  const pastAppointments = [
    {
      id: 3,
      serviceName: 'Swedish Massage',
      datetime: new Date(Date.now() - 86400000 * 5), // 5 days ago
      duration: 60,
    },
    {
      id: 4,
      serviceName: 'Facial Treatment',
      datetime: new Date(Date.now() - 86400000 * 15), // 15 days ago
      duration: 45,
    },
  ];

  const membershipLevel = "Silver"; // Example data
  const loyaltyPoints = 350; // Example data
  
  // Format date to readable format
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8">
          {/* Welcome Card */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Welcome, {firstName} {lastName}!</CardTitle>
                  <CardDescription>{email}</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-medium">Membership Level</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">{membershipLevel}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">{loyaltyPoints}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-sm">
                      {upcomingAppointments.length > 0 ? (
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-2 text-amber-500" />
                          {formatDate(upcomingAppointments[0].datetime)}
                        </div>
                      ) : (
                        "No upcoming appointments"
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-medium">Member Since</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-sm">
                      <div className="flex items-center">
                        <CalendarCheck className="h-4 w-4 mr-2 text-amber-500" />
                        {new Date(user?.created_at || Date.now()).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Appointments and History */}
          <Tabs defaultValue="upcoming">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Wellness Journey</h2>
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingAppointments.length > 0 ? upcomingAppointments.map(appointment => (
                  <Card key={appointment.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{appointment.serviceName}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center mb-2">
                        <CalendarIcon className="h-4 w-4 mr-2 text-amber-500" />
                        <span>{formatDate(appointment.datetime)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-amber-500" />
                        <span>{appointment.duration} minutes</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">Cancel</Button>
                      </div>
                    </CardFooter>
                  </Card>
                )) : (
                  <Card className="col-span-full">
                    <CardHeader>
                      <CardTitle>No Upcoming Appointments</CardTitle>
                      <CardDescription>Book your next wellness experience today.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button className="bg-amber-500 hover:bg-amber-600" onClick={() => navigate('/booking')}>
                        Book Now
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pastAppointments.length > 0 ? pastAppointments.map(appointment => (
                  <Card key={appointment.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{appointment.serviceName}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center mb-2">
                        <CalendarIcon className="h-4 w-4 mr-2 text-amber-500" />
                        <span>{formatDate(appointment.datetime)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-amber-500" />
                        <span>{appointment.duration} minutes</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm">Book Again</Button>
                    </CardFooter>
                  </Card>
                )) : (
                  <Card className="col-span-full">
                    <CardHeader>
                      <CardTitle>No Past Appointments</CardTitle>
                      <CardDescription>Your wellness history will appear here.</CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Quick Links / Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={() => navigate('/booking')}>
                  <CalendarDays className="h-6 w-6 mb-2" />
                  <span>Book New Appointment</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <CreditCard className="h-6 w-6 mb-2" />
                  <span>Manage Payment Methods</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <User className="h-6 w-6 mb-2" />
                  <span>Update Profile</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <Clock className="h-6 w-6 mb-2" />
                  <span>View Special Offers</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;

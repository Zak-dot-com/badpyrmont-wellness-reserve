
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/layout/PageLayout';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, CreditCard, User, LogOut, Clock, CalendarDays, CalendarCheck, Gift, Award } from 'lucide-react';
import DashboardNav from '@/components/loyalty/DashboardNav';
import TierCard from '@/components/loyalty/TierCard';
import DashboardQuickCard from '@/components/loyalty/DashboardQuickCard';

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
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
      } else {
        // Fetch user profile
        fetchUserProfile(session.user.id);
        fetchRecentTransactions(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);
  
  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  };
  
  const fetchRecentTransactions = async (userId: string) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);
      
    if (error) {
      console.error('Error fetching transactions:', error);
    } else {
      setRecentTransactions(data || []);
    }
  };

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
  const firstName = profile?.first_name || userMetadata.first_name || 'Valued';
  const lastName = profile?.last_name || userMetadata.last_name || 'Member';
  const email = user?.email || '';
  const loyaltyTier = profile?.loyalty_tier || 'Silver';
  const loyaltyPoints = profile?.loyalty_points || 0;

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
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="w-full sm:w-1/3">
                  <TierCard tier={loyaltyTier as "Silver" | "Gold" | "Platinum"} points={loyaltyPoints} />
                </div>
                <div className="w-full sm:w-2/3 flex flex-col justify-center">
                  <h3 className="text-lg font-semibold mb-2">Your Loyalty Program</h3>
                  <p className="text-gray-600 mb-4">
                    Enjoy exclusive benefits as a {loyaltyTier} member of our loyalty program. 
                    Earn points with every stay and spa treatment to unlock more rewards.
                  </p>
                  <DashboardNav />
                </div>
              </div>
              
              {/* Quick Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <DashboardQuickCard 
                  title="Book Treatment"
                  description="Schedule your next wellness experience"
                  icon={CalendarDays}
                  linkTo="/booking"
                  color="text-blue-500"
                />
                <DashboardQuickCard 
                  title="Redeem Points"
                  description="Browse and claim available rewards"
                  icon={Gift}
                  linkTo="/rewards"
                  color="text-amber-500"
                />
                <DashboardQuickCard 
                  title="Points Activity"
                  description="View your transaction history"
                  icon={Clock}
                  linkTo="/activity"
                  color="text-green-500"
                />
                <DashboardQuickCard 
                  title="Tier Benefits"
                  description="See what your status unlocks"
                  icon={Award}
                  linkTo="/profile"
                  color="text-purple-500"
                />
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
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import PageLayout from "@/components/layout/PageLayout";
import DashboardNav from "@/components/loyalty/DashboardNav";
import TierCard from "@/components/loyalty/TierCard";
import ActivityTable from "@/components/loyalty/ActivityTable";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DateRange } from "react-day-picker";

const LoyaltyActivityPage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [redemptions, setRedemptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/auth");
        return;
      }
      
      fetchUserData(data.session.user.id);
      fetchTransactions(data.session.user.id);
      fetchRedemptions(data.session.user.id);
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
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchRedemptions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("redemptions")
        .select("*, rewards(*)")
        .eq("user_id", userId)
        .order("redeemed_at", { ascending: false });

      if (error) throw error;
      setRedemptions(data || []);
    } catch (error) {
      console.error("Error fetching redemptions:", error);
    }
  };

  // Filter transactions by date range
  const filteredTransactions = transactions.filter(transaction => {
    if (!dateRange?.from && !dateRange?.to) return true;
    
    const txDate = new Date(transaction.created_at);
    if (dateRange?.from && dateRange?.to) {
      return txDate >= dateRange.from && txDate <= dateRange.to;
    } else if (dateRange?.from) {
      return txDate >= dateRange.from;
    } else if (dateRange?.to) {
      return txDate <= dateRange.to;
    }
    return true;
  });

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
          <h1 className="text-3xl font-bold">Points Activity</h1>
          
          <DashboardNav />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="space-y-6">
                {profile && (
                  <TierCard 
                    tier={profile.loyalty_tier} 
                    points={profile.loyalty_points} 
                  />
                )}
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Filter by Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DatePickerWithRange 
                      date={dateRange} 
                      setDate={setDateRange}
                    />
                    
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center" 
                        onClick={() => setDateRange(undefined)}
                      >
                        Clear Filter
                      </Button>
                    </div>
                    
                    <div className="mt-3">
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Export Activity
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Points Activity</CardTitle>
                    <div className="text-sm text-gray-500">
                      Showing {filteredTransactions.length} transactions
                      {dateRange?.from && dateRange?.to && (
                        <span> from {format(dateRange.from, "MMM d, yyyy")} to {format(dateRange.to, "MMM d, yyyy")}</span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ActivityTable transactions={filteredTransactions} />
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Redemptions</CardTitle>
                </CardHeader>
                <CardContent>
                  {redemptions.length > 0 ? (
                    <div className="space-y-4">
                      {redemptions.map((redemption) => (
                        <div 
                          key={redemption.id} 
                          className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <h3 className="font-medium">{redemption.rewards.name}</h3>
                            <p className="text-sm text-gray-500">
                              Redeemed on {format(new Date(redemption.redeemed_at), "MMMM d, yyyy")}
                            </p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              redemption.status === "completed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-amber-100 text-amber-800"
                            }`}>
                              {redemption.status.charAt(0).toUpperCase() + redemption.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No redemptions yet.</p>
                      <Button 
                        onClick={() => navigate("/rewards")}
                        className="mt-4 bg-amber-500 hover:bg-amber-600"
                      >
                        Browse Rewards
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoyaltyActivityPage;

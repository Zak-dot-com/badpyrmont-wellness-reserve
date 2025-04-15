
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import DashboardNav from "@/components/loyalty/DashboardNav";
import TierCard from "@/components/loyalty/TierCard";
import RewardCard from "@/components/loyalty/RewardCard";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Reward {
  id: string;
  name: string;
  description: string;
  category: string;
  points_cost: number;
  image_url: string;
  is_available: boolean;
}

const LoyaltyRewardsPage = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [filteredRewards, setFilteredRewards] = useState<Reward[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/auth");
        return;
      }
      
      fetchUserData(data.session.user.id);
      fetchRewards();
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
    }
  };

  const fetchRewards = async () => {
    try {
      const { data, error } = await supabase
        .from("rewards")
        .select("*")
        .eq("is_available", true)
        .order("points_cost", { ascending: true });

      if (error) throw error;
      setRewards(data || []);
      setFilteredRewards(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rewards:", error);
      setLoading(false);
    }
  };

  const refreshUserData = async () => {
    if (profile?.id) {
      fetchUserData(profile.id);
    }
  };

  // Filter rewards based on search term and active category
  useEffect(() => {
    let filtered = rewards;
    
    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(reward => reward.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(reward => 
        reward.name.toLowerCase().includes(term) || 
        reward.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredRewards(filtered);
  }, [rewards, searchTerm, activeCategory]);

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(rewards.map(r => r.category)))];

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
          <h1 className="text-3xl font-bold">Loyalty Rewards</h1>
          
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
                
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h3 className="font-semibold mb-3">Filter Rewards</h3>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search rewards..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-3">
              <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="mb-6">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {categories.map((category) => (
                  <TabsContent key={category} value={category}>
                    {filteredRewards.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredRewards.map((reward) => (
                          <RewardCard
                            key={reward.id}
                            id={reward.id}
                            name={reward.name}
                            description={reward.description}
                            pointsCost={reward.points_cost}
                            imageUrl={reward.image_url}
                            currentPoints={profile?.loyalty_points || 0}
                            onRedeem={refreshUserData}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No rewards found matching your criteria.</p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoyaltyRewardsPage;

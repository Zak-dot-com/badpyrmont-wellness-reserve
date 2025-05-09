
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Euro, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

type AddonDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addon: {
    id: string;
    name: string;
    description: string;
    price: number;
    selected: boolean;
    quantity: number;
  } | null;
  onToggleAddon: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
};

const AddonDetailDialog: React.FC<AddonDetailDialogProps> = ({ 
  open, 
  onOpenChange, 
  addon,
  onToggleAddon,
  onIncreaseQuantity,
  onDecreaseQuantity
}) => {
  if (!addon) return null;

  // Get detailed information including images and extended description
  const addonDetails = getAddonDetails(addon.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{addon.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {addonDetails.images.map((src, index) => (
            <motion.div 
              key={index} 
              className="relative overflow-hidden rounded-lg shadow-md aspect-video"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={src} 
                alt={`${addon.name} - image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
        
        <div className="py-2 text-gray-700">
          <p className="leading-relaxed mb-4">{addonDetails.description}</p>
          
          <div className="flex items-center justify-between bg-amber-50 rounded-lg p-4 mt-4">
            <span className="text-lg font-semibold text-amber-700 flex items-center">
              <Euro className="h-5 w-5 mr-1" strokeWidth={2} />
              {addon.price.toFixed(2)}
            </span>
            
            <div className="flex items-center gap-6">
              {addon.selected && (
                <div className="flex items-center space-x-3 bg-white px-3 py-1 rounded-full shadow-sm">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                    onClick={onDecreaseQuantity}
                    disabled={addon.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-amber-700 font-medium w-6 text-center">{addon.quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                    onClick={onIncreaseQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <Button 
                onClick={onToggleAddon}
                className={addon.selected 
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all"
                  : "bg-amber-500 hover:bg-amber-600 text-white transition-all"
                }
                size="lg"
              >
                {addon.selected ? "Remove from Package" : "Add to Package"}
              </Button>
            </div>
          </div>
        </div>
        
        <DialogClose asChild>
          <Button variant="outline" className="mt-4 w-full">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to get addon detailed information
const getAddonDetails = (itemId: string) => {
  // This function would return detailed information about each addon
  const addonDetailedDescriptions: Record<string, { description: string; images: string[] }> = {
    "massage-therapy": {
      description: "Experience deep relaxation with our therapeutic massage sessions. Our expert therapists combine various techniques to release tension, improve circulation, and promote overall wellness. Each session is tailored to your specific needs, whether you're seeking relief from muscle pain or simply want to unwind and de-stress. The treatment takes place in our serene massage rooms with calming aromas and soothing music.",
      images: [
        "/lovable-uploads/cea9981e-23f6-4ade-ae8c-e1cdd5ce17cc.png",
        "/lovable-uploads/4c50b528-431d-475e-aec0-2ac779c53e6e.png",
        "/lovable-uploads/6ca7fa2f-e24f-4ed0-a2f9-51ddec87abd1.png"
      ]
    },
    "facial-treatment": {
      description: "Rejuvenate your skin with our luxurious facial treatments using premium organic products. Our skilled estheticians analyze your skin type and concerns to provide a customized experience. The treatment includes deep cleansing, exfoliation, extraction if needed, facial massage, and nourishing masks. You'll leave with glowing, refreshed skin and expert advice for your home skincare routine.",
      images: [
        "/lovable-uploads/78397ad2-eb1f-43fb-9dca-2690a664b4ba.png",
        "/lovable-uploads/99dfc6d2-1b5a-4e77-bb77-15d19f26332b.png",
        "/lovable-uploads/c4d377d2-a6b6-4185-9f0e-6daddccf4c78.png"
      ]
    },
    "hot-stone-therapy": {
      description: "Our signature hot stone therapy combines the healing power of smooth, heated basalt stones with expert massage techniques. The warmth of the stones penetrates deep into muscle tissue, releasing tension and promoting deep relaxation. This treatment improves blood circulation, relieves pain, and creates a profound sense of balance and harmony throughout your body and mind.",
      images: [
        "/lovable-uploads/6ca7fa2f-e24f-4ed0-a2f9-51ddec87abd1.png",
        "/lovable-uploads/4c50b528-431d-475e-aec0-2ac779c53e6e.png",
        "/lovable-uploads/cea9981e-23f6-4ade-ae8c-e1cdd5ce17cc.png"
      ]
    },
    "aromatherapy": {
      description: "Immerse yourself in the healing properties of essential oils with our aromatherapy sessions. This holistic treatment combines gentle massage techniques with carefully selected essential oil blends to address your specific needs. Whether you're seeking stress relief, improved sleep, or energy restoration, our aromatherapy sessions create a multisensory experience that nurtures both body and mind.",
      images: [
        "/lovable-uploads/78397ad2-eb1f-43fb-9dca-2690a664b4ba.png",
        "/lovable-uploads/cea9981e-23f6-4ade-ae8c-e1cdd5ce17cc.png",
        "/lovable-uploads/99dfc6d2-1b5a-4e77-bb77-15d19f26332b.png"
      ]
    },
    "body-scrub": {
      description: "Reveal smoother, more radiant skin with our luxurious body scrub treatments. Natural exfoliants gently remove dead skin cells while nourishing ingredients hydrate and replenish your skin. The treatment begins with a warm shower, followed by the application of a customized scrub blend, and concludes with a moisturizing body lotion. You'll leave feeling refreshed with silky-smooth skin.",
      images: [
        "/lovable-uploads/99dfc6d2-1b5a-4e77-bb77-15d19f26332b.png",
        "/lovable-uploads/6ca7fa2f-e24f-4ed0-a2f9-51ddec87abd1.png",
        "/lovable-uploads/c4d377d2-a6b6-4185-9f0e-6daddccf4c78.png"
      ]
    },
    "personal-trainer": {
      description: "Achieve your fitness goals with our expert personal trainers. Each session is tailored to your specific needs, fitness level, and objectives. Your trainer will design a comprehensive workout plan, provide guidance on proper technique, and offer motivation to keep you progressing. Whether you're new to exercise or looking to enhance your current routine, our trainers will help you maximize your results.",
      images: [
        "/lovable-uploads/83754743-c943-4cb3-b419-3d34b82cb22b.png",
        "/lovable-uploads/78397ad2-eb1f-43fb-9dca-2690a664b4ba.png",
        "/lovable-uploads/4c50b528-431d-475e-aec0-2ac779c53e6e.png"
      ]
    },
    "yoga-classes": {
      description: "Find balance, flexibility, and inner peace with our daily yoga sessions. Our experienced instructors guide you through a series of postures, breathing exercises, and meditation practices suitable for all levels. Classes are held in our tranquil studio with natural light and views of nature. Regular practice can improve strength, posture, breathing, and mental clarity while reducing stress.",
      images: [
        "/lovable-uploads/cea9981e-23f6-4ade-ae8c-e1cdd5ce17cc.png",
        "/lovable-uploads/83754743-c943-4cb3-b419-3d34b82cb22b.png",
        "/lovable-uploads/99dfc6d2-1b5a-4e77-bb77-15d19f26332b.png"
      ]
    },
    "aqua-fitness": {
      description: "Experience the joy of exercising in water with our aqua fitness classes. The natural buoyancy of water reduces impact on your joints while providing natural resistance for an effective workout. Our enthusiastic instructors lead you through a variety of movements that improve cardiovascular health, strengthen muscles, and enhance flexibility. Classes are suitable for all fitness levels and particularly beneficial for those with joint issues.",
      images: [
        "/lovable-uploads/c4d377d2-a6b6-4185-9f0e-6daddccf4c78.png",
        "/lovable-uploads/78397ad2-eb1f-43fb-9dca-2690a664b4ba.png",
        "/lovable-uploads/4c50b528-431d-475e-aec0-2ac779c53e6e.png"
      ]
    },
    "meditation": {
      description: "Cultivate mindfulness and inner peace with our guided meditation sessions. Our experienced instructors create a serene atmosphere and guide you through various meditation techniques to quiet the mind and enhance awareness. Regular practice can reduce stress, improve focus, promote emotional balance, and foster a deeper connection with yourself. Sessions are suitable for beginners and experienced meditators alike.",
      images: [
        "/lovable-uploads/99dfc6d2-1b5a-4e77-bb77-15d19f26332b.png",
        "/lovable-uploads/cea9981e-23f6-4ade-ae8c-e1cdd5ce17cc.png",
        "/lovable-uploads/83754743-c943-4cb3-b419-3d34b82cb22b.png"
      ]
    },
    "pilates": {
      description: "Strengthen your core and improve your posture with our Pilates classes. This low-impact exercise method focuses on controlled movements that enhance flexibility, build muscle strength, and improve coordination. Our certified instructors guide you through precise exercises on mats and specialized equipment, ensuring proper form and alignment. Regular practice can lead to better posture, reduced back pain, and increased body awareness.",
      images: [
        "/lovable-uploads/78397ad2-eb1f-43fb-9dca-2690a664b4ba.png",
        "/lovable-uploads/83754743-c943-4cb3-b419-3d34b82cb22b.png",
        "/lovable-uploads/cea9981e-23f6-4ade-ae8c-e1cdd5ce17cc.png"
      ]
    },
    "diet-consultation": {
      description: "Transform your relationship with food through our personalized nutrition consultations. Our registered dietitians evaluate your current eating habits, health concerns, and wellness goals to create a sustainable nutrition plan tailored to your needs. You'll receive practical advice on meal planning, grocery shopping, and healthy cooking techniques. Our approach focuses on nourishing your body rather than restrictive dieting.",
      images: [
        "/lovable-uploads/4c50b528-431d-475e-aec0-2ac779c53e6e.png",
        "/lovable-uploads/c4d377d2-a6b6-4185-9f0e-6daddccf4c78.png",
        "/lovable-uploads/99dfc6d2-1b5a-4e77-bb77-15d19f26332b.png"
      ]
    },
    "detox-program": {
      description: "Revitalize your body with our comprehensive detox program. This carefully designed meal plan features organic, nutrient-dense foods that support your body's natural detoxification processes. The program includes freshly prepared meals, cleansing juices, and herbal teas that help eliminate toxins, reduce inflammation, and boost energy levels. Our nutrition experts provide guidance throughout the process to ensure a safe and effective experience.",
      images: [
        "/lovable-uploads/c4d377d2-a6b6-4185-9f0e-6daddccf4c78.png",
        "/lovable-uploads/4c50b528-431d-475e-aec0-2ac779c53e6e.png",
        "/lovable-uploads/78397ad2-eb1f-43fb-9dca-2690a664b4ba.png"
      ]
    },
    "cooking-class": {
      description: "Master the art of nutritious cooking in our hands-on culinary classes. Led by our expert chefs, these interactive sessions teach you how to prepare delicious, health-promoting meals using fresh, wholesome ingredients. You'll learn valuable cooking techniques, flavor combinations, and meal preparation strategies that you can easily incorporate into your daily routine. Each class concludes with enjoying the meal you've prepared.",
      images: [
        "/lovable-uploads/6ca7fa2f-e24f-4ed0-a2f9-51ddec87abd1.png",
        "/lovable-uploads/c4d377d2-a6b6-4185-9f0e-6daddccf4c78.png",
        "/lovable-uploads/99dfc6d2-1b5a-4e77-bb77-15d19f26332b.png"
      ]
    },
    "juice-cleanse": {
      description: "Refresh your system with our organic juice cleanse program. Each day, you'll receive a sequence of freshly pressed juices made from organic fruits and vegetables, designed to flood your body with essential nutrients while giving your digestive system a rest. The program can help increase energy, improve skin clarity, reduce bloating, and jumpstart healthier eating habits. Our wellness team provides support throughout your cleanse journey.",
      images: [
        "/lovable-uploads/4c50b528-431d-475e-aec0-2ac779c53e6e.png",
        "/lovable-uploads/78397ad2-eb1f-43fb-9dca-2690a664b4ba.png",
        "/lovable-uploads/c4d377d2-a6b6-4185-9f0e-6daddccf4c78.png"
      ]
    },
    "nutrition-workshop": {
      description: "Expand your nutrition knowledge in our informative group workshops. Our nutrition experts cover essential topics such as balanced eating, understanding food labels, meal planning, and mindful eating. The interactive format allows for questions, discussions, and practical activities that reinforce learning. You'll connect with others who share your wellness journey while gaining valuable insights to support your long-term health goals.",
      images: [
        "/lovable-uploads/99dfc6d2-1b5a-4e77-bb77-15d19f26332b.png",
        "/lovable-uploads/83754743-c943-4cb3-b419-3d34b82cb22b.png",
        "/lovable-uploads/6ca7fa2f-e24f-4ed0-a2f9-51ddec87abd1.png"
      ]
    }
  };

  return addonDetailedDescriptions[itemId] || {
    description: "Enhance your wellness retreat with this premium service. Our expert staff will ensure you have a memorable and rejuvenating experience tailored to your specific needs.",
    images: [
      "/lovable-uploads/cea9981e-23f6-4ade-ae8c-e1cdd5ce17cc.png",
      "/lovable-uploads/4c50b528-431d-475e-aec0-2ac779c53e6e.png",
      "/lovable-uploads/6ca7fa2f-e24f-4ed0-a2f9-51ddec87abd1.png"
    ]
  };
};

export default AddonDetailDialog;

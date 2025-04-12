
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Package, Bed, CalendarCheck } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedEventSpace, setSelectedEventSpace] = useState("");

  const handleProceedToBooking = () => {
    // We can pass selected values as query parameters if needed
    navigate('/booking');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-hotel-primary text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-hotel-primary to-blue-900 opacity-90"></div>
          <div className="container mx-auto py-24 px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Grand Hotel Badpyrmont Wellness Center
              </h1>
              <p className="text-xl mb-8">
                Experience ultimate relaxation and rejuvenation at our luxury wellness retreat.
                Discover personalized wellness packages designed for your mind, body and soul.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/booking">
                  <Button size="lg" className="bg-hotel-accent text-hotel-primary hover:bg-hotel-accent/90">
                    Book Your Retreat
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-hotel-primary">
                  Explore Packages
                </Button>
              </div>
            </div>
          </div>

          {/* Booking Bar with Dropdowns */}
          <div className="relative mx-auto px-[100px] -mb-16 z-20">
            <div className="bg-white rounded-md shadow-lg p-6 flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <SelectValue placeholder="Select Package" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relaxation">Relaxation Retreat</SelectItem>
                    <SelectItem value="detox">Detox & Revitalize</SelectItem>
                    <SelectItem value="luxury">Luxury Wellness Escape</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 w-full">
                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4" />
                      <SelectValue placeholder="Select Room" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Room</SelectItem>
                    <SelectItem value="deluxe">Deluxe Room</SelectItem>
                    <SelectItem value="suite">Executive Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 w-full">
                <Select value={selectedEventSpace} onValueChange={setSelectedEventSpace}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4" />
                      <SelectValue placeholder="Select Event Space" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="garden">Garden Pavilion</SelectItem>
                    <SelectItem value="ballroom">Grand Ballroom</SelectItem>
                    <SelectItem value="terrace">Rooftop Terrace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleProceedToBooking}
                className="whitespace-nowrap bg-hotel-primary hover:bg-hotel-primary/90"
              >
                Proceed to Booking
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white mt-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Experience Luxury Wellness</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Premium Packages",
                  description: "Choose from our carefully crafted wellness packages designed to meet your specific needs."
                },
                {
                  title: "Luxury Accommodations",
                  description: "Stay in our beautifully appointed rooms and suites for the ultimate comfort during your retreat."
                },
                {
                  title: "Expert Therapists",
                  description: "Our team of certified wellness professionals are dedicated to enhancing your wellbeing."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg text-center">
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Packages */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-4">Featured Wellness Packages</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Discover our most popular wellness packages, designed to provide you with the ultimate relaxation experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Relaxation Retreat",
                  price: "€480",
                  duration: "4 Days",
                  description: "A peaceful wellness package focused on relaxation and stress relief."
                },
                {
                  name: "Detox & Revitalize",
                  price: "€600",
                  duration: "4 Days",
                  description: "Cleanse your body and mind with this comprehensive detox program."
                },
                {
                  name: "Luxury Wellness Escape",
                  price: "€880",
                  duration: "4 Days",
                  description: "Our premium package with exclusive treatments and personalized service."
                }
              ].map((pkg, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-2xl font-bold text-hotel-primary">{pkg.price}</span>
                      <span className="text-gray-500 ml-2">/ {pkg.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-6">{pkg.description}</p>
                    <Link to="/booking" className="block">
                      <Button className="w-full bg-hotel-primary hover:bg-hotel-primary/90">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-hotel-primary text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Wellness Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book your wellness retreat today and experience the ultimate relaxation at Grand Hotel Badpyrmont.
            </p>
            <Link to="/booking">
              <Button size="lg" className="bg-white text-hotel-primary hover:bg-gray-100">
                Book Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

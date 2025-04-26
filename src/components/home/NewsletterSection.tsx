import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', {
      email,
      agreed
    });
  };
  return <section className="bg-black py-24">
      <motion.div className="container mx-auto px-6" initial="hidden" whileInView="visible" viewport={{
      once: true,
      margin: "-100px"
    }} variants={containerVariants}>
        <div className="max-w-6xl mx-auto bg-white p-8 md:p-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-4">
                Stay connected
              </h2>
              <h3 className="text-3xl md:text-4xl font-light mb-2">
                with GRAND HOTEL Badpyrmont
              </h3>
              <p className="text-2xl md:text-3xl font-light text-gray-500 text-center">
                Powered by STEINBERGER
              </p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-8 text-lg">
                Discover the latest updates from the Lanserhof universe delivered straight to your inbox every two months. Stay inspired with fascinating insights and expert content on nutrition, fitness, and lifestyle.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 text-lg bg-transparent border-b border-gray-300 focus:border-black rounded-none" required />
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox id="privacy" checked={agreed} onCheckedChange={checked => setAgreed(checked as boolean)} className="mt-1" />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    I agree to storage and processing of my data according to{" "}
                    <a href="#" className="underline hover:text-black">
                      privacy policy
                    </a>
                    .*
                  </label>
                </div>
                
                <Button type="submit" disabled={!agreed} className="group text-white transition-all duration-300 w-16 h-16 hover:w-32 rounded-lg hover:rounded-lg p-0 flex items-center justify-center overflow-hidden bg-hotel-accent">
                  <ArrowRight className="w-6 h-6 group-hover:opacity-0 absolute transition-opacity duration-200" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                    Submit
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>;
};
export default NewsletterSection;
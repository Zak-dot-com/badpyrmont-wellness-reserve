import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const CallToAction = () => {
  return <section className="py-16 text-white bg-slate-950">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Wellness Journey?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Book your wellness retreat today and experience the ultimate relaxation at Grand Hotel Badpyrmont.
        </p>
        <Link to="/booking">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-400 text-neutral-50">
            Book Now
          </Button>
        </Link>
      </div>
    </section>;
};
export default CallToAction;
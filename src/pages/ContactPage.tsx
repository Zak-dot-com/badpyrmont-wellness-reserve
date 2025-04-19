
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import ContactForm from '@/components/contact/ContactForm';

const ContactPage = () => {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <PageLayout>
        <div className="max-w-4xl mx-auto py-16 px-4">
          <h1 className="text-4xl font-light mb-2">Contact Us</h1>
          <p className="text-xl font-light text-gray-600 mb-12">
            We'd love to hear from you. Please fill out the form below.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <ContactForm />
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium mb-3">Visit Us</h3>
                <p className="text-gray-600">
                  Lanserhof Tegernsee<br />
                  Gut Steinberg 1-4<br />
                  83666 Marienstein<br />
                  Germany
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3">Contact</h3>
                <p className="text-gray-600">
                  Phone: +49 8022 1880-0<br />
                  Email: info@lanserhof.com
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3">Opening Hours</h3>
                <p className="text-gray-600">
                  Monday - Sunday: 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </motion.div>
  );
};

export default ContactPage;

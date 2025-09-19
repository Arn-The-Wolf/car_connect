import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I create an account on CarConnect?",
      answer: "Creating an account is simple! Click the 'Sign Up' button in the top right corner, enter your phone number and create a password. You'll receive an OTP verification code to complete the registration process."
    },
    {
      question: "Is it free to list my car on CarConnect?",
      answer: "Yes, listing your car on CarConnect is completely free for individual sellers. We only charge a small commission when your car sells successfully, ensuring you only pay when you get results."
    },
    {
      question: "How do I schedule a test drive?",
      answer: "Once you find a car you're interested in, click the 'Schedule Test Drive' button on the car's detail page. The seller will receive your request and contact you directly to arrange a convenient time."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including bank transfers, mobile money (MTN Mobile Money, Airtel Money), and cash payments. All transactions are facilitated between buyers and sellers with our security measures in place."
    },
    {
      question: "How do you verify car listings?",
      answer: "All car listings go through our verification process. We check vehicle documents, verify seller identity, and may conduct physical inspections for high-value vehicles. This ensures all listings are genuine and accurate."
    },
    {
      question: "Can I negotiate the price with sellers?",
      answer: "Yes! Many sellers mark their listings as 'negotiable'. You can contact sellers directly through our platform to discuss pricing. We encourage respectful negotiations that work for both parties."
    },
    {
      question: "What if I have issues with a purchase?",
      answer: "If you encounter any issues with your purchase, contact our customer support team immediately. We have dispute resolution processes in place and will work with both parties to find a fair solution."
    },
    {
      question: "How long does it take for my listing to appear online?",
      answer: "Most listings appear online within 24 hours after submission, pending our verification process. If you need urgent listing, contact our support team for priority processing."
    },
    {
      question: "Can I edit my listing after it's published?",
      answer: "Yes, you can edit your listing at any time through your dashboard. Simply log in, go to 'My Listings', and click 'Edit' on the car you want to update. Changes will be reviewed and updated within 24 hours."
    },
    {
      question: "Do you provide vehicle history reports?",
      answer: "We encourage sellers to provide vehicle history and service records. For premium listings, we may provide basic history verification. We recommend buyers always inspect vehicles and verify documents before purchase."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground animate-slide-up">
              Find answers to the most common questions about CarConnect
            </p>
          </div>
          
          <div className="animate-zoom-in">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border rounded-lg px-6 hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left py-6 hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12 text-center bg-secondary/30 p-8 rounded-lg animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Contact Support
              </a>
              <a 
                href="/support" 
                className="bg-white text-primary border border-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                Live Chat
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;
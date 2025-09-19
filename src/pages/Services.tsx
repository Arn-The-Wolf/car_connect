import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Shield, Wrench, Search, CreditCard, Users, Phone, FileCheck } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Search className="h-12 w-12 text-primary" />,
      title: "Car Search & Matching",
      description: "Our advanced search system helps you find the perfect car based on your specific needs, budget, and preferences.",
      features: ["Advanced filtering", "Price comparisons", "Availability alerts", "Personalized recommendations"]
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Vehicle Verification",
      description: "Every listed vehicle goes through our comprehensive verification process to ensure authenticity and accuracy.",
      features: ["Document verification", "Physical inspections", "History checks", "Condition reports"]
    },
    {
      icon: <CreditCard className="h-12 w-12 text-primary" />,
      title: "Financing Assistance",
      description: "We partner with leading financial institutions to provide flexible financing options for your car purchase.",
      features: ["Loan pre-approval", "Competitive rates", "Flexible terms", "Quick processing"]
    },
    {
      icon: <Wrench className="h-12 w-12 text-primary" />,
      title: "Post-Sale Support",
      description: "Our relationship doesn't end at purchase. We provide ongoing support for maintenance and service needs.",
      features: ["Service reminders", "Maintenance tips", "Warranty support", "Parts sourcing"]
    },
    {
      icon: <FileCheck className="h-12 w-12 text-primary" />,
      title: "Documentation Assistance",
      description: "We help with all the paperwork and legal requirements for vehicle registration and transfer.",
      features: ["Transfer assistance", "Registration help", "Insurance guidance", "Legal compliance"]
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: "Dealer Network",
      description: "Access to Rwanda's largest network of verified dealers and trusted private sellers.",
      features: ["Verified dealers", "Trusted sellers", "Quality assurance", "Wide selection"]
    }
  ];

  const processes = [
    {
      step: "01",
      title: "Search & Browse",
      description: "Use our advanced search to find cars that match your criteria"
    },
    {
      step: "02",
      title: "Verify & Inspect",
      description: "We verify all listings and provide detailed inspection reports"
    },
    {
      step: "03",
      title: "Test Drive",
      description: "Schedule test drives with sellers through our secure platform"
    },
    {
      step: "04",
      title: "Negotiate & Purchase",
      description: "Get support with negotiations and secure purchase processes"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Comprehensive automotive services designed to make your car buying and selling experience 
            seamless, secure, and satisfying.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">What We Offer</h2>
            <p className="text-xl text-muted-foreground animate-slide-up">
              End-to-end automotive services for buyers and sellers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-zoom-in" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-0">
                  <div className="flex justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-center">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-center">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">How It Works</h2>
            <p className="text-xl text-muted-foreground animate-slide-up">
              Simple steps to find and purchase your perfect car
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processes.map((process, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Car className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Car?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands of satisfied customers who have found their dream cars through CarConnect. 
              Start your journey today with Rwanda's most trusted automotive marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-dark">
                Browse Cars
              </Button>
              <Button size="lg" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
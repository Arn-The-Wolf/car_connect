import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Calendar, CreditCard, Car, Shield, MessageCircle, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const buyerSteps = [
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Search & Filter",
      description: "Use our advanced search filters to find cars that match your specific needs, budget, and preferences.",
      details: ["Filter by make, model, year", "Set price range and location", "Sort by relevance or price"]
    },
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: "View Details",
      description: "Browse detailed listings with high-quality photos, specifications, and verified information.",
      details: ["View photo galleries", "Check vehicle history", "Read detailed specifications"]
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Schedule Test Drive",
      description: "Book a test drive directly through our platform and meet with verified sellers.",
      details: ["Choose convenient time slots", "Contact verified sellers", "Get location details"]
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "Complete Purchase",
      description: "Finalize your purchase with secure payment options and proper documentation.",
      details: ["Secure payment processing", "Documentation assistance", "Transfer support"]
    }
  ];

  const sellerSteps = [
    {
      icon: <Car className="h-8 w-8 text-primary" />,
      title: "List Your Car",
      description: "Create a detailed listing with photos, specifications, and competitive pricing.",
      details: ["Upload high-quality photos", "Add detailed specifications", "Set competitive pricing"]
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Verification Process",
      description: "Our team verifies your listing to ensure accuracy and build buyer confidence.",
      details: ["Document verification", "Photo quality check", "Information accuracy review"]
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
      title: "Connect with Buyers",
      description: "Receive inquiries from interested buyers and manage communications through our platform.",
      details: ["Manage buyer inquiries", "Schedule viewings", "Handle negotiations"]
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Complete Sale",
      description: "Finalize the sale with secure processes and proper transfer documentation.",
      details: ["Secure transaction processing", "Transfer documentation", "Payment confirmation"]
    }
  ];

  const benefits = [
    {
      title: "Verified Listings",
      description: "All vehicles are verified for authenticity and accuracy",
      icon: <Shield className="h-6 w-6 text-primary" />
    },
    {
      title: "Secure Payments",
      description: "Protected payment processes for your peace of mind",
      icon: <CreditCard className="h-6 w-6 text-primary" />
    },
    {
      title: "Expert Support",
      description: "Professional support throughout your car buying journey",
      icon: <MessageCircle className="h-6 w-6 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">How CarConnect Works</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Simple, secure, and transparent process for buying and selling cars in Rwanda. 
            Join thousands of satisfied customers who trust CarConnect.
          </p>
        </div>
      </section>

      {/* For Buyers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary text-primary-foreground animate-fade-in">For Buyers</Badge>
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Find Your Perfect Car</h2>
            <p className="text-xl text-muted-foreground animate-slide-up">
              Four simple steps to find and purchase your dream car
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {buyerSteps.map((step, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-zoom-in" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-1 text-sm">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Sellers Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-success text-success-foreground animate-fade-in">For Sellers</Badge>
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Sell Your Car Fast</h2>
            <p className="text-xl text-muted-foreground animate-slide-up">
              Four easy steps to sell your car to thousands of potential buyers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sellerSteps.map((step, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-zoom-in" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 bg-success text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-1 text-sm">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <div className="w-1 h-1 bg-success rounded-full mr-2"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Why Choose CarConnect?</h2>
            <p className="text-xl text-muted-foreground animate-slide-up">
              We provide a secure, transparent, and efficient marketplace
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-zoom-in" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Join thousands of satisfied customers who have successfully bought and sold cars through CarConnect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Buying
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                Start Selling
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
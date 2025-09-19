import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, DollarSign, Wrench } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <DollarSign className="h-8 w-8 text-primary" />,
      title: "Special Financing Offers",
      description: "Our stress-free finance department that can find financial solutions to save you money."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Transparent Pricing",
      description: "Our stress-free finance department that can find financial solutions to save you money."
    },
    {
      icon: <Wrench className="h-8 w-8 text-primary" />,
      title: "Expert Car Service",
      description: "Our stress-free finance department that can find financial solutions to save you money."
    }
  ];

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${inView ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-0">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
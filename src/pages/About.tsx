import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, Users, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users className="h-8 w-8 text-primary" />, number: "50,000+", label: "Happy Customers" },
    { icon: <Award className="h-8 w-8 text-primary" />, number: "15,000+", label: "Cars Sold" },
    { icon: <Shield className="h-8 w-8 text-primary" />, number: "100%", label: "Verified Dealers" },
    { icon: <Clock className="h-8 w-8 text-primary" />, number: "24/7", label: "Customer Support" }
  ];

  const team = [
    { name: "John Doe", role: "CEO & Founder", image: "/placeholder.svg" },
    { name: "Jane Smith", role: "Head of Operations", image: "/placeholder.svg" },
    { name: "Mike Johnson", role: "Lead Developer", image: "/placeholder.svg" },
    { name: "Sarah Wilson", role: "Customer Success", image: "/placeholder.svg" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">About CarConnect</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed animate-slide-up">
            We're revolutionizing the car buying experience in Rwanda by connecting 
            buyers with the best vehicles and most trusted sellers across the country.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At CarConnect, we believe that buying a car should be an exciting and 
                transparent experience. Our mission is to create Rwanda's most trusted 
                automotive marketplace where buyers can find their perfect vehicle with 
                confidence and sellers can reach genuine customers.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We combine cutting-edge technology with local expertise to provide 
                a platform that serves both individual car owners and professional 
                dealers, ensuring every transaction is secure, fair, and satisfying.
              </p>
            </div>
            <div className="animate-zoom-in">
              <img 
                src="/placeholder.svg" 
                alt="Our mission" 
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-0">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat.number}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-zoom-in" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="p-0">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 animate-slide-up">
              <CardContent className="p-0">
                <Shield className="h-12 w-12 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Trust & Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every listing is verified and every transaction is secured. 
                  We prioritize your safety and peace of mind above all else.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardContent className="p-0">
                <Users className="h-12 w-12 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Customer First</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your satisfaction drives everything we do. From search to purchase, 
                  we're here to support you every step of the way.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <CardContent className="p-0">
                <Award className="h-12 w-12 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Excellence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We continuously improve our platform and services to provide 
                  the best automotive marketplace experience in Rwanda.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
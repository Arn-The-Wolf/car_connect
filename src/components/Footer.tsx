import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="bg-blue-800/60 rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold mb-4">CarConnect</h2>
          <p className="text-blue-100 mb-6">
            We help you to buy your favorite car and make sure it's delivered to your door
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <Input
              type="email"
              placeholder="Your phone number"
              className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
            />
            <Button className="btn-hero">Sign Up</Button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white hover:text-blue-200 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-white hover:text-blue-200 transition-colors">Blog</Link></li>
              <li><Link to="/services" className="text-white hover:text-blue-200 transition-colors">Services</Link></li>
              <li><Link to="/faq" className="text-white hover:text-blue-200 transition-colors">FAQs</Link></li>
              <li><Link to="/terms" className="text-white hover:text-blue-200 transition-colors">Terms</Link></li>
              <li><Link to="/contact" className="text-white hover:text-blue-200 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-white hover:text-blue-200 transition-colors">Get in Touch</Link></li>
              <li><Link to="/support" className="text-white hover:text-blue-200 transition-colors">Help center</Link></li>
              <li><Link to="/support" className="text-white hover:text-blue-200 transition-colors">Live chat</Link></li>
              <li><Link to="/how-it-works" className="text-white hover:text-blue-200 transition-colors">How it works</Link></li>
            </ul>
          </div>

          {/* Our Brands */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Brands</h3>
            <ul className="space-y-2">
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">Toyota</Link></li>
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">Porsche</Link></li>
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">Audi</Link></li>
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">BMW</Link></li>
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">Ford</Link></li>
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">Nissan</Link></li>
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">Peugeot</Link></li>
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">Volkswagen</Link></li>
            </ul>
          </div>

          {/* Vehicles Type */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Vehicles Type</h3>
            <ul className="space-y-2">
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">Sedan</Link></li>
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">Hatchback</Link></li>
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">SUV</Link></li>
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">Hybrid</Link></li>
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">Electric</Link></li>
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">Coupe</Link></li>
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">Truck</Link></li>
              <li><Link to="/buy-cars" className="text-white hover:text-blue-200 transition-colors">Convertible</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-blue-200">© 2025 car.connect.rw.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
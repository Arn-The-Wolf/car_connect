import React from 'react';
import { useInView } from 'react-intersection-observer';

const AboutSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 delay-200 ${inView ? 'animate-slide-up' : 'opacity-0'}`}>
              <h2 className="text-3xl font-bold mb-6">Who Are We?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                CarConnect is Rwanda's premier automotive marketplace, connecting car buyers and sellers across the country. 
                We believe that finding your perfect vehicle should be simple, transparent, and enjoyable.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform offers a comprehensive range of vehicles from trusted dealers and private sellers, 
                ensuring you have access to the best cars at competitive prices. With our rigorous verification 
                process and expert support team, we make car buying safe and reliable.
              </p>
            </div>
            
            <div className={`relative transition-all duration-700 delay-400 ${inView ? 'animate-zoom-in' : 'opacity-0'}`}>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/placeholder.svg"
                  alt="Premium car 1"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <img
                  src="/placeholder.svg"
                  alt="Premium car 2"
                  className="w-full h-32 object-cover rounded-lg mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
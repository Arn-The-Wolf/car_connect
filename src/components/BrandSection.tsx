import React from 'react';
import toyotaLogo from '@/assets/brands/toyota-logo.png';
import porscheLogo from '@/assets/brands/porsche-logo.png';
import kiaLogo from '@/assets/brands/kia-logo.png';
import nissanLogo from '@/assets/brands/nissan-logo.png';
import mercedesLogo from '@/assets/brands/mercedes-logo.png';
import bmwLogo from '@/assets/brands/bmw-logo.png';
import landroverLogo from '@/assets/brands/landrover-logo.png';
import dodgeLogo from '@/assets/brands/dodge-logo.png';

const brands = [
  { name: 'Toyota', logo: toyotaLogo, count: '120+ Models' },
  { name: 'Porsche', logo: porscheLogo, count: '35+ Models' },
  { name: 'Kia', logo: kiaLogo, count: '85+ Models' },
  { name: 'Nissan', logo: nissanLogo, count: '95+ Models' },
  { name: 'Mercedes-Benz', logo: mercedesLogo, count: '75+ Models' },
  { name: 'BMW', logo: bmwLogo, count: '60+ Models' },
  { name: 'Land Rover', logo: landroverLogo, count: '25+ Models' },
  { name: 'Dodge', logo: dodgeLogo, count: '40+ Models' },
];

const BrandSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Premium Brands
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore vehicles from the world's most prestigious automotive manufacturers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className={`brand-card group cursor-pointer fade-in-up stagger-delay-${(index % 4) + 1}`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{brand.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 fade-in-up stagger-delay-4">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary"></div>
            <span className="text-sm font-medium">And many more premium brands</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
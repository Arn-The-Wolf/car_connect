import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Bookmark, Gauge, Fuel, Settings } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Vehicle {
  id: string;
  name: string;
  year: number;
  subtitle: string;
  image: string;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  badge?: string;
}

const ExploreSection = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('in-stock');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, [activeTab]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      if (import.meta.env.VITE_API_MODE === 'node') {
        const res = await fetch('/api/vehicles');
        const data: Vehicle[] = await res.json();
        setVehicles(data);
      } else {
        // Use mock Supabase client
        const { supabase } = await import('@/integrations/supabase/client');
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('status', 'available')
          .limit(8);
        if (error) throw error;
        const mapped: Vehicle[] = (data || []).map((c: any) => ({
          id: c.id,
          name: c.title,
          year: c.year,
          subtitle: c.full_model || `${c.make} ${c.model}`,
          image: Array.isArray(c.images) && c.images[0]
            ? (c.images[0].startsWith('http')
              ? c.images[0]
              : supabase.storage.from('car-images').getPublicUrl(c.images[0]).data.publicUrl)
            : '/placeholder.svg',
          price: c.discount ? c.price - c.discount : c.price,
          mileage: c.mileage || 0,
          fuelType: c.fuel_type,
          transmission: c.transmission,
          badge: c.discount ? 'Sale' : c.condition === 'New' ? 'New' : undefined,
        }));
        setVehicles(mapped);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);

  if (loading) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore All Vehicles</h2>
            <div className="flex justify-center gap-4 mb-8">
              <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="px-6 py-8">
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between mb-8 transition-all duration-700 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-foreground">Explore All Vehicles</h2>
          <Button variant="ghost" onClick={() => navigate('/buy-cars')} className="text-primary hover:text-primary-hover flex items-center gap-2">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex space-x-8 mb-8">
          {['in-stock', 'new-cars', 'used-cars'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'pb-3 border-b-2 font-medium transition-colors',
                activeTab === tab ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {tab === 'in-stock' ? 'In Stock' : tab === 'new-cars' ? 'New Cars' : 'Used Cars'}
            </button>
          ))}
        </div>

        <div className={`flex gap-6 overflow-x-auto pb-4 transition-all duration-700 delay-200 ${inView ? 'animate-slide-up' : 'opacity-0'}`}>
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="flex-shrink-0 w-80 overflow-hidden group cursor-pointer">
              <div className="relative">
                <img
                  src={vehicle.image || '/placeholder.svg'}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {vehicle.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={cn(
                        'text-xs',
                        vehicle.badge === 'Great Price' && 'bg-success text-success-foreground',
                        vehicle.badge === 'Low Mileage' && 'bg-primary text-primary-foreground'
                      )}
                    >
                      {vehicle.badge}
                    </Badge>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 hover:bg-background">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {vehicle.name} – {vehicle.year}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{vehicle.subtitle}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Gauge className="h-4 w-4" />
                      <span>{vehicle.mileage.toLocaleString()} Miles</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel className="h-4 w-4" />
                      <span>{vehicle.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Settings className="h-4 w-4" />
                      <span>{vehicle.transmission}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-2xl font-bold text-foreground">{formatPrice(vehicle.price)}</div>
                    <Button variant="ghost" onClick={() => navigate(`/car/${vehicle.id}`)} className="text-primary hover:text-primary-hover flex items-center gap-2">
                      View Details
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
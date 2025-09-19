import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Car, Fuel, Settings, MapPin, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CarRecord {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  discount?: number;
  images: string[];
  video_url?: string | null;
  mileage: number;
  mileage_unit: string;
  fuel_type: string;
  transmission: string;
  seats?: number;
  condition: string;
  location: string;
  description?: string;
}

interface VehicleNode {
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

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<CarRecord | null>(null);
  const [vehicle, setVehicle] = useState<VehicleNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        setLoading(true);
        if (import.meta.env.VITE_API_MODE === 'node') {
          const res = await fetch(`/api/vehicles/${id}`);
          if (res.ok) {
            const data: VehicleNode = await res.json();
            setVehicle(data);
          }
        } else {
          const { data, error } = await supabase
            .from('cars')
            .select('*')
            .eq('id', id)
            .single();
          if (error) throw error;
          setCar(data as unknown as CarRecord);
        }
      } catch (e) {
        console.error('Failed to load car', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const pricing = useMemo(() => {
    if (car) {
      const discounted = car.discount ? car.price - car.discount : car.price;
      return { current: discounted, original: car.price, hasDiscount: !!car.discount };
    }
    if (vehicle) {
      return { current: vehicle.price, original: vehicle.price, hasDiscount: false };
    }
    return { current: 0, original: 0, hasDiscount: false };
  }, [car, vehicle]);

  const images: string[] = useMemo(() => {
    if (car && car.images && car.images.length > 0) return car.images;
    if (vehicle) return [vehicle.image];
    return [];
  }, [car, vehicle]);

  const formatPrice = (price: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 w-40 bg-muted rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-muted rounded animate-pulse" />
            <div className="h-96 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!car && !vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <p className="text-muted-foreground">Car not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Media / Gallery */}
          <Card className="lg:col-span-2 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                {images[activeImageIdx] ? (
                  <img src={images[activeImageIdx].startsWith('http') ? images[activeImageIdx] : (supabase.storage.from('car-images').getPublicUrl(images[activeImageIdx]).data.publicUrl)} alt="Car" className="w-full h-[420px] object-cover" />
                ) : (
                  <div className="w-full h-[420px] bg-muted flex items-center justify-center">
                    <Car className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
                {car?.video_url && (
                  <div className="absolute bottom-3 right-3">
                    <Button size="sm" variant="secondary" className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Play Video
                    </Button>
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-3">
                  {images.map((src, idx) => (
                    <button key={idx} onClick={() => setActiveImageIdx(idx)} className={`h-20 overflow-hidden rounded ${idx === activeImageIdx ? 'ring-2 ring-primary' : ''}`}>
                      <img src={src.startsWith('http') ? src : (supabase.storage.from('car-images').getPublicUrl(src).data.publicUrl)} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h1 className="text-2xl font-bold">{car ? car.title : vehicle?.name}</h1>
                <p className="text-sm text-muted-foreground">{car ? `${car.year} ${car.make} ${car.model}` : `${vehicle?.year}`}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">{formatPrice(pricing.current)}</span>
                {pricing.hasDiscount && (
                  <span className="text-muted-foreground line-through">{formatPrice(pricing.original)}</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Car className="h-4 w-4" />{car ? `${car.mileage.toLocaleString()} ${car.mileage_unit}` : `${vehicle?.mileage.toLocaleString()} Miles`}</div>
                <div className="flex items-center gap-2"><Fuel className="h-4 w-4" />{car ? car.fuel_type : vehicle?.fuelType}</div>
                <div className="flex items-center gap-2"><Settings className="h-4 w-4" />{car ? car.transmission : vehicle?.transmission}</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{car ? car.location : '—'}</div>
              </div>
              <div className="pt-2">
                <Button className="w-full">Buy Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description & Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-3">Description</h2>
              <p className="text-sm text-muted-foreground">{car?.description || vehicle?.subtitle || 'No description provided.'}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Reviews</h2>
                <Badge variant="secondary">0 reviews</Badge>
              </div>
              <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review this car.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;



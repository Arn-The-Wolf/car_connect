import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Car, Upload } from "lucide-react";

interface Vehicle {
  _id: string;
  name: string;
  year: number;
  subtitle: string;
  image: string;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  badge?: string;
  make?: string;
  location?: string;
  seats?: number;
  condition?: string;
}

const EditCar = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    year: '',
    subtitle: '',
    price: '',
    mileage: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    badge: '',
    make: '',
    location: '',
    seats: '5',
    condition: 'Used',
  });

  useEffect(() => {
    if (id) {
      fetchVehicle();
    }
  }, [id]);

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/vehicles/${id}`);
      if (!res.ok) throw new Error('Vehicle not found');
      const data: Vehicle = await res.json();
      setVehicle(data);
      setFormData({
        name: data.name,
        year: data.year.toString(),
        subtitle: data.subtitle,
        price: data.price.toString(),
        mileage: data.mileage.toString(),
        fuelType: data.fuelType,
        transmission: data.transmission,
        badge: data.badge || '',
        make: data.make || '',
        location: data.location || '',
        seats: data.seats?.toString() || '5',
        condition: data.condition || 'Used',
      });
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      toast({
        title: "Error",
        description: "Failed to fetch vehicle details.",
        variant: "destructive",
      });
      navigate('/admin/cars');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    try {
      setSaving(true);
      const vehicleData = {
        name: formData.name,
        year: parseInt(formData.year),
        subtitle: formData.subtitle,
        price: parseFloat(formData.price),
        mileage: parseInt(formData.mileage) || 0,
        fuelType: formData.fuelType,
        transmission: formData.transmission,
        badge: formData.badge || undefined,
        make: formData.make || undefined,
        location: formData.location || undefined,
        seats: parseInt(formData.seats),
        condition: formData.condition,
      };

      const res = await fetch(`/api/vehicles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicleData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update vehicle');
      }

      toast({
        title: "Success!",
        description: "Vehicle updated successfully",
      });

      navigate('/admin/cars');
    } catch (error) {
      console.error('Error updating vehicle:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update vehicle",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/10 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-10 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-10 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/10 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin/cars')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cars
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Vehicle</h1>
            <p className="text-muted-foreground">Update vehicle information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Vehicle Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Toyota Corolla 2023"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    placeholder="2023"
                    min="1900"
                    max="2025"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    value={formData.make}
                    onChange={(e) => handleInputChange('make', e.target.value)}
                    placeholder="e.g., Toyota"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Used">Used</SelectItem>
                      <SelectItem value="Certified Pre-owned">Certified Pre-owned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle/Description</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    placeholder="e.g., 2.0L Hybrid LE"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Kigali, Rwanda"
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="25000"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="badge">Special Badge</Label>
                    <Input
                      id="badge"
                      value={formData.badge}
                      onChange={(e) => handleInputChange('badge', e.target.value)}
                      placeholder="e.g., Sale, Low Mileage"
                    />
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input
                      id="mileage"
                      type="number"
                      value={formData.mileage}
                      onChange={(e) => handleInputChange('mileage', e.target.value)}
                      placeholder="50000"
                      min="0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="seats">Number of Seats</Label>
                    <Input
                      id="seats"
                      type="number"
                      value={formData.seats}
                      onChange={(e) => handleInputChange('seats', e.target.value)}
                      placeholder="5"
                      min="1"
                      max="9"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <Select value={formData.fuelType} onValueChange={(value) => handleInputChange('fuelType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Petrol">Petrol</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                        <SelectItem value="LPG">LPG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="transmission">Transmission</Label>
                    <Select value={formData.transmission} onValueChange={(value) => handleInputChange('transmission', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Automatic">Automatic</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                        <SelectItem value="CVT">CVT</SelectItem>
                        <SelectItem value="Semi-Automatic">Semi-Automatic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6">
                <Button type="submit" disabled={saving} className="btn-hero">
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin/cars')}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default EditCar;



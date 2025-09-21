import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Car, 
  Fuel, 
  Settings, 
  MapPin,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  make?: string;
  location?: string;
  seats?: number;
  condition?: string;
}

const AdminCars = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/vehicles');
      if (!res.ok) throw new Error('Failed to fetch vehicles');
      const data: Vehicle[] = await res.json();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast({
        title: "Error",
        description: "Failed to fetch vehicles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vehicleId: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    
    try {
      const res = await fetch(`/api/vehicles/${vehicleId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete vehicle');
      
      setVehicles(prev => prev.filter(v => v.id !== vehicleId));
      toast({
        title: "Success",
        description: "Vehicle deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast({
        title: "Error",
        description: "Failed to delete vehicle.",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/10 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin-dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Manage Cars</h1>
            <p className="text-muted-foreground">Add, edit, or remove vehicle listings</p>
          </div>
        </div>

        {/* Search and Actions */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={() => navigate('/admin/add-car')} className="btn-hero">
                <Plus className="h-4 w-4 mr-2" />
                Add New Vehicle
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vehicles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-muted"></div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  {vehicle.image ? (
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-muted flex items-center justify-center">
                      <Car className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  
                  {vehicle.badge && (
                    <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                      {vehicle.badge}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {vehicle.year} • {vehicle.subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Car className="h-3 w-3" />
                        <span>{vehicle.mileage.toLocaleString()} Miles</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="h-3 w-3" />
                        <span>{vehicle.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings className="h-3 w-3" />
                        <span>{vehicle.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{vehicle.location || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-primary">
                        {formatPrice(vehicle.price)}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/car/${vehicle.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/admin/edit-car/${vehicle.id}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(vehicle.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Vehicles Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding your first vehicle.'}
            </p>
            <Button onClick={() => navigate('/admin/add-car')} className="btn-hero">
              <Plus className="h-4 w-4 mr-2" />
              Add New Vehicle
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCars;

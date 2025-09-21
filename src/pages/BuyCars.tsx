import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, ArrowLeft, Car, Fuel, Settings, Users, MapPin } from "lucide-react";
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

const BuyCars = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMake, setSelectedMake] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
<<<<<<< HEAD
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedMake) params.append('make', selectedMake);
      if (selectedYear) params.append('year', selectedYear);
      if (sortBy) params.append('sort', sortBy);
      
      const res = await fetch(`/api/vehicles?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch vehicles');
      const data: Vehicle[] = await res.json();
      setVehicles(data);
=======
      let query = supabase
        .from("cars")
        .select("*")
        .eq("status", "available");

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,make.ilike.%${searchTerm}%,model.ilike.%${searchTerm}%`);
      }

      if (selectedMake && selectedMake !== "all") {
        query = query.eq("make", selectedMake);
      }

      if (selectedYear && selectedYear !== "all") {
        query = query.eq("year", parseInt(selectedYear));
      }

      switch (sortBy) {
        case "price_low":
          query = query.order("price", { ascending: true });
          break;
        case "price_high":
          query = query.order("price", { ascending: false });
          break;
        case "year_new":
          query = query.order("year", { ascending: false });
          break;
        case "mileage":
          query = query.order("mileage", { ascending: true });
          break;
        default:
          query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      setCars(data || []);
>>>>>>> 59c5c7a6917c69ac557c5cd3503533ed4deca2bd
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast({
        title: "Error",
        description: "Failed to fetch cars. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [searchTerm, selectedMake, selectedYear, sortBy]);

  const handleAddToWishlist = async (vehicleId: string) => {
    // TODO: Implement wishlist with Node API
    toast({
      title: "Feature Coming Soon",
      description: "Wishlist functionality will be available soon.",
    });
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);

  const uniqueMakes = [...new Set(vehicles.map(v => v.make).filter(Boolean))];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Buy Cars</h1>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedMake} onValueChange={setSelectedMake}>
                <SelectTrigger>
                  <SelectValue placeholder="All Makes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Makes</SelectItem>
                  {uniqueMakes.map(make => (
                    <SelectItem key={make} value={make}>{make}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {Array.from(new Set(cars.map(car => car.year)))
                    .sort((a, b) => b - a)
                    .map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="year_new">Year: Newest First</SelectItem>
                  <SelectItem value="mileage">Mileage: Low to High</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={fetchVehicles} className="w-full">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {vehicles.length} results
          </p>
        </div>

        {/* Car Grid */}
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
            {vehicles.map((vehicle) => {
              return (
                <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative">
                    {vehicle.image ? (
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-muted flex items-center justify-center">
                        <Car className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
<<<<<<< HEAD
                    
                    {vehicle.condition === "New" && (
=======

                    {car.condition === "New" && (
>>>>>>> 59c5c7a6917c69ac557c5cd3503533ed4deca2bd
                      <Badge className="absolute top-2 left-2 bg-green-500">
                        New
                      </Badge>
                    )}
<<<<<<< HEAD
                    
                    {vehicle.badge && (
=======

                    {pricing.savings && (
>>>>>>> 59c5c7a6917c69ac557c5cd3503533ed4deca2bd
                      <Badge className="absolute top-2 right-2 bg-red-500">
                        {vehicle.badge}
                      </Badge>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-2 right-2 bg-white/80 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(vehicle.id);
                      }}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{vehicle.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {vehicle.year} • {vehicle.subtitle}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
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
                        <Users className="h-3 w-3" />
                        <span>{vehicle.seats || 5} seats</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3 text-xs">
                      <MapPin className="h-3 w-3" />
                      <span>{vehicle.location || 'Location not specified'}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(vehicle.price)}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/car/${vehicle.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!loading && vehicles.length === 0 && (
          <div className="text-center py-12">
            <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Cars Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyCars;
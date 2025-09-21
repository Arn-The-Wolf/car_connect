import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Removed Supabase dependency - using Node API
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Car, Fuel, Settings, Users, MapPin, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  car_id: string;
  cars: {
    id: string;
    title: string;
    make: string;
    model: string;
    year: number;
    price: number;
    discount?: number;
    mileage: number;
    mileage_unit: string;
    fuel_type: string;
    transmission: string;
    seats: number;
    location: string;
    condition: string;
    images: string[];
    color: string;
    body_type: string;
  };
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      // TODO: Implement wishlist with Node API
      // For now, show empty state
      setWishlistItems([]);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast({
        title: "Error",
        description: "Failed to fetch wishlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistId: string) => {
    // TODO: Implement wishlist removal with Node API
    toast({
      title: "Feature Coming Soon",
      description: "Wishlist functionality will be available soon.",
    });
  };

  const formatPrice = (price: number, discount?: number) => {
    const discountedPrice = discount ? price - discount : price;
    return {
      original: price.toLocaleString(),
      discounted: discountedPrice.toLocaleString(),
      savings: discount ? discount.toLocaleString() : null,
      percentage: discount ? Math.round((discount / price) * 100) : null
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">My Wishlist</h1>
          </div>
        </div>

        {/* Content */}
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
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Wishlist is Empty</h3>
            <p className="text-muted-foreground mb-6">
              Start adding cars you love to your wishlist!
            </p>
            <Button onClick={() => navigate("/buy-cars")}>
              Browse Cars
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                {wishlistItems.length} car{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => {
                const car = item.cars;
                const pricing = formatPrice(car.price, car.discount);
                
                return (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative">
                      {car.images && car.images.length > 0 ? (
                        <img
                          src={car.images[0]}
                          alt={car.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-muted flex items-center justify-center">
                          <Car className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      
                      {car.condition === "New" && (
                        <Badge className="absolute top-2 left-2 bg-green-500">
                          New
                        </Badge>
                      )}
                      
                      {pricing.savings && (
                        <Badge className="absolute top-2 right-12 bg-red-500">
                          {pricing.percentage}% OFF
                        </Badge>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{car.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {car.year} • {car.body_type}
                      </p>

                      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                        <div className="flex items-center gap-1">
                          <Car className="h-3 w-3" />
                          <span>{car.mileage.toLocaleString()} {car.mileage_unit}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Fuel className="h-3 w-3" />
                          <span>{car.fuel_type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Settings className="h-3 w-3" />
                          <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{car.seats} seats</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3 text-xs">
                        <MapPin className="h-3 w-3" />
                        <span>{car.location}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          {pricing.savings ? (
                            <div>
                              <p className="text-lg font-bold text-primary">
                                ${pricing.discounted}
                              </p>
                              <p className="text-sm text-muted-foreground line-through">
                                ${pricing.original}
                              </p>
                            </div>
                          ) : (
                            <p className="text-lg font-bold text-primary">
                              ${pricing.original}
                            </p>
                          )}
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => navigate(`/car/${car.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
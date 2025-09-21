import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Calendar, Clock, Car, User, Phone, Mail, MapPin } from "lucide-react";

interface Vehicle {
  _id: string;
  name: string;
  year: number;
  subtitle: string;
  image: string;
  price: number;
  make?: string;
  location?: string;
}

const TestDriveBooking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    drivingLicense: '',
    experience: '1-2 years'
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
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      toast({
        title: "Error",
        description: "Failed to fetch vehicle details.",
        variant: "destructive",
      });
      navigate('/buy-cars');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    try {
      setSubmitting(true);
      
      // TODO: Implement API call to book test drive
      const bookingData = {
        vehicleId: id,
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Test Drive Booked!",
        description: "Your test drive request has been submitted. We'll contact you soon to confirm the details.",
      });

      navigate(`/car/${id}`);
    } catch (error) {
      console.error('Error booking test drive:', error);
      toast({
        title: "Error",
        description: "Failed to book test drive. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM'
  ];

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
          <Button variant="ghost" onClick={() => navigate(`/car/${id}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Car
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Book Test Drive</h1>
            <p className="text-muted-foreground">Schedule a test drive for this vehicle</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vehicle Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Vehicle Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vehicle?.image && (
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg">{vehicle?.name}</h3>
                  <p className="text-muted-foreground">{vehicle?.year} • {vehicle?.make}</p>
                  <p className="text-sm text-muted-foreground mt-2">{vehicle?.subtitle}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{vehicle?.location || 'Location not specified'}</span>
                  </div>
                  <div className="text-lg font-bold text-primary">
                    ${vehicle?.price?.toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Test Drive Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+250 123 456 789"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="drivingLicense">Driving License Number *</Label>
                        <Input
                          id="drivingLicense"
                          value={formData.drivingLicense}
                          onChange={(e) => handleInputChange('drivingLicense', e.target.value)}
                          placeholder="Enter your license number"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Test Drive Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Test Drive Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="preferredDate">Preferred Date *</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred Time *</Label>
                        <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="experience">Driving Experience</Label>
                        <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Less than 1 year">Less than 1 year</SelectItem>
                            <SelectItem value="1-2 years">1-2 years</SelectItem>
                            <SelectItem value="3-5 years">3-5 years</SelectItem>
                            <SelectItem value="5-10 years">5-10 years</SelectItem>
                            <SelectItem value="More than 10 years">More than 10 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Additional Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Any specific requests or questions about the test drive..."
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Test Drive Terms & Conditions</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• You must have a valid driving license</li>
                        <li>• Test drive duration is approximately 30 minutes</li>
                        <li>• You are responsible for any traffic violations during the test drive</li>
                        <li>• Our representative will accompany you during the test drive</li>
                        <li>• Test drive is subject to vehicle availability</li>
                      </ul>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-6">
                    <Button type="submit" disabled={submitting} className="btn-hero flex-1">
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Booking...
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Test Drive
                        </>
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate(`/car/${id}`)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDriveBooking;



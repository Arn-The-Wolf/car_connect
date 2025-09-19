import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  ShoppingCart, 
  Heart, 
  Calendar, 
  Car,
  Search,
  Bell,
  Settings,
  LogOut,
  Star,
  MapPin,
  Phone
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const BuyerDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    orders: 0,
    wishlist: 0,
    bookings: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchDashboardData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/signin');
      return;
    }
    setUser(session.user);
    
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .single();
    
    setProfile(profileData);
  };

  const fetchDashboardData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    // Fetch stats
    const [ordersRes, wishlistRes, bookingsRes] = await Promise.all([
      supabase.from('orders').select('id', { count: 'exact' }).eq('user_id', session.user.id),
      supabase.from('wishlist').select('id', { count: 'exact' }).eq('user_id', session.user.id),
      supabase.from('bookings').select('id', { count: 'exact' }).eq('user_id', session.user.id)
    ]);

    setStats({
      orders: ordersRes.count || 0,
      wishlist: wishlistRes.count || 0,
      bookings: bookingsRes.count || 0
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = [
    { icon: User, label: 'Dashboard', href: '/buyer-dashboard', active: true },
    { icon: ShoppingCart, label: 'Orders', href: '/buyer/orders' },
    { icon: Heart, label: 'Wishlist', href: '/buyer/wishlist' },
    { icon: Calendar, label: 'Bookings', href: '/buyer/bookings' },
    { icon: Car, label: 'Buy Cars', href: '/cars' },
    { icon: Settings, label: 'Settings', href: '/buyer/settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/10">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card/80 backdrop-blur-sm border-r border-border min-h-screen relative">
          <div className="p-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              CarConnect
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Buyer Dashboard</p>
          </div>
          
          <nav className="px-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || 'User'}!</h1>
              <p className="text-muted-foreground">Here's what's happening with your car search</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input pl-10 w-80"
                />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card/80 backdrop-blur-sm border border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.orders}</div>
                <p className="text-xs text-muted-foreground">Active purchases</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                <Heart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.wishlist}</div>
                <p className="text-xs text-muted-foreground">Saved cars</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.bookings}</div>
                <p className="text-xs text-muted-foreground">Test drives scheduled</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Link to="/cars">
              <Card className="bg-card/80 backdrop-blur-sm border border-border hover:shadow-card transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Car className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Browse Cars</h3>
                  <p className="text-sm text-muted-foreground">Find your dream car</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/buyer/wishlist">
              <Card className="bg-card/80 backdrop-blur-sm border border-border hover:shadow-card transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">My Wishlist</h3>
                  <p className="text-sm text-muted-foreground">Saved favorites</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/buyer/bookings">
              <Card className="bg-card/80 backdrop-blur-sm border border-border hover:shadow-card transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Book Test Drive</h3>
                  <p className="text-sm text-muted-foreground">Schedule viewing</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/buyer/orders">
              <Card className="bg-card/80 backdrop-blur-sm border border-border hover:shadow-card transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <ShoppingCart className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">My Orders</h3>
                  <p className="text-sm text-muted-foreground">Track purchases</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Recent Activity */}
          <Card className="bg-card/80 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-accent/20 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Welcome to CarConnect!</p>
                    <p className="text-sm text-muted-foreground">Start browsing our extensive car collection</p>
                  </div>
                  <span className="text-sm text-muted-foreground">Just now</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
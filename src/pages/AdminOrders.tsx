import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  ShoppingBag, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle,
  Clock,
  ArrowLeft,
  Calendar,
  DollarSign,
  User,
  Car
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  order_number: string;
  user_name: string;
  user_email: string;
  vehicle_name: string;
  vehicle_image: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  payment_method?: string;
  created_at: string;
  updated_at: string;
  notes?: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockOrders: Order[] = [
        {
          id: '1',
          order_number: 'ORD-2024-001',
          user_name: 'John Doe',
          user_email: 'john@example.com',
          vehicle_name: '2023 Toyota Corolla',
          vehicle_image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
          total_amount: 45000,
          status: 'completed',
          payment_method: 'Bank Transfer',
          created_at: '2024-01-15T10:30:00Z',
          updated_at: '2024-01-16T14:22:00Z',
          notes: 'Customer requested early delivery'
        },
        {
          id: '2',
          order_number: 'ORD-2024-002',
          user_name: 'Jane Smith',
          user_email: 'jane@example.com',
          vehicle_name: '2022 Ford Transit',
          vehicle_image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
          total_amount: 22000,
          status: 'pending',
          payment_method: 'Mobile Money',
          created_at: '2024-01-18T15:45:00Z',
          updated_at: '2024-01-18T15:45:00Z'
        },
        {
          id: '3',
          order_number: 'ORD-2024-003',
          user_name: 'Mike Johnson',
          user_email: 'mike@example.com',
          vehicle_name: '2024 Audi A6',
          vehicle_image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop',
          total_amount: 58000,
          status: 'processing',
          payment_method: 'Bank Transfer',
          created_at: '2024-01-19T09:20:00Z',
          updated_at: '2024-01-20T11:30:00Z'
        },
        {
          id: '4',
          order_number: 'ORD-2024-004',
          user_name: 'Sarah Wilson',
          user_email: 'sarah@example.com',
          vehicle_name: '2023 Mercedes GLC',
          vehicle_image: 'https://images.unsplash.com/photo-1606016595464-d0b5c54a8f87?w=400&h=300&fit=crop',
          total_amount: 95000,
          status: 'cancelled',
          payment_method: 'Bank Transfer',
          created_at: '2024-01-20T12:15:00Z',
          updated_at: '2024-01-20T16:45:00Z',
          notes: 'Customer cancelled due to financing issues'
        }
      ];
      
      setOrders(mockOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error",
        description: "Failed to fetch orders. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      // TODO: Implement API call to update order status
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus as any, updated_at: new Date().toISOString() }
          : order
      ));
      
      toast({
        title: "Success",
        description: `Order status updated to ${newStatus}.`,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'processing':
        return 'bg-blue-500';
      case 'confirmed':
        return 'bg-purple-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);

  const filteredOrders = orders.filter(order =>
    order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.vehicle_name.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(order => statusFilter === '' || order.status === statusFilter);

  const totalRevenue = orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.total_amount, 0);

  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

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
            <h1 className="text-3xl font-bold">Manage Orders</h1>
            <p className="text-muted-foreground">View and manage customer orders</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{totalOrders}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">{formatPrice(totalRevenue)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders by number, customer, or vehicle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <img
                        src={order.vehicle_image}
                        alt={order.vehicle_name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{order.order_number}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(order.status)}
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{order.user_name} ({order.user_email})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            <span>{order.vehicle_name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Ordered {formatDate(order.created_at)}</span>
                          </div>
                          {order.payment_method && (
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              <span>Paid via {order.payment_method}</span>
                            </div>
                          )}
                        </div>
                        {order.notes && (
                          <p className="text-sm text-muted-foreground italic">
                            Note: {order.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="text-2xl font-bold text-primary">
                        {formatPrice(order.total_amount)}
                      </div>
                      <div className="flex gap-2">
                        {order.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                            >
                              Confirm
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {order.status === 'confirmed' && (
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(order.id, 'processing')}
                          >
                            Start Processing
                          </Button>
                        )}
                        {order.status === 'processing' && (
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(order.id, 'completed')}
                          >
                            Mark Complete
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/admin/order/${order.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search criteria.' : 'No orders have been placed yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;



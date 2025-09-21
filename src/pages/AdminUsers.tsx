import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone,
  Calendar,
  ArrowLeft,
  Shield,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: 'admin' | 'buyer' | 'seller';
  created_at: string;
  last_login?: string;
  is_active: boolean;
  total_orders?: number;
  total_spent?: number;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockUsers: User[] = [
        {
          id: '1',
          full_name: 'John Doe',
          email: 'john@example.com',
          phone: '+250 123 456 789',
          role: 'buyer',
          created_at: '2024-01-15T10:30:00Z',
          last_login: '2024-01-20T14:22:00Z',
          is_active: true,
          total_orders: 3,
          total_spent: 125000
        },
        {
          id: '2',
          full_name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+250 987 654 321',
          role: 'admin',
          created_at: '2024-01-10T09:15:00Z',
          last_login: '2024-01-20T16:45:00Z',
          is_active: true,
          total_orders: 0,
          total_spent: 0
        },
        {
          id: '3',
          full_name: 'Mike Johnson',
          email: 'mike@example.com',
          phone: '+250 555 123 456',
          role: 'seller',
          created_at: '2024-01-12T11:20:00Z',
          last_login: '2024-01-19T13:30:00Z',
          is_active: true,
          total_orders: 0,
          total_spent: 0
        },
        {
          id: '4',
          full_name: 'Sarah Wilson',
          email: 'sarah@example.com',
          phone: '+250 444 777 888',
          role: 'buyer',
          created_at: '2024-01-18T15:45:00Z',
          last_login: '2024-01-20T10:15:00Z',
          is_active: false,
          total_orders: 1,
          total_spent: 45000
        }
      ];
      
      setUsers(mockUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      // TODO: Implement API call to toggle user status
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, is_active: !currentStatus }
          : user
      ));
      
      toast({
        title: "Success",
        description: `User ${currentStatus ? 'deactivated' : 'activated'} successfully.`,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        title: "Error",
        description: "Failed to update user status.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    
    try {
      // TODO: Implement API call to delete user
      setUsers(prev => prev.filter(user => user.id !== userId));
      toast({
        title: "Success",
        description: "User deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user.",
        variant: "destructive",
      });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500';
      case 'seller':
        return 'bg-blue-500';
      case 'buyer':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  ).filter(user => selectedRole === '' || user.role === selectedRole);

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
            <h1 className="text-3xl font-bold">Manage Users</h1>
            <p className="text-muted-foreground">View and manage user accounts</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
                <option value="buyer">Buyer</option>
              </select>
              <Button onClick={() => navigate('/admin/add-user')} className="btn-hero">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
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
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{user.full_name}</h3>
                          <Badge className={getRoleColor(user.role)}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                          {user.role === 'admin' && <Shield className="h-4 w-4 text-red-500" />}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            <span>{user.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Joined {formatDate(user.created_at)}</span>
                          </div>
                        </div>
                        {user.role === 'buyer' && (
                          <div className="text-sm text-muted-foreground">
                            {user.total_orders} orders • ${user.total_spent?.toLocaleString()} spent
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={user.is_active ? "default" : "secondary"}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleUserStatus(user.id, user.is_active)}
                      >
                        {user.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/edit-user/${user.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Users Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search criteria.' : 'No users have been registered yet.'}
            </p>
            <Button onClick={() => navigate('/admin/add-user')} className="btn-hero">
              <UserPlus className="h-4 w-4 mr-2" />
              Add First User
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;



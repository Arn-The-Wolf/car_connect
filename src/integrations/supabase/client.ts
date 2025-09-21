// Mock Supabase client for frontend-only operation
// This replaces the actual Supabase client with mock data

export interface MockUser {
  id: string;
  email?: string;
  phone?: string;
  user_metadata?: {
    full_name?: string;
    role?: string;
  };
}

export interface MockSession {
  user: MockUser;
  access_token: string;
  refresh_token: string;
}

export interface MockAuthResponse {
  data: {
    user: MockUser | null;
    session: MockSession | null;
  };
  error: any;
}

export interface MockQueryResponse<T> {
  data: T | null;
  error: any;
  count?: number;
}

// Mock data
const mockUsers: MockUser[] = [
  {
    id: '1',
    phone: '+250788123456',
    user_metadata: {
      full_name: 'John Doe',
      role: 'buyer'
    }
  },
  {
    id: '2',
    phone: '+250788654321',
    user_metadata: {
      full_name: 'Admin User',
      role: 'admin'
    }
  }
];

const mockCars = [
  {
    id: '1',
    title: 'Toyota Camry 2020',
    make: 'Toyota',
    model: 'Camry',
    full_model: 'Camry LE 2.5L',
    year: 2020,
    manufacture_date: '2020-03-15',
    color: 'Black',
    mileage: 45000,
    mileage_unit: 'km',
    body_type: 'Sedan',
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    vin: '1HGBH41JXMN109186',
    registration_number: 'RAA123A',
    condition: 'Used',
    location: 'Kigali, Rwanda',
    description: 'Well maintained Toyota Camry with full service history. Perfect for family use.',
    price: 15000000,
    discount: 500000,
    negotiable: true,
    service_history: 'Regular maintenance at authorized Toyota service center',
    last_service_date: '2024-01-15',
    seller_contact: '+250788123456',
    created_by: '2',
    status: 'available',
    images: ['/placeholder.svg'],
    video_url: null,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'BMW X5 2021',
    make: 'BMW',
    model: 'X5',
    full_model: 'X5 xDrive30i',
    year: 2021,
    manufacture_date: '2021-06-20',
    color: 'White',
    mileage: 25000,
    mileage_unit: 'km',
    body_type: 'SUV',
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    seats: 7,
    vin: '5UXCR6C05L9B12345',
    registration_number: 'RAA456B',
    condition: 'Used',
    location: 'Kigali, Rwanda',
    description: 'Luxury BMW X5 with premium features and low mileage.',
    price: 35000000,
    discount: 0,
    negotiable: false,
    service_history: 'BMW authorized service center',
    last_service_date: '2024-02-01',
    seller_contact: '+250788654321',
    created_by: '2',
    status: 'available',
    images: ['/placeholder.svg'],
    video_url: null,
    created_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    title: 'Mercedes-Benz C-Class 2022',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    full_model: 'C200 AMG Line',
    year: 2022,
    manufacture_date: '2022-01-10',
    color: 'Silver',
    mileage: 15000,
    mileage_unit: 'km',
    body_type: 'Sedan',
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    vin: 'WDD2050461A123456',
    registration_number: 'RAA789C',
    condition: 'New',
    location: 'Kigali, Rwanda',
    description: 'Brand new Mercedes-Benz C-Class with AMG styling package.',
    price: 45000000,
    discount: 2000000,
    negotiable: true,
    service_history: 'Brand new vehicle',
    last_service_date: null,
    seller_contact: '+250788987654',
    created_by: '2',
    status: 'available',
    images: ['/placeholder.svg'],
    video_url: null,
    created_at: '2024-02-01T00:00:00Z'
  },
  {
    id: '4',
    title: 'Audi A4 2021',
    make: 'Audi',
    model: 'A4',
    full_model: 'A4 2.0 TFSI Quattro',
    year: 2021,
    manufacture_date: '2021-04-12',
    color: 'Blue',
    mileage: 30000,
    mileage_unit: 'km',
    body_type: 'Sedan',
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    vin: 'WAUZZZ8V1MA123456',
    registration_number: 'RAA101D',
    condition: 'Used',
    location: 'Kigali, Rwanda',
    description: 'Premium Audi A4 with Quattro all-wheel drive system.',
    price: 28000000,
    discount: 1000000,
    negotiable: true,
    service_history: 'Audi authorized service center',
    last_service_date: '2024-01-20',
    seller_contact: '+250788111222',
    created_by: '2',
    status: 'available',
    images: ['/placeholder.svg'],
    video_url: null,
    created_at: '2024-01-20T00:00:00Z'
  },
  {
    id: '5',
    title: 'Ford Ranger 2020',
    make: 'Ford',
    model: 'Ranger',
    full_model: 'Ranger XLT 2.0L',
    year: 2020,
    manufacture_date: '2020-08-05',
    color: 'Red',
    mileage: 55000,
    mileage_unit: 'km',
    body_type: 'Pickup',
    fuel_type: 'Diesel',
    transmission: 'Manual',
    seats: 5,
    vin: '1FTFW1ET5LFA12345',
    registration_number: 'RAA202E',
    condition: 'Used',
    location: 'Kigali, Rwanda',
    description: 'Reliable Ford Ranger pickup truck, perfect for work and adventure.',
    price: 18000000,
    discount: 0,
    negotiable: true,
    service_history: 'Regular maintenance at Ford service center',
    last_service_date: '2024-01-10',
    seller_contact: '+250788333444',
    created_by: '2',
    status: 'available',
    images: ['/placeholder.svg'],
    video_url: null,
    created_at: '2024-01-25T00:00:00Z'
  },
  {
    id: '6',
    title: 'Mercedes-Benz GLE 2022',
    make: 'Mercedes-Benz',
    model: 'GLE',
    full_model: 'GLE 350 4MATIC',
    year: 2022,
    manufacture_date: '2022-02-15',
    color: 'Black',
    mileage: 20000,
    mileage_unit: 'km',
    body_type: 'SUV',
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    seats: 7,
    vin: 'WDC0G4JB2NA123456',
    registration_number: 'RAA303F',
    condition: 'Used',
    location: 'Kigali, Rwanda',
    description: 'Luxury Mercedes-Benz GLE with advanced safety features.',
    price: 42000000,
    discount: 1500000,
    negotiable: false,
    service_history: 'Mercedes-Benz authorized service',
    last_service_date: '2024-02-05',
    seller_contact: '+250788555666',
    created_by: '2',
    status: 'available',
    images: ['/placeholder.svg'],
    video_url: null,
    created_at: '2024-02-05T00:00:00Z'
  }
];

const mockProfiles = [
  {
    id: '1',
    user_id: '1',
    full_name: 'John Doe',
    role: 'buyer',
    phone: '+250788123456',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    user_id: '2',
    full_name: 'Admin User',
    role: 'admin',
    phone: '+250788654321',
    created_at: '2024-01-01T00:00:00Z'
  }
];

const mockWishlist = [
  {
    id: '1',
    user_id: '1',
    car_id: '1',
    created_at: '2024-01-15T00:00:00Z'
  }
];

const mockOrders = [
  {
    id: '1',
    user_id: '1',
    car_id: '2',
    total_amount: 35000000,
    status: 'completed',
    payment_method: 'Bank Transfer',
    notes: 'Smooth transaction',
    created_at: '2024-01-20T00:00:00Z'
  }
];

const mockBookings = [
  {
    id: '1',
    user_id: '1',
    car_id: '1',
    booking_date: '2024-02-15',
    booking_time: '10:00',
    status: 'confirmed',
    notes: 'Test drive appointment',
    created_at: '2024-01-25T00:00:00Z'
  }
];

// Mock storage
const mockStorage = {
  from: (bucket: string) => ({
    upload: async (path: string, file: File) => {
      console.log(`Mock upload: ${bucket}/${path}`);
      return { data: { path }, error: null };
    },
    getPublicUrl: (path: string) => ({
      data: { publicUrl: `/placeholder.svg` }
    })
  })
};

// Mock auth
const mockAuth = {
  signUp: async (options: any): Promise<MockAuthResponse> => {
    console.log('Mock signUp:', options);
    return {
      data: {
        user: null,
        session: null
      },
      error: null
    };
  },
  signInWithPassword: async (options: any): Promise<MockAuthResponse> => {
    console.log('Mock signInWithPassword:', options);
    return {
      data: {
        user: null,
        session: null
      },
      error: null
    };
  },
  verifyOtp: async (options: any): Promise<MockAuthResponse> => {
    console.log('Mock verifyOtp:', options);
    const user = mockUsers[0]; // Default to first user
    return {
      data: {
        user,
        session: {
          user,
          access_token: 'mock_token',
          refresh_token: 'mock_refresh_token'
        }
      },
      error: null
    };
  },
  signOut: async () => {
    console.log('Mock signOut');
    return { error: null };
  },
  getSession: async (): Promise<MockAuthResponse> => {
    // Return null session for now - user needs to sign in
    return {
      data: {
        user: null,
        session: null
      },
      error: null
    };
  },
  getUser: async (): Promise<MockAuthResponse> => {
    return {
      data: {
        user: null,
        session: null
      },
      error: null
    };
  }
};

// Mock database query builder
class MockQueryBuilder {
  private table: string;
  private selectFields: string = '*';
  private whereConditions: Array<{ field: string; operator: string; value: any }> = [];
  private orderByField?: string;
  private orderByAscending: boolean = true;
  private limitCount?: number;
  private eqField?: string;
  private eqValue?: any;
  private ilikeField?: string;
  private ilikeValue?: string;
  private orConditions?: string;
  private insertData?: any;
  private updateData?: any;
  private deleteOperation?: boolean;

  constructor(table: string) {
    this.table = table;
  }

  select(fields: string) {
    this.selectFields = fields;
    return this;
  }

  eq(field: string, value: any) {
    this.eqField = field;
    this.eqValue = value;
    return this;
  }

  ilike(field: string, value: string) {
    this.ilikeField = field;
    this.ilikeValue = value;
    return this;
  }

  or(condition: string) {
    this.orConditions = condition;
    return this;
  }

  order(field: string, options?: { ascending: boolean }) {
    this.orderByField = field;
    this.orderByAscending = options?.ascending ?? true;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  single() {
    return this;
  }

  insert(data: any) {
    this.insertData = data;
    return this;
  }

  update(data: any) {
    this.updateData = data;
    return this;
  }

  delete() {
    this.deleteOperation = true;
    return this;
  }

  async then(resolve: (value: any) => void, reject?: (reason: any) => void) {
    try {
      // Handle insert operation
      if (this.insertData) {
        const newId = Math.random().toString(36).substr(2, 9);
        const newItem = { ...this.insertData, id: newId, created_at: new Date().toISOString() };

        // Add to appropriate mock data array
        switch (this.table) {
          case 'cars':
            mockCars.push(newItem);
            break;
          case 'profiles':
            mockProfiles.push(newItem);
            break;
          case 'wishlist':
            mockWishlist.push(newItem);
            break;
          case 'orders':
            mockOrders.push(newItem);
            break;
          case 'bookings':
            mockBookings.push(newItem);
            break;
        }

        resolve({ data: newItem, error: null });
        return;
      }

      // Handle update operation
      if (this.updateData) {
        let updatedItem = null;
        switch (this.table) {
          case 'cars':
            const carIndex = mockCars.findIndex(c => c.id === this.eqValue);
            if (carIndex !== -1) {
              mockCars[carIndex] = { ...mockCars[carIndex], ...this.updateData };
              updatedItem = mockCars[carIndex];
            }
            break;
          // Add other tables as needed
        }
        resolve({ data: updatedItem, error: null });
        return;
      }

      // Handle delete operation
      if (this.deleteOperation) {
        let deleted = false;
        switch (this.table) {
          case 'wishlist':
            const wishlistIndex = mockWishlist.findIndex(w => w.id === this.eqValue);
            if (wishlistIndex !== -1) {
              mockWishlist.splice(wishlistIndex, 1);
              deleted = true;
            }
            break;
          // Add other tables as needed
        }
        resolve({ data: deleted ? {} : null, error: null });
        return;
      }

      let data: any[] = [];

      // Get data based on table
      switch (this.table) {
        case 'cars':
          data = [...mockCars];
          break;
        case 'profiles':
          data = [...mockProfiles];
          break;
        case 'wishlist':
          data = [...mockWishlist];
          break;
        case 'orders':
          data = [...mockOrders];
          break;
        case 'bookings':
          data = [...mockBookings];
          break;
        default:
          data = [];
      }

      // Apply filters
      if (this.eqField && this.eqValue !== undefined) {
        data = data.filter(item => item[this.eqField!] === this.eqValue);
      }

      if (this.ilikeField && this.ilikeValue) {
        const pattern = this.ilikeValue.replace(/%/g, '.*');
        const regex = new RegExp(pattern, 'i');
        data = data.filter(item => regex.test(item[this.ilikeField!]));
      }

      if (this.orConditions) {
        // Simple OR condition handling for search
        const searchTerms = this.orConditions.split(',').map(term =>
          term.replace(/\.ilike\.%|%|,/g, '').trim()
        );
        data = data.filter(item =>
          searchTerms.some(term =>
            item.title?.toLowerCase().includes(term.toLowerCase()) ||
            item.make?.toLowerCase().includes(term.toLowerCase()) ||
            item.model?.toLowerCase().includes(term.toLowerCase())
          )
        );
      }

      // Apply ordering
      if (this.orderByField) {
        data.sort((a, b) => {
          const aVal = a[this.orderByField!];
          const bVal = b[this.orderByField!];
          if (this.orderByAscending) {
            return aVal > bVal ? 1 : -1;
          } else {
            return aVal < bVal ? 1 : -1;
          }
        });
      }

      // Apply limit
      if (this.limitCount) {
        data = data.slice(0, this.limitCount);
      }

      // Handle joins for related data
      if (this.selectFields.includes('cars')) {
        // Handle wishlist and orders with car data
        data = data.map(item => {
          if (item.car_id) {
            const car = mockCars.find(c => c.id === item.car_id);
            return { ...item, cars: car };
          }
          return item;
        });
      }

      // Handle single() call
      if (this.selectFields.includes('single') || data.length === 1) {
        resolve({ data: data[0] || null, error: null });
      } else {
        resolve({ data, error: null, count: data.length });
      }
    } catch (error) {
      if (reject) {
        reject(error);
      } else {
        resolve({ data: null, error });
      }
    }
  }
}

// Mock database
const mockDb = {
  from: (table: string) => new MockQueryBuilder(table)
};

// Mock real-time subscriptions
const mockRealtime = {
  channel: (name: string) => ({
    on: (event: string, options: any, callback: () => void) => ({
      subscribe: () => {
        console.log(`Mock subscription: ${name}`);
        return { unsubscribe: () => { } };
      }
    })
  }),
  removeChannel: (subscription: any) => {
    console.log('Mock removeChannel');
  }
};

// Main mock Supabase client
export const supabase = {
  auth: mockAuth,
  storage: mockStorage,
  from: mockDb.from,
  channel: mockRealtime.channel,
  removeChannel: mockRealtime.removeChannel
};

export default supabase;

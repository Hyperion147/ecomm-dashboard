export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: number | null;
  isActive: boolean;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  sku: string;
  price: number;
  comparePrice: number;
  costPrice: number;
  trackQuantity: boolean;
  quantity: number;
  allowBackorder: boolean;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  categoryId: number;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  tags: string[];
  images: string[];
  status: "draft" | "active" | "archived";
  isFeatured: boolean;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  total: number;
  productSnapshot: {
    name: string;
    sku: string;
    image: string;
  };
};

export type Order = {
  id: number;
  orderNumber: string;
  userId: string;
  email: string;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  total: number;
  currency: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  createdAt: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isEmailVerified: boolean;
  role: "customer" | "admin" | "vendor";
  isActive: boolean;
};

export const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets and electronic devices",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661",
    parentId: null,
    isActive: true,
  },
  {
    id: 2,
    name: "Smartphones",
    slug: "smartphones",
    description: "Mobile phones and accessories",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    parentId: 1,
    isActive: true,
  },
];

export const products: Product[] = [
  {
    id: 101,
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    description: "The latest iPhone with titanium design and A17 Pro chip.",
    shortDescription: "Titanium iPhone 15 Pro",
    sku: "IP15P-256-GR",
    price: 999.0,
    comparePrice: 1099.0,
    costPrice: 700.0,
    trackQuantity: true,
    quantity: 50,
    allowBackorder: false,
    weight: 0.187,
    dimensions: {
      length: 146.6,
      width: 70.6,
      height: 8.25,
      unit: "mm",
    },
    categoryId: 2,
    category: {
      id: 2,
      name: "Smartphones",
      slug: "smartphones",
    },
    tags: ["apple", "iphone", "mobile"],
    images: [
      "https://images.unsplash.com/photo-1696446701796-da61225697cc",
      "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7",
    ],
    status: "active",
    isFeatured: true,
    seoTitle: "iPhone 15 Pro - Best Deals",
    seoDescription: "Buy the new iPhone 15 Pro with Titanium build.",
    createdAt: "2023-12-24T10:00:00Z",
    updatedAt: "2023-12-24T10:00:00Z",
  },
];

export const orders: Order[] = [
  {
    id: 501,
    orderNumber: "ORD-2023-0001",
    userId: "u1234-uuid-format",
    email: "customer@example.com",
    status: "processing",
    paymentStatus: "paid",
    subtotal: 999.0,
    taxAmount: 80.0,
    shippingAmount: 15.0,
    discountAmount: 0.0,
    total: 1094.0,
    currency: "USD",
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
    },
    items: [
      {
        id: 1001,
        productId: 101,
        quantity: 1,
        price: 999.0,
        total: 999.0,
        productSnapshot: {
          name: "iPhone 15 Pro",
          sku: "IP15P-256-GR",
          image: "https://images.unsplash.com/photo-1696446701796-da61225697cc",
        },
      },
    ],
    createdAt: "2023-12-24T12:30:00Z",
  },
];

export const users: User[] = [
  {
    id: "u1234-uuid-format",
    email: "customer@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+1-234-567-890",
    isEmailVerified: true,
    role: "customer",
    isActive: true,
  },
];

export const monthlySales = [
  { month: "Jan", sales: 4500, orders: 120 },
  { month: "Feb", sales: 5200, orders: 150 },
  { month: "Mar", sales: 4800, orders: 140 },
  { month: "Apr", sales: 6100, orders: 180 },
  { month: "May", sales: 5900, orders: 175 },
  { month: "Jun", sales: 7200, orders: 210 },
  { month: "Jul", sales: 6800, orders: 195 },
  { month: "Aug", sales: 8100, orders: 230 },
  { month: "Sep", sales: 7500, orders: 215 },
  { month: "Oct", sales: 8900, orders: 250 },
  { month: "Nov", sales: 9400, orders: 270 },
  { month: "Dec", sales: 10500, orders: 310 },
];

export type Role = 'ADMIN' | 'SELLER' | 'BUYER';
export type WatchStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type OrderStatus = 'PENDING' | 'PAID' | 'COMPLETED' | 'CANCELLED';
export type EscrowStatus = 'NONE' | 'HOLDING' | 'RELEASED' | 'REFUNDED';
export type DisputeStatus = 'OPEN' | 'IN_REVIEW' | 'RESOLVED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Watch {
  id: string;
  brand: string;
  model: string;
  price: number;
  condition: string;
  description: string;
  images: string[];
  status: WatchStatus;
  sellerId: string;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  watchId: string;
  status: OrderStatus;
  escrowStatus: EscrowStatus;
  trackingCode?: string;
}

export interface Dispute {
  id: string;
  orderId: string;
  reason: string;
  comment?: string;
  status: DisputeStatus;
}

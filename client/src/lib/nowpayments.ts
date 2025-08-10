import { apiRequest } from "./queryClient";

export interface CreateOrderRequest {
  username: string;
  email: string;
  toolName: string;
  duration: string;
  price: string;
  paymentMethod: string;
}

export interface CreateOrderResponse {
  success: boolean;
  order_id: string;
  payment_url: string;
  payment_id: string;
  error?: string;
}

export interface Order {
  id: string;
  username: string;
  email: string;
  toolName: string;
  duration: string;
  price: string;
  paymentMethod: string;
  paymentId: string | null;
  status: string;
  createdAt: string;
}

export const nowPaymentsAPI = {
  createOrder: async (orderData: CreateOrderRequest): Promise<CreateOrderResponse> => {
    const response = await apiRequest("POST", "/api/orders", orderData);
    return await response.json();
  },

  getOrder: async (orderId: string): Promise<Order> => {
    const response = await apiRequest("GET", `/api/orders/${orderId}`);
    return await response.json();
  },

  getCurrencies: async () => {
    const response = await apiRequest("GET", "/api/currencies");
    return await response.json();
  }
};

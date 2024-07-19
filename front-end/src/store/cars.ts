import {create} from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface OrdersState {
  orders: any[];
  setOrders: (newUser: []) => void;
};

const useOrders = create(
  persist<OrdersState>(
    (set) => ({
      orders: [],
      setOrders: (newOrder: any) => set({orders:newOrder}),
    }),
    {
      name: 'user-state', 
      storage: createJSONStorage(()=> localStorage), 
    }
  )
);

export default useOrders;

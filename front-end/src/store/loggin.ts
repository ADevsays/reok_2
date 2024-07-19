import {create} from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User } from '../interfaces/User/userInterfaces';

interface UserState {
  user: User | null;
  setUser: (newUser: User) => void;
  clearUser: ()=> void
};

const useUser = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (newUser: User) => set({user:newUser}),
      clearUser: ()=> set({user:null})
    }),
    {
      name: 'user-state', 
      storage: createJSONStorage(()=> localStorage), 
    }
  )
);

export default useUser;

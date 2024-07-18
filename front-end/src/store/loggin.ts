import { create } from "zustand";
import { User } from "../interfaces/User/userInterfaces";

interface UserState{
    user: User | null,
    setUser: (newUser: any)=> void
}

const useUser = create<UserState>((set)=> ({
    user: null,
    setUser: ()=> set((newUser:any)=> ({user:newUser}))
}));

export default useUser;
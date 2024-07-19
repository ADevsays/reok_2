import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from "zustand";

interface PlanState {
    plate: string | number,
    rut: string | number,
    currentCameraId: number,
    timer:number,
    setTimer: (timer:number) => void;
    setPlate: (newPlate:string) => void;
    setCurrentCameraId: (index:number) => void;    
    setRUT: (newRUT:string) => void;
}

const usePlateRUT = create(
    persist<PlanState>(
        (set)=>({
            plate: "",
            rut: "",
            currentCameraId: -1,
            timer:0,
            setTimer: (timer)=> set({timer:timer}),
            setCurrentCameraId: (index)=> set({currentCameraId:index}),
            setPlate: (newPlate)=> set({plate:newPlate}),
            setRUT: (newRUT)=> set({rut:newRUT}),
        }),
        {
            name: 'plate-rut', 
            storage: createJSONStorage(()=> localStorage), 
        }    
    )
);

export default usePlateRUT;
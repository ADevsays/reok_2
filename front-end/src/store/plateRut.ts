import { create } from "zustand";

interface PlanState {
    plate: string | number,
    rut: string | number,
    setPlate: (newPlate:string) => void;
    setRUT: (newRUT:string) => void;
}

const usePlateRUT = create<PlanState>(
    (set)=>({
        plate: "",
        rut: "",
        setPlate: (newPlate)=> set({plate:newPlate}),
        setRUT: (newRUT)=> set({rut:newRUT}),
    })
);

export default usePlateRUT;
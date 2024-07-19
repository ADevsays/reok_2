import { create } from "zustand";

interface Plan{
    id:number, 
    price:number
};

interface PlanState {
    currentPlan: null | Plan;
    setCurrentPlan: (newPlan: Plan) => void;
}

const usePlan = create<PlanState>(
    (set)=>({
        currentPlan: null,
        setCurrentPlan: (newPlan)=> set({currentPlan:newPlan})
    })
);

export default usePlan;
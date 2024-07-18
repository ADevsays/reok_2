import { create } from "zustand";

interface Plan{
    id:number, 
    type:string
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
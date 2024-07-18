import { useState } from "react";
import CarIcons from "./CarIcons";
import Plan from "./Plan";
import usePlan from "../../store/plan";
import { useNavigate } from "react-router-dom";


function ContainerPlans() {
    const [updateIndex, setUpdateIndex] = useState(0);
    const {setCurrentPlan} = usePlan();
    const navigate = useNavigate();

    const washTypes = [
        { id: 1, type: "basic"},
        { id: 2, type: "detail"},
        { id: 3, type:"express"}
    ];

    const nextPage = ()=>{
        const plan = washTypes.find(type=> type.id === updateIndex);
        if(!plan) return;
        setCurrentPlan(plan);
        console.log(plan);
        navigate("/");
    };

    return (
        <section className="rounded-lg relative px-12 w-[90%] max-w-[1020px] h-auto pb-6 border bg-white text-black shadow-xl">
            <h1 className="text-center font-bold text-3xl mt-10">Selecciona tu plan</h1>
            <div className="flex gap-8 justify-center items-center mt-12 ">
                <Plan 
                    name="Lavado básico" 
                    description="Incluye lavado exterior y secado manual. Es un servicio rápido y económico."
                    Icon={<CarIcons index={1}/>}
                    price={12.00}
                    id={1}
                    updateIndex={setUpdateIndex}
                    currentIndex={updateIndex}
                    />
                <Plan 
                    name="Lavado Detallado" 
                    description="Incluye lavado exterior y aspirado interior, limpieza de ventanas y tablero."
                    Icon={<CarIcons index={2}/>}
                    price={22.00}
                    id={2}
                    updateIndex={setUpdateIndex}
                    currentIndex={updateIndex}
                    />
                <Plan 
                    name="Lavado Express" 
                    description="Un servicio ultra rápido que se concentra en el lavado exterior y secado rápido."
                    Icon={<CarIcons index={3}/>}
                    price={9.99}
                    id={3}
                    updateIndex={setUpdateIndex}
                    currentIndex={updateIndex}
                    />
            </div>
            <div className="w-full flex justify-center mt-12">
                <button 
                    disabled={updateIndex === 0}
                    onClick={nextPage}
                    className={`${updateIndex === 0 ? "opacity-55" : "opcity-100"} bg-yellow-400 text-black p-1 px-12 rounded-lg font-semibold`}>
                        Siguiente
                </button>
            </div>
        </section>
    );
}

export default ContainerPlans;
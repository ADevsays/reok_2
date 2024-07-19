import { useEffect, useState } from "react";
import usePlateRUT from "../../store/plateRut";
import BalanceStats from "../Stats/BalanceStats";
import CarPill from "./CarPill";
import getRutuser from "../../services/Plate/getRUTuser";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import useOrders from "../../store/cars";
import getOrders from "../../services/User/getOrders";
import OrderStats from "../Stats/OrdersStats";

function BodyDashboard() {
    const {rut} = usePlateRUT();
    const {setOrders, orders} = useOrders();
    const [totalIncome, setTotalIncome] = useState(0);

    const [currentCar, setCurrentCar] = useState({
        plate_number:"",
        rut:"",
        username:"",
        status:""
    });

    const states:any = {
        "ENTERED": "Iniciando lavado",
        "WASHING": "Lavado",
        "FINISHED": "De Salida",
        "EXIT": "Esperando siguiente auto"
    }
    
    useEffect(()=>{
        const getUser = async ()=>{
            const currentCar = await getRutuser(rut as string);
            if(currentCar.error) return toast.error("Ha habido un error")
            setCurrentCar(currentCar.success);
            const orders = await getOrders();
            if(orders.error) return toast.error("Hubo un error");
            setOrders(orders.success.orders)         
        };

        getUser();
        
        const totalIncome = orders
        .map(order => parseFloat(order.price).toFixed(2))  
        .map(price => parseFloat(price))  
        .reduce((acc, sum) => acc + sum, 0);   

        const roundedTotalIncome = parseFloat(totalIncome.toFixed(2));
        
        setTotalIncome(roundedTotalIncome);
    }, [])

    return (
        <section className="p-6 sm:ml-64">
            <div className="grid grid-cols-3 gap-8 mb-4 text-black">
                <div className="flex  p-8 gap-3 flex-col items-start justify-center h-40 rounded bg-white">
                    <p className="text-3xl text-black font-medium">
                        {orders ? orders.length : 0}
                    </p>
                    <span className="block text-sm text-gray-800">Vehículos totales día</span>
                    <a href="" className="text-red-500 font-semibold">Ver</a>
                </div>
                <div className="flex  p-8 gap-3 flex-col items-start justify-center h-40 rounded bg-white">
                    <p className="text-3xl text-black font-medium">
                        1
                    </p>
                    <span className="block text-sm text-gray-800">Vehículos pendientes</span>
                    <a href="" className="text-red-500 font-semibold">Ver</a>
                </div>
                <div className="flex  p-8 gap-3 flex-col items-start justify-center h-40 rounded bg-white">
                    <p className="text-3xl text-black font-medium">
                        {states[currentCar.status] ?? "No hay auto"}
                    </p>
                    <span className="block text-sm text-gray-800">Estado Vehículo Actual</span>
                    <Link to="/employee/camaras_view" className="text-red-500 font-semibold">Ver</Link>
                </div>
            </div>
            <div className="col-span-2 flex flex-col items-start justify-center h-80 my-6 rounded bg-white w-full">
                <div className="px-8 mb-4">
                    <h3 className="font-normal text-xl">Vehículos ingresados hoy</h3>
                    <p className="text-2xl font-bold ">{orders ? orders.length : 0} <span className="font-semibold text-green-500 text-base">+$5%</span></p>
                </div>
                <OrderStats orders={orders}/>
            </div>
            <div className="flex items-center justify-between h-56 my-6 rounded bg-white text-black overflow-hidden">
                {
                currentCar &&
                <div className="p-8 space-y-3">
                    <h3 className="text-3xl font-bold">Vehículo actual</h3>
                    <p className="text-gray-800">Matrícula: <span className="text-black font-bold">{currentCar.plate_number}</span></p>
                    <p className="text-gray-800">Propietario: <span className="text-black font-bold">{currentCar.username}</span></p>
                    <p className="text-gray-800">RUT Propietario: <span className="text-black font-bold">{currentCar.rut}</span></p>
                </div>

                }
                <div className="max-w-[420px] opacity-90">
                    <img className="size-full" src="/media/washing gif.gif" alt="Gif washing" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-4">
                <div className="flex  p-8 gap-3 flex-col items-start justify-center h-40 rounded bg-white">
                    <p className="text-3xl text-black font-medium">
                        ${totalIncome}
                    </p>
                    <span className="block text-sm text-gray-800">Ingresos día</span>
                    <a href="" className="text-red-500 font-semibold">Ver</a>
                </div>
                <div className="flex  p-8 gap-3 flex-col items-start justify-center h-40 rounded bg-white">
                    <p className="text-3xl text-black font-medium">
                        ${totalIncome}
                    </p>
                    <span className="block text-sm text-gray-800">Ingresos mes</span>
                    <a href="" className="text-red-500 font-semibold">Ver</a>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-8 my-6">
                <div className="col-span-2 flex flex-col items-start justify-center h-80  rounded bg-white w-full">
                    <div className="px-8 mb-4">
                        <h3 className="font-normal text-xl">Balance mensual</h3>
                        <p className="text-2xl font-bold ">${totalIncome} USD <span className="font-semibold text-green-500 text-base">+$5%</span></p>
                    </div>
                    <BalanceStats orders={orders}/>
                </div>
                <div className="p-8 rounded bg-white h-full">
                    <h3 className="font-bold text-2xl">Ventas mes</h3>
                    <CarPill
                        indexCar={0}
                        price={12}
                        time="12:00"
                    />
                    <CarPill
                        indexCar={2}
                        price={12}
                        time="12:00"
                    />
                    <CarPill
                        indexCar={1}
                        price={12}
                        time="12:00"
                    />
                </div>
            </div>    
        </section>
    );
}

export default BodyDashboard;
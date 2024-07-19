import BalanceStats from "../Stats/BalanceStats";
import CarPill from "./CarPill";

function BodyDashboard() {
    return (
        <section className="p-6 sm:ml-64">
            <div className="grid grid-cols-3 gap-8 mb-4 text-black">
                <div className="flex  p-8 gap-3 flex-col items-start justify-center h-40 rounded bg-white">
                    <p className="text-3xl text-black font-medium">
                        17
                    </p>
                    <span className="block text-sm text-gray-800">Vehículos totales día</span>
                    <a href="" className="text-red-500 font-semibold">Ver</a>
                </div>
                <div className="flex  p-8 gap-3 flex-col items-start justify-center h-40 rounded bg-white">
                    <p className="text-3xl text-black font-medium">
                        2
                    </p>
                    <span className="block text-sm text-gray-800">Vehículos pendientes</span>
                    <a href="" className="text-red-500 font-semibold">Ver</a>
                </div>
                <div className="flex  p-8 gap-3 flex-col items-start justify-center h-40 rounded bg-white">
                    <p className="text-3xl text-black font-medium">
                        Lavado
                    </p>
                    <span className="block text-sm text-gray-800">Estado Vehículo Actual</span>
                    <a href="" className="text-red-500 font-semibold">Ver</a>
                </div>
            </div>
            <div className="col-span-2 flex flex-col items-start justify-center h-80 my-6 rounded bg-white w-full">
                <div className="px-8 mb-4">
                    <h3 className="font-normal text-xl">Vehículos ingresados hoy</h3>
                    <p className="text-2xl font-bold ">17 <span className="font-semibold text-green-500 text-base">+$5%</span></p>
                </div>
                <BalanceStats/>
            </div>
            <div className="flex items-center justify-between h-56 my-6 rounded bg-white text-black overflow-hidden">
                <div className="p-8 space-y-3">
                    <h3 className="text-3xl font-bold">Vehículo actual</h3>
                    <p className="text-gray-800">Matrícula: <span className="text-black font-bold">123</span></p>
                    <p className="text-gray-800">Propietario: <span className="text-black font-bold">Juan</span></p>
                    <p className="text-gray-800">RUT Propietario: <span className="text-black font-bold">12223</span></p>
                </div>
                <div className="max-w-[420px] opacity-90">
                    <img className="size-full" src="/media/washing gif.gif" alt="Gif washing" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-4">
                <div className="flex  p-8 gap-3 flex-col items-start justify-center h-40 rounded bg-white">
                    <p className="text-3xl text-black font-medium">
                        $170.00
                    </p>
                    <span className="block text-sm text-gray-800">Ingresos día</span>
                    <a href="" className="text-red-500 font-semibold">Ver</a>
                </div>
                <div className="flex  p-8 gap-3 flex-col items-start justify-center h-40 rounded bg-white">
                    <p className="text-3xl text-black font-medium">
                        $200.00
                    </p>
                    <span className="block text-sm text-gray-800">Ingresos mes</span>
                    <a href="" className="text-red-500 font-semibold">Ver</a>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-8 my-6">
                <div className="col-span-2 flex flex-col items-start justify-center h-80  rounded bg-white w-full">
                    <div className="px-8 mb-4">
                        <h3 className="font-normal text-xl">Balance mensual</h3>
                        <p className="text-2xl font-bold ">$2000 USD <span className="font-semibold text-green-500 text-base">+$5%</span></p>
                    </div>
                    <BalanceStats/>
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
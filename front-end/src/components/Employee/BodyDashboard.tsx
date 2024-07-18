function BodyDashboard() {
    return (
        <div className="p-6 sm:ml-64">

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
        <div className="flex items-center justify-center h-80 my-6 rounded bg-white">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
                
            </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded bg-white h-28">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                    </svg>
                </p>
            </div>
            <div className="flex items-center justify-center rounded bg-white h-28">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                    </svg>
                </p>
            </div>
            <div className="flex items-center justify-center rounded bg-white h-28">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                    </svg>
                </p>
            </div>
            <div className="flex items-center justify-center rounded bg-white h-28">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                    </svg>
                </p>
            </div>
        </div>
    </div>
    );
}

export default BodyDashboard;
function VisualizerState({state}:{state:number}) {
    return (
        <div className="w-full flex border-gray-500 rounded border relative top-[-60px]">
            <span className={`w-[33%] block h-1 ${state === 1 ? "bg-blue-600" : "bg-white"}`}></span>
            <span className={`w-[33%] block h-1 ${state === 2 ? "bg-blue-600" : "bg-white"}`}></span>
            <span className={`w-[34%] block h-1 ${state === 3 ? "bg-blue-600" : "bg-white"}`}></span>
        </div>
    );
}

export default VisualizerState;
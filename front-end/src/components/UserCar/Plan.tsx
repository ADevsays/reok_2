interface Props{
    name:string, 
    description:string, 
    Icon: React.ReactNode
    price:number,
    id:number,
    updateIndex: (id:number)=> void,
    currentIndex:number
}

function Plan({name, description, Icon, price, id, updateIndex, currentIndex}:Props) {
    
    return (
        <div
            onClick={()=> updateIndex(id)} 
            className={`cursor-pointer relative shadow-lg rounded-lg p-3 flex flex-col items-center border-2 max-w-[300px] ${currentIndex === id ? "opacity-100" : "opacity-65"}`}>
            <h3 className="font-extrabold text-2xl text-blue-500 my-2">{name}</h3>
            <p>{description}</p>
            <div className="text-xs">
                {Icon}
            </div>
            <span className="absolute bottom-0 right-0 font-bold bg-yellow-400 p-2 rounded-t-lg rounded-e-none">${price}</span>
        </div>    
    );
}

export default Plan;
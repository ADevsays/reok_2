import { useEffect } from "react";
import { toast } from "sonner";
import CarPill from "../Employee/CarPill";
import getOrders from "../../services/User/getOrders";
import useOrders from "../../store/cars";

function VisualCars() {
    const {orders, setOrders} = useOrders();

    useEffect(() => {
        const getQueque = async ()=>{
            const result = await getOrders();
            if(result.error) return toast.error("Hubo un error");
            setOrders(result.success.orders)
            console.log(orders)
        }
        getQueque();
    }, []);

    return (
        <section className="p-6 sm:ml-64">
            <div className="bg-white">
                {
                    orders.map((order:any)=> (
                        <CarPill 
                            indexCar={Math.floor(Math.random() * 3)}
                            time={order.duration}
                            price={order.price}
                            />
                    ))
                }
            </div>
        </section>
    );
}

export default VisualCars;
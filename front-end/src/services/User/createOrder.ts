import { processError } from "../../helpers/processErrors";
import { baseURL } from "../url";

export default async function crateOrder(orderData:{rut:string, price:number, duration:number}){
    try {
        const response = await fetch(`${baseURL}/api/set_order/`, {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });
        const order = await response.json();
        if(order.error){
            throw new Error(processError(order.error));
        }
        return {success: order};
    } catch (error:any) {
        return { error: error.message };
    }
}
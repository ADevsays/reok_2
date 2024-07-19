import { processError } from "../../helpers/processErrors";
import { baseURL } from "../url";

export default async function getOrders(){
    try {
        const response = await fetch(`${baseURL}/api/get_all_orders/`);
        const order = await response.json();
        if(order.error){
            throw new Error(processError(order.error));
        }
        return {success: order};
    } catch (error:any) {
        return { error: error.message };
    }
}
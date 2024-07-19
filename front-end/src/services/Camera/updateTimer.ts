import { processError } from "../../helpers/processErrors";
import { baseURL } from "../url";

export default async function udpateTimer(timerData:{rut:string, time:number}){
    try {
        const response = await fetch(`${baseURL}/api/update_timer/`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(timerData),
            credentials: "include"
        });

        if(!response.ok){
            throw new Error("Parece que hubo un error");
        };
        
        const timerResult = await response.json();
        if(timerResult.error){
            throw new Error(processError(timerResult.error));
        };
     
        return {success: timerResult};
    } catch (error:any) {
        return { error: error.message };
    }
}
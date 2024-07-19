import { processError } from "../../helpers/processErrors";
import { baseURL } from "../url";

export default async function changeStatus(statusData:{rut:string, status:string}){
    try {
        const response = await fetch(`${baseURL}/api/update_status/`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(statusData),
            credentials: "include"
        });

        if(!response.ok){
            throw new Error("Parece que hubo un error");
        };
        
        const statusResult = await response.json();
        if(statusResult.error){
            throw new Error(processError(statusResult.error));
        };
     
        return {success: statusResult};
    } catch (error:any) {
        return { error: error.message };
    }
}
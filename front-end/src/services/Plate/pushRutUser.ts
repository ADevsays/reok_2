import { processError } from "../../helpers/processErrors";
import { baseURL } from "../url";

export default async function pushRutUser(plateData:{rut:string, plate_number:string, state:string}){
    try {
        const response = await fetch(`${baseURL}/api/push_rut/`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plateData)
        });

        if(!response.ok){
            throw new Error("Parece que hubo un error");
        };
        
        const plateResult = await response.json();
        if(plateResult.error){
            throw new Error(processError(plateResult.error));
        };
     
        return {success: plateResult};
    } catch (error:any) {
        return { error: error.message };
    }
}
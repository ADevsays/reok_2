import { processError } from "../../helpers/processErrors";
import { baseURL } from "../url";

export default async function logout(){
    try {
        const response = await fetch(`${baseURL}/api/logout/`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            credentials:"include"
        });

        if(!response.ok){
            throw new Error("Parece que hubo un error");
        };
        
        const userData = await response.json();
        if(userData.error){
            throw new Error(processError(userData.error));
        };
     
        return {success: userData};
    } catch (error:any) {
        return { error: error.message };
    }
}
import { processError } from "../../helpers/processErrors";
import { baseURL } from "../url";

export default async function getRutuser(rut:string){
    try {
        const response = await fetch(`${baseURL}/api/get_user/${rut}/`);

        if(!response.ok){
            throw new Error("Parece que hubo un error");
        };
        
        const userByRut = await response.json();
        if(userByRut.error){
            throw new Error(processError(userByRut.error));
        };
     
        return {success: userByRut};
    } catch (error:any) {
        return { error: error.message };
    }
}
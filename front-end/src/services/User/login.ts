import { processError } from "../../helpers/processErrors";
import { Login} from "../../interfaces/User/userInterfaces";
import { baseURL } from "../url";

export default async function login(loginData:Login){
    try {
        const response = await fetch(`${baseURL}/api/login/`, {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(loginData)
        });

        if(!response.ok){
            throw new Error("Parece que hubo un error con tus credenciales.");
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
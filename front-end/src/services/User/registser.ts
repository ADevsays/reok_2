import { processError } from "../../helpers/processErrors";
import { Register } from "../../interfaces/User/userInterfaces";
import { baseURL } from "../url";

export default async function register(registerData:Register){
    try {
        const response = await fetch(`${baseURL}/api/register/`, {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerData)
        });
        const userData = await response.json();
        if(userData.error){
            throw new Error(processError(userData.error));
        }
        return {success: userData};
    } catch (error:any) {
        return { error: error.message };
    }
}
import { ChangeEvent, FormEvent, useState } from "react";
import { Register } from "../../interfaces/User/userInterfaces";
import register from "../../services/User/registser";
import { toast } from "sonner";
import useUser from "../../store/loggin";
import { Link, useNavigate } from "react-router-dom";

function FormRegister() {
    const baseData: Register = {
        username: "",
        password1: "",
        password2: "",
        first_name: "",
        last_name: "",
        rut: ""
    }
    const [userData, setUserData] = useState(baseData);
    const {setUser} = useUser();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData(({
            ...userData,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const regex = /^\d{8}-\d$/;
        if(!regex.test(userData.rut)){
            return toast.error("Ingresa un RUT válido");
        }
        const result = await register(userData);
        if(result.error) return toast.error(result.error);
        toast.success("¡Usuario creado correctamente!");
        setUser(result.success);
        setTimeout(()=>{
            const pathNavigate = result.success.is_employee ? "/employee" : "/plan"
            navigate(pathNavigate);
        }, 3000)
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-0">
            <div className="relative z-0 w-full mb-5 group">
                <input
                    onChange={handleChange}
                    type="text" name="username" id="username" className="block py-2.5 px-0 w-full text-sm text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label 
                    htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre de usuario</label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onChange={handleChange}
                        type="text" name="first_name" id="first_name" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="first_name" className="peer-focus:font-medium absolute text-sm  text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombres</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onChange={handleChange}
                        type="text" name="last_name" id="last_name" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellidos</label>
                </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    onChange={handleChange}
                    type="text" name="rut" id="floating_rut" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_rut" className="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Rut</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    onChange={handleChange}
                    type="password" name="password1" id="password1" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="password1" className="peer-focus:font-medium absolute text-sm  dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    onChange={handleChange}
                    type="password" name="password2" id="password2" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="password2" className="peer-focus:font-medium absolute text-sm  dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirmar Contraseña</label>
            </div>

            <div className="w-full mt-3 flex justify-center">
                <button
                    type="submit"
                    className="text-black font-semibold bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg text-sm w-full sm:w-auto px-12 py-2.5 text-center dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-yellow-600"
                >
                    Registrarse
                </button>
            </div>
            <Link className="text-xs text-center w-full block mt-8 text-blue-500" to={"/login"}>¿Ya tienes cuenta?</Link>

        </form>
    );
}

export default FormRegister;
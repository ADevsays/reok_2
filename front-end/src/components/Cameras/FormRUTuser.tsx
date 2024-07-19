import { ChangeEvent, useState } from "react";

function FormRUTuser({handler}:{handler: (rut:string)=>void}) {
    const [RUT, setRUT] = useState("");
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const regex = /^\d{8}-\d$/;
        if(regex.test(RUT)){
            handler(RUT);
        }else{
            alert("Escribe un RUT Válido");
        }
    };

    return (
        <form className="w-full mt-8" onSubmit={handleSubmit}>
            <label className="font-medium text-xl">RUT del Propietario:</label>
            <input
                onInput={(e:ChangeEvent<HTMLInputElement>)=>setRUT(e.target?.value)} 
                className="mt-3 w-full p-2 rounded-lg" type="text" placeholder="Ingresa el RUT del propietario del vehículo" />
            <button className="mt-3 font-semibold">Enviar</button>
        </form>
    );
}

export default FormRUTuser;
import Video from "../../components/UI/Video";
import FormRegister from "../../components/User/FormRegister";
import { logoURL } from "../../consts/mediaImports";
import { Toaster} from 'sonner';

import "../../styles/basics.css";

function Register() {
    
    return (
        <>        
            <Video/>
            <Toaster  richColors/>
            <div className="overlay">
                <div className="content container">
                    <div className="card mb-2 position-absolute top-50 start-50 translate-middle rounded">
                        <div className="card-body text-white pb-12">
                            <img src={logoURL} alt="Logo" width="40%" className="rounded mx-auto d-block"/>
                            <h3 className="card-title font-bold w-full text-center">Crear cuenta</h3>
                            <FormRegister/>
                        </div>
                    </div>
                </div> 
            </div> 
        </>
    );
}

export default Register;
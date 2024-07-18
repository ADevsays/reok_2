import { useNavigate } from "react-router-dom";
import logout from "../../services/User/logout";
import useUser from "../../store/loggin";

function HeaderClose() {
    const {clearUser} = useUser();
    const navigate = useNavigate();

    const closeSession = ()=>{
        logout();
        clearUser();
        navigate("/login");
    };

    return (
        <header className="w-full bg-black py-4 flex justify-end pe-3">
            <button onClick={closeSession} className="relative ms-auto bg-white text-black rounded-lg p-1 px-3 font-medium">Cerrar Sesión</button>
        </header>
    );
}

export default HeaderClose;
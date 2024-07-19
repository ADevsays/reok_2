import { useEffect, useState } from "react";
import useUser from "../../store/loggin";
import Profile from "../UI/Profile";
import TimerWash from "./TimerWash";
import VisualizerState from "./VisualizerState";
import WaveAnimate from "./WaveAnimate";
import getRutuser from "../../services/Plate/getRUTuser";
import { toast } from "sonner";
import { DetailPlate } from "../../interfaces/User/plateInterfaces";
import { Link } from "react-router-dom";

function CarState() {
    const { user } = useUser();
    const [details, setDetails] = useState<DetailPlate>({ plate_number: "", status: "", timer:0});

    useEffect(() => {
        const getPlate = async () => {
            const userDetail = await getRutuser(user?.rut as string);
            console.log(userDetail)
            if (userDetail.error) return toast.error("Ha habido un error");
            setDetails(userDetail.success as DetailPlate);
        }
        getPlate();
    }, []);

    const states: any = {
        "NO_CLIENT": ["Su auto NO se encuentra en nuestras instalaciones", -1],
        "ENTERED": ["Entrando a nuestras instalaciones...", 1],
        "WASHING": ["En proceso de lavado", 2],
        "FINISHED": ["En proceso de salida, lo esperamos. 😊", 3],
        "EXIT": ["Su auto ha sido despachado, ¡Gracias por confiar en nosotros!", 4]
    }

    const getState = () => {
        return states[details.status] ?? [null, null];
    }

    return (
        <section className="rounded-lg relative w-[420px] h-[730px] border bg-white text-black shadow-xl">
            <div className="p-4">
                {user &&
                    <Profile
                        username={user?.username}
                        lastName={user?.last_name}
                        firstName={user?.first_name}
                        rut={user?.rut} />
                }

                {
                    getState()[1] !== -1 &&
                    <div className="w-full relative">
                        <img src={`/public/media/state${getState()[1] ?? ""}.png`} alt="" />
                    </div>
                }
                {getState()[1] !== -1 && getState()[1] !== 4 && <VisualizerState state={getState()[1] ?? ""} />}
                <div className="text-center mb-12">
                    {(getState()[1] !== -1 && getState()[1] !== 4)&& <p className="text-2xl font-bold tracking-tighter">Su auto se encuentra</p>}
                    <h3 className="text-yellow-400 font-bold text-3xl my-4">{getState()[0] ?? ""}</h3>
                    <small className="font-medium text-base">{details.plate_number}</small>
                </div>
                {
                    getState()[1] === 1  ?
                    <p className="text-center">Agradecemos por su espera</p> :
                    <TimerWash timer={details.timer}/>
                }
                <div className="w-full relative z-[999] flex justify-center mt-12">
                    <Link to="/plan" className="font-semibold text-white p-2 px-12 text-sm rounded-lg bg-blue-500 hover:bg-blue-400">Cambiar plan</Link>
                </div>
            </div>
            <WaveAnimate />
        </section>
    );
}

export default CarState;
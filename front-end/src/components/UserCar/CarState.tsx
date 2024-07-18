import useUser from "../../store/loggin";
import Profile from "../UI/Profile";
import TimerWash from "./TimerWash";
import VisualizerState from "./VisualizerState";
import WaveAnimate from "./WaveAnimate";

function CarState() {
    const { user } = useUser();
    return (
        <section className="rounded-lg relative w-[420px] h-[680px] border bg-white text-black shadow-xl">
            <div className="p-4">
                {user &&
                    <Profile
                        username={user?.username}
                        lastName={user?.last_name}
                        firstName={user?.first_name}
                        rut={user?.rut} />
                }
                
                <div className="w-full relative">
                    <img src="/public/media/state3.png" alt="" />
                </div>

                <VisualizerState state={3}/>
                <div className="text-center mb-12">
                    <p className="text-2xl font-bold tracking-tighter">Su auto se encuentra</p>
                    <h3 className="text-yellow-400 font-bold text-3xl">En proceso de Lavado</h3>
                </div>
                <TimerWash/>
                <div className="w-full relative z-[999] flex justify-center mt-12">
                    <button className="font-semibold text-white p-2 px-12 text-sm rounded-lg bg-blue-500 hover:bg-blue-400">Ver Informe</button>
                </div>
            </div>
            <WaveAnimate/>
        </section>
    );
}

export default CarState;
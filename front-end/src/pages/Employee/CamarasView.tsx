import { useEffect, useRef, useState } from "react";
import Dashboard from "../../Layouts/Dashbord";
import plateDetector from "../../services/Camera/plateDetector";
import usePlateRUT from "../../store/plateRut";
import AcceptPlate from "../../components/Cameras/AcceptPlate";
import FormRUTuser from "../../components/Cameras/FormRUTuser";
import pushRutUser from "../../services/Plate/pushRutUser";
import { toast } from "sonner";
import changeStatus from "../../services/Plate/changeStatus";
import Timer from "../../components/Cameras/Timer";
import udpateTimer from "../../services/Camera/updateTimer";

function CamarsView() {
    const [cameras, setCameras] = useState([] as MediaDeviceInfo[]);
    const [userName, setUserName] = useState("");
    const [haveRut, setHaveRut] = useState(false);
    const [init, setInit] = useState(false);
    const [confirmPlate, setConfirmPlate] = useState(false);
    const [timerRunning, setTimerRunning] = useState(false);
    const [btnState, setbtnState] = useState(0);

    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const currentVideoState = useRef<HTMLVideoElement | null>(null);
    const streamsRef = useRef<(MediaStream | null)[]>([]);

    const { setPlate,
            setRUT, 
            setCurrentCameraId,
            setTimer,
            plate, 
            rut, 
            currentCameraId,
            timer} = usePlateRUT();

    const camerasDetails = [
        { type: "Lector de la patente", endpoint: () => { } },
        { type: "En lavado", endpoint: () => { } },
        { type: "Salida del auto", endpoint: () => { } },
    ];

    const states = ["Ingresar nuevo auto", "Siguiente paso", "Siguiente paso", "Finalizar lavado"];

    useEffect(() => {
        const getCameras = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videDevices = devices.filter(device => device.kind === "videoinput");
                if (videDevices.length > 0)
                    setCameras(videDevices);
            } catch (error) {
                console.error(error);
            }
        }
        getCameras();

        return () => {
            streamsRef.current.forEach(stream => {
                if (!stream) return;
                stream.getTracks().forEach(track => track.stop());
                console.log("stop!")
            })
        }
    }, [])

    useEffect(() => {
        if (!cameras) return;

        const startCameras = async () => {
            const streams = await Promise.all(cameras.map(async (cam) => navigator.mediaDevices.getUserMedia({ video: { deviceId: cam.deviceId } })));
            streams.forEach((stream, index) => {
                const currentStream = videoRefs.current[index]
                if (!currentStream) return;
                currentStream!.srcObject = stream;
                currentStream!.play();
            });
            streamsRef.current = streams;
        };

        const Inicialize = async()=>{
            await startCameras();

            const currentStream = streamsRef.current[currentCameraId];
            const videoEl = currentVideoState.current;
            if (!videoEl) return;
            videoEl!.srcObject = currentStream;
            videoEl!.play();    
            setbtnState(currentCameraId + 1)
            console.log(currentCameraId)
            setInit(currentCameraId === 0 && (!confirmPlate))
        }

        Inicialize();

    }, [cameras]);

    useEffect(() => {

        const currentStream = streamsRef.current[currentCameraId];
        const videoEl = currentVideoState.current;
        if (!videoEl) return;
        videoEl!.srcObject = currentStream;
        videoEl!.play();

        setInit(currentCameraId === 0);

        const fetchStatus = async (status:string)=>{
            const result = await changeStatus({
                rut: rut as string, 
                status
            });
            if(result.error) return toast.error("Ha habido un error");
            console.log(result)
        };

        const fetchTimer = async ()=>{
            console.log(timer)
            const result = await udpateTimer({
                rut: rut as string, 
                time:timer
            });
            if(result.error) return toast.error("Ha habido un error");
            console.log(result)
        };

        if(currentCameraId === 1){
            fetchStatus("WASHING");
            fetchTimer();
        }
        if(currentCameraId === 2){
            fetchStatus("FINISHED");
            fetchTimer();
        }
        if(currentCameraId === 3){
            fetchStatus("EXIT");
            setRUT("");
            setPlate("");
            setCurrentCameraId(-1);
            setTimer(0);
            setUserName("");
            setHaveRut(false);
            setConfirmPlate(false);
            setbtnState(0)
            setTimerRunning(false);
            fetchTimer();
        }
    

    }, [currentCameraId]);

    useEffect(() => {
        const currentStream = streamsRef.current[currentCameraId];

        const fetchPlate = async () => {
            if (!currentStream) return;
            const plate = await plateDetector(currentStream);
            if (typeof plate !== "string") return;
            if(plate) setPlate(plate);
        }

        if(haveRut){
            fetchPlate();
        }

    }, [haveRut]);


    const handleChangeState = () => {
        if(init) return;
        if (currentCameraId < 3) {
            setCurrentCameraId(currentCameraId + 1);
        }
        setbtnState((btn) => (btn + 1) % states.length);

    };

    const handleAgainPlate = async () => {
        const currentStream = streamsRef.current[currentCameraId];
        setPlate("");
        if (!currentStream) return;
        const plate = await plateDetector(currentStream);
        setPlate(plate as string);
    }

    const handleSubmitRUT = async (rut: string) => {
        const plateData = {
            rut:rut as string,
            plate_number: "",
            state: "ENTERED"
        };
        const plateResult = await pushRutUser(plateData);
        if (plateResult.error) return toast.error("Ha habido un error con el RUT");
        setRUT(rut);
        setInit(false);
        setHaveRut(true);
    };

    const handleConfirmPlate = async ()=>{
        setConfirmPlate(true);
        const plateData = {
            rut:rut as string,
            plate_number: plate as string,
            state: "ENTERED"
        };
        const plateResult = await pushRutUser(plateData);
        if (plateResult.error) return toast.error("Ha habido un error con el RUT");
        setUserName(plateResult.success.username);
        setTimerRunning(true);
    }

    return (
        <Dashboard>
            <section className="p-6 sm:ml-64">
                <div className="flex text-center justify-center gap-8">
                    {cameras &&
                        cameras.map(({ deviceId }, index) => (
                            <div className="w-full flex flex-col items-center justify-center">
                                <video
                                    className="rounded-lg"
                                    key={deviceId}
                                    ref={el => videoRefs.current[index] = el}
                                    autoPlay />
                                <h3 className="mt-3 font-medium">{camerasDetails[index].type}</h3>
                            </div>
                        ))
                    }
                </div>

                <div className="w-full flex justify-center mt-9">
                    <button
                        onClick={handleChangeState}
                        disabled={(currentCameraId !== -1 && !plate)}
                        className={`${(currentCameraId !== -1 && !plate) ? "opacity-60" : "opacity-100"} bg-yellow-400 text-black font-semibold p-2 px-3 rounded-lg hover:bg-yellow-300`}>
                        {states[btnState]}
                    </button>
                </div>

                <div className="mt-6 w-full flex justify-center">
                    <video className="rounded-lg" ref={currentVideoState} />
                </div>

                {((haveRut || rut) && plate) ?
                    <AcceptPlate
                        username={userName}
                        confirmPlate={confirmPlate}
                        rut={rut as string}
                        handleContinue={handleConfirmPlate}
                        handleAgain={handleAgainPlate}
                        plate={plate}
                    />
                    : haveRut && <p className="text-center w-full mt-4 font-medium">Leyendo matrícula...</p>
                } 
                {
                    (init && !plate) &&
                    <FormRUTuser handler={handleSubmitRUT} />
                }
                <Timer timerRunning={timerRunning}/>
            </section>
        </Dashboard>
    );
}

export default CamarsView;
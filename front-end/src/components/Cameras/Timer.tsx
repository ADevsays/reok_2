import { useEffect } from "react";
import formatTime from "../../helpers/formatTime";
import usePlateRUT from "../../store/plateRut";

interface Props{
    timerRunning:boolean,
}

function Timer({timerRunning}:Props) {
    const {setTimer, timer} = usePlateRUT();
    useEffect(() => {
        let intervalReference: number | undefined = undefined;

        if (!timerRunning) {
            if (intervalReference) {
                clearInterval(intervalReference);
            }
            return;
        }

        intervalReference = setInterval(() => {
            setTimer(timer + 1);
        }, 1000);

        return () => clearInterval(intervalReference);
    }, [timerRunning, timer, setTimer]);

    return (
        <>
            {timerRunning  && <h4 className="w-full text-right h-12 font-medium text-2xl mt-4 text-gray-600"><span className="text-base">Tiempo transcurrido:</span> {formatTime(timer)}</h4>}
        </>
    );
}

export default Timer;
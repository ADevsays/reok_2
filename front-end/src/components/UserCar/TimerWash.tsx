import { useState, useEffect } from 'react';

function TimerWash({timer}:{timer:number}) {
    const [timeLeft, setTimeLeft] = useState(timer); 


    useEffect(() => {
        setTimeLeft(timer);

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timerId); 
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [timer]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div>
            <h4 className='text-center font-semibold text-sm'>
                Tiempo aproximado de lavado <span className='text-blue-500'> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span> 
            </h4>
        </div>
    );
}

export default TimerWash;

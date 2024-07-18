import { useState, useEffect } from 'react';

function TimerWash() {
    const [timeLeft, setTimeLeft] = useState(300); 

    useEffect(() => {
        if (timeLeft === 0) return;
        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId); 
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div>
            <h4 className='text-center font-semibold text-sm'>
                Tiempo aproximado para la siguiente fase: <span className='text-blue-500'> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span> 
            </h4>
        </div>
    );
}

export default TimerWash;

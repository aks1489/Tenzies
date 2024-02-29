import { useEffect, useState } from "react";

export default function Timer(props) {
    const [ sec, setSec ] = useState(0)
    const [ isRunning, setIsRunning ] = useState(false)

    useEffect(() => {
        let intervalId;

        if (isRunning && sec < 59 * 60) {
            intervalId = setInterval(() => {
                setSec(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isRunning])

    if(props.timer){
        setIsRunning(true)
    }else{
        setIsRunning(false)
    }

    return(
        <h2 className="stats">{sec}</h2>
    )

}
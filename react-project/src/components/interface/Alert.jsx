import { useStateContext } from "../../contexts/ContextProvider";
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useState, useEffect } from 'react'

export default function Alert(props) {
    const {alertMessage, setAlertMessage} = useStateContext();

    useEffect(() => {
        setTimeout(() => { setAlertMessage('') }, 5000); 
    }, [alertMessage]);

    return (
        <>
            { alertMessage && 
                <div className="
                    fixed 
                    z-50 
                    min-w-[500px] min-h-[100px] 
                    right-5 top-5 
                    rounded-lg
                    flex justify-left items-center 
                    text-body text-xl
                    bg-white
                    shadow-lg
                    border-2 border-body
                ">
                    <div className="text-5xl text-green flex justify-center w-1/6"><BsFillCheckCircleFill /></div> 
                    <span>{alertMessage}</span>
                </div>
            }
        </>
    )
}
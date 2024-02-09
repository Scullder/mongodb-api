'use client'

import { useStateContext } from "@/contexts/ContextProvider";
import Message from "./Message";
import { useEffect, useState } from "react";

export function MessageController() {
    const { alertMessage, setAlertMessage } = useStateContext();
    const [visible, setVisible] = useState(false) 

    useEffect(() => {
      if (Object.keys(alertMessage).length === 0) {
        setVisible(false)
      } else {
        setVisible(true)
          const timer = setTimeout(() => setAlertMessage({}), 5000)
          return () => clearTimeout(timer);
      }
      //const timer = setTimeout(() => setAlertMessage({}), 2000)
      //return () => clearTimeout(timer);

    }, [alertMessage]);
    
    /* console.log('MESSAGE CONTROLLER')
    console.log(alertMessage) */

    const close = () => {
      setAlertMessage({})
    }

    return (
      <>
        {visible &&
          <Message title={alertMessage.title} text={alertMessage.text} handleClose={close} status={alertMessage.status}></Message>
        }
      </>
    )
}
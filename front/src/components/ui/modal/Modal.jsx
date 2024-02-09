'use client'

import { useEffect, useRef } from "react";

export default function Modal(props) {
  useEffect(() => {
    if (props.isVisible) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'auto';
    }
  }, [])

  const handleVisability = (e) => {
    if (e.target !== e.currentTarget) {
      return false;
    }

    props.visabilityHandler(false);
  }

  return(
    <>
      {props.isVisible &&
        <div className="fixed z-40 w-screen h-screen overflow-y-hidden top-0 left-0">
          <div className="relative w-full h-full flex justify-center overflow-scroll bg-black/50" onClick={handleVisability}>
            <div className="absolute z-50 mt-16 min-w-[500px] min-h-[300px] pb-20">
              <div className=" bg-background rounded p-8">
                {props.children ?? 'Modal window'}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
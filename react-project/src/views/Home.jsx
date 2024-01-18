import { useState, useRef } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'
import Wallpaper from '../components/Wallpaper.jsx'
import { Input } from '../components/interface/Inputs.jsx'
import { Button } from '../components/interface/Buttons.jsx'

export default function Home() {

    const sliderItemClass = 'w-full h-14 rounded-lg bg-center bg-no-repeat';

    return (
        <div>
            <Wallpaper image="bg-body"/>

            <main className="container w-9/12 mx-auto text-gray-200 relative z-30">
                <div className="w-full h-[600px] bg-tile flex p-4 rounded gap-4">
                    <div className="w-1/3 space-y-2">
                        <div className={`${sliderItemClass} bg-[url('/img/slides/sl1.jpg')]`}></div>
                        <div className={`${sliderItemClass} bg-[url('/img/slides/sl2.jpg')]`}></div>
                        <div className={`${sliderItemClass} bg-[url('/img/slides/sl8.jpg')]`}></div>
                        <div className={`${sliderItemClass} bg-[url('/img/slides/sl4.jpg')]`}></div>
                        <div className={`${sliderItemClass} bg-[url('/img/slides/sl5.jpg')]`}></div>
                        <div className={`${sliderItemClass} bg-[url('/img/slides/sl6.jpg')]`}></div>
                        <div className={`${sliderItemClass} bg-[url('/img/slides/sl7.jpg')]`}></div>
                    </div>
                    <div className="w-2/3">
                        <img src="/img/sl3.jpg" className=" object-cover"/>
                    </div>
                </div>
            </main>
        </div>
    )

}

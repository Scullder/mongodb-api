import { useState, useRef } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'
import Wallpaper from '../components/Wallpaper.jsx'
import { Input } from '../components/interface/Inputs.jsx'
import { Button } from '../components/interface/Buttons.jsx'

export default function Blogs() {

    const sliderItemClass = 'w-full h-14 rounded-lg bg-center bg-no-repeat';
    /* const sliderItemClass = 'w-[50px] h-full rounded-lg bg-center bg-no-repeat'; */

    return (
        <div>
            <Wallpaper image="bg-body"/>

            <main className="container w-full mx-auto text-gray-200 relative z-30">
                <div className="w-full h-[600px] my-20 flex p-4 rounded gap-4">
                    <div className="w-[25%] space-y-2">
                        <div className={`${sliderItemClass} bg-[url('/img/slides/sl1.jpg')]`}></div>
                        <div className={`${sliderItemClass} bg-[url('/img/slides/sl2.jpg')]`}></div>
                        <div className={`${sliderItemClass} bg-[url('/img/slides/sl8.jpg')]`}></div>
                        <div className={`${sliderItemClass} bg-[url('/img/slides/sl4.jpg')]`}></div>
                        <div className={`${sliderItemClass} bg-[url('/img/slides/sl5.jpg')]`}></div>
                        <div className={`${sliderItemClass} bg-[url('/img/slides/sl6.jpg')]`}></div>
                        <div className={`${sliderItemClass} bg-[url('/img/slides/sl7.jpg')]`}></div>
                    </div>
                    <div className="w-[75%]">
                        <img src="/img/slides/sl3.jpg" assName=" object-cover"/>
                    </div>
                </div>

                {/* <div className="flex w-full h-[250px] space-x-2">
                    <div className={`${sliderItemClass} bg-[url('/img/slides/sl1.jpg')]`}></div>
                    <div className={`${sliderItemClass} bg-[url('/img/slides/sl2.jpg')]`}></div>
                    <div className={`${sliderItemClass} bg-[url('/img/slides/sl8.jpg')]`}></div>
                    <div className={`${sliderItemClass} bg-[url('/img/slides/sl4.jpg')]`}></div>
                    <div className={`${sliderItemClass} bg-[url('/img/slides/sl5.jpg')]`}></div>
                    <div className={`${sliderItemClass} bg-[url('/img/slides/sl6.jpg')]`}></div>
                    <div className={`${sliderItemClass} bg-[url('/img/slides/sl7.jpg')]`}></div>
                </div> */}
            </main>
        </div>
    )

}

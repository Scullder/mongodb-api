import { BsImageAlt } from 'react-icons/bs'
import { useRef } from 'react'
import { BsImageFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'

export default function UploadImage(props) {
    const realUploadInput = useRef(null);

    const clickRealUploadInput = (e) => {
        e.preventDefault();
        realUploadInput.current.click();
    }

    return (
        <div className="flex">
            { props.label && <label className="pr-4 font-bolder block w-1/5 text-right">{props.label}</label> }
            <div className="w-full">
                <div className={`${props.width ?? 'w-[180px]'} flex rounded-xl justify-between hover:cursor-pointer`}> 
                    <input type="file" onChange={props.handle} ref={realUploadInput} hidden/>
                        { props.preview ? (
                            <div onClick={clickRealUploadInput} className="relative">
                                <img src={props.preview} className=" object-scale-down h-full w-full"/> 
                                <div onClick={props.clear} className="absolute top-1 right-1 text-red text-2xl bg-tile p-1 rounded hover:opacity-90"><AiFillDelete /></div>
                            </div>
                        ) : (
                            <button onClick={clickRealUploadInput} className="flex items-center p-5 h-[20px] text-lg font-bolder bg-gray-100 rounded-full text-black">
                                <span className="mr-2 pr-2 border-gray-500 border-r-2">{props.label ?? 'Загрузить'}</span> <BsImageFill />
                            </button>
                        )}
                </div>
            </div>
        </div>
    )
}
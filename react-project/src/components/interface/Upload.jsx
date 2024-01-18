import { BsImageAlt } from 'react-icons/bs'
import { useRef } from 'react'
import { BiImageAlt } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

export default function Upload(props) {
    const realUploadInput = useRef(null);

    const clickRealUploadInput = (e) => {
        realUploadInput.current.click();
    }

    return (
        <div className="flex">
            { props.label && <label className="pr-4 font-bolder block w-1/5 text-right">{props.label}</label> }
            <div className="w-4/5">
                <div className="w-[180px] flex bg-gray-100 rounded-xl justify-between hover:cursor-pointer">
                    <input type="file" onChange={props.handle} ref={realUploadInput} hidden/>
                    
                    <div onClick={clickRealUploadInput} className="relative min-w-[200px] min-h-[200px] bg-gray-300 text-tileLighter rounded flex justify-center items-center text-6xl">
                        { props.preview ? (
                            <>
                                <img src={props.preview} className=" object-scale-down h-full w-full"/> 
                                <div onClick={props.clear} className="absolute top-1 right-1 text-red text-2xl bg-tile p-1 rounded hover:opacity-90"><AiFillDelete /></div>
                            </>
                        ) : (
                            <BiImageAlt />
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
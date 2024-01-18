import { BsImageAlt } from 'react-icons/bs'
import { useRef } from 'react'

export default function ButtonUpload(props) {
    const realUploadInput = useRef(null);

    const clickRealUploadInput = () => {
        realUploadInput.current.click();
    }

    return (
        <div className="w-[180px] flex text-body bg-gray-100 rounded-xl justify-between hover:cursor-pointer">
            <input type="file" onChange={props.handle} ref={realUploadInput} hidden/>
            
            <input onClick={clickRealUploadInput} className="p-2 border-r-2 border-gray-300 hover:cursor-pointer" type="button" value="Изображение" />
            <div className="p-4 flex items-center justify-center">
                <BsImageAlt />
            </div>
        </div>
    )
}
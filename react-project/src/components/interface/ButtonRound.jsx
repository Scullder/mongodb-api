export default function ButtonRound(props) {
    return (
        <>
            <button onClick={props.onCustomClick} className={`rounded-full ${props.width ?? 'w-[50px]'} ${props.height ?? 'h-[50px]'} p-4 flex items-center justify-center border-2 border-gray-300 text-xl text-gray-200 bg-tileLighter ${props._class}`}>
                {props.children}
            </button>  
        </>
    )
}
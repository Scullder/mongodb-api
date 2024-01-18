export default function Button(props) {
    return (
        <>
            <button className={`${props.width ?? 'w-[200px]'} ${props.height ?? 'h-[50px]'} ${props.color ?? 'bg-green'} rounded ${props._class}`}>{props.label ?? 'submit'}</button>  
        </>
    )
}
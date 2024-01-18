export function Button(props) {
    return (
        <button className={`${props.width ?? 'w-[200px]'} ${props.height ?? 'h-[50px]'} ${props.color ?? 'bg-green'} rounded ${props._class}`}>
            {props.children ?? 'submit'}
        </button>  
    )
}
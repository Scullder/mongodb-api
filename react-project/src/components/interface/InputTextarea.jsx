export default function InputTextarea(props) {
    return (
        <>
        <div className={`${props.width ?? 'w-[400px]'} flex`}>
            { props.label && <label className="pr-4 font-bolder top-0 align-top block w-1/5 text-right">{props.label}</label> }
            <textarea 
                name={`${props.name ?? ''}`} 
                className={`w-4/5 ${props.height ?? 'h-[200px]'} ${props.color ?? 'bg-tileDarker'} p-3 outline-none rounded border-noone `} 
                onChange={props.handleState}
                value={props.state ?? ''}
            ></textarea>
        </div>
            { props.error && <div className="text-sm text-rose-600 w-full block text-center">{props.error}</div> }
        </>
    )
}
export default function Input(props) {
    return (
        <>
            <div className={`${props.width ?? 'w-[400px]'} flex`}>
                { props.label && <label className="pr-4 font-bolder block w-[20%] text-right">{props.label}</label> }
                <input 
                    name={`${props.name ?? ''}`} 
                    onChange={props.handleState} 
                    value={props.state ?? ''} 
                    className={`w-4/5 ${props.height ?? 'h-[35px]'} ${props.color ?? 'bg-tileDarker'} p-3 outline-none rounded border-none`}
                />
            </div>
            { props.error && <div className="text-sm text-rose-600 w-full text-center">{props.error}</div> }
        </>
    )
}
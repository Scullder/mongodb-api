export function Input(props) {
    const inputClass = 'mt-2 w-full text-xl bg-body outline-none p-2 px-4 rounded';
    let input = null;

    if(props.type == 'textarea') {
        input = <textarea onChange={(e) => {props.handle(e.target.value)}} value={props.state} className={`${inputClass} h-44`} />
    } else {
        input = <input onChange={(e) => {props.handle(e.target.value)}} value={props.state} className={`${inputClass}`} />
    }

    return (
        <div>
            {props.label && <label className="text-gray-300">{props.label}</label>}
            {input}
            { props.error && <div className="text-sm text-red w-full block text-left">{props.error}</div> }
        </div>
    )
}

import {useState} from "react";

export function Input({label, type, value, name}){
    const [state, setState] = useState(value)
    const handleChange = (e) => {
        setState(e.target.value)
    }

    return <div className="my-3">
        <label className="form-label">{label}</label>
        <input className="form-control" type={type} onChange={handleChange} value={state} name={name}/>
    </div>
}
import {useState} from "react";

export function Textaera({label, value, name}){
    const [state, setState] = useState(value)
    const handleChange = (e) => {
        setState(e.target.value)
    }
    return <div className="my-3">
        <label className="form-label">{label}</label>
        <textarea className="form-control" id={label} onChange={handleChange} value={state} name={name}></textarea>
    </div>
}
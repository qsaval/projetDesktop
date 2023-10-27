import {useState} from "react";

export function InputFile({label,value,name}){
    const [state, setState] = useState()
    const handleChange = (e) => {
        setState(e.target.files[0])
    }
    return <div>
        <label className="form-label">{label}</label>
        <input className="form-control" type="file" onChange={handleChange}  name={name}/>
        {state}
    </div>
}
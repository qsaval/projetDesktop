import {useState} from "react";

export function Select({label, value, nom,name}){
    const [state, setState] = useState({value})


    const handleChange = (e) =>{
        setState(e.target.value)
    }

    return <div>
        <label className="form-label">{label}</label>
        <select className="form-select" onChange={handleChange} name={name}>
            <option value={value}>{nom}</option>
            <option value="1">officiis</option>
            <option value="2">sapiente</option>
            <option value="3">qui</option>
        </select>
    </div>
}
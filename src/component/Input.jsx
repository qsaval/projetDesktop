import {useState} from "react";

export function Input({label, value, name}){
    const [state, setState] = useState(value)
    const [error, setError] = useState("")

    const handleChange = (e) => {
        const regex = new RegExp('\\b[0-9A-Z]{3}([^ 0-9A-Z]|\\s)?[0-9]{4}\\b')
        setState(e.target.value)

        if (regex.test(state)){
            setError(label + " est mal ortographier")
        }
        else {
            setError('')
        }
    }

    return <div className="my-3">
        <label className="form-label">{label}</label>
        <br/>
        <span className="erreur">{error}</span>
        <input className="form-control" id={label} type="text" onChange={handleChange} value={state} name={name}/>
    </div>
}
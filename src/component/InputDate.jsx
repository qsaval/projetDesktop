import {useState} from "react";

export function InputDate({label, value,name}){
    const [date, setDate] = useState(value)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const regex = new RegExp('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')
        setDate(e.target.value)
        if (regex.test(date)){
            setError("il manque la date")
        }
        else {
            setError('')
        }
    }
    return <div className="my-3">
        <label className="form-label">{label}</label>
        <br/>
        <span className="erreur">{error}</span>
        <input className="form-control" id="date" type="date" onChange={handleChange} value={date} name={name}/>
    </div>
}
import {useState} from "react";

export function InputDate({label, value,name}){
    const [date, setDate] = useState(value)

    const handleChange = (e) => {
        setDate(e.target.value)
    }
    return <div className="my-3">
        <label className="form-label">{label}</label>
        <input className="form-control" type="date" onChange={handleChange} value={date} name={name}/>
    </div>
}
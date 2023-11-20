import React, {useState} from 'react';

const InputNumber = ({label, value, name}) => {
    const [state, setState] = useState(value)
    const [error, setError] = useState("")

    const handleChange = (e) => {
        const regex = new RegExp('^[+-]?[1-9]\\d*|0$')
        setState(e.target.value)

        if (!regex.test(state)){
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
};

export default InputNumber;
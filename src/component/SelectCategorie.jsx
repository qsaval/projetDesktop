import {useState} from "react";
import {useFetch} from "../hooks/Fetch";

export function SelectCategorie({label, value, nom,name}){
    const [state, setState] = useState({value})
    const {loading, data, error} = useFetch('http://127.0.0.1:8000/lireCategorie.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')


    const handleChange = (e) =>{
        setState(e.target.value)
    }

    return <div>
        {loading && <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>}
        {data && <div>
            <label className="form-label">{label}</label>
            <select className="form-select" onChange={handleChange} name={name}>
                <option value={value}>{nom}</option>
                {data.map(c => (<option value={c.id} key={c.nom_categorie}>{c.nom_categorie}</option>))}
            </select>
        </div>
        }
        {error && <div className="alert alert-danger" role="alert">{error.toString()}</div>}
    </div>
}
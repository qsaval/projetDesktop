import {useState} from "react";
import {useFetch} from "../hooks/Fetch";

export function SelectFournisseur({label, value, nom,name}){
    const [state, setState] = useState({value})
    const [erreur, setErreur] = useState('')
    const {loading, data, error} = useFetch('http://127.0.0.1:8000/lireFournisseur.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')


    const handleChange = (e) =>{
        if (e.target.value != 0){
            setState(e.target.value)
            setErreur('')
        }
        else {
            setErreur('veuille selectioner une categorie')
        }
    }

    return <div>
        {loading && <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>}
        {data && <div>
            <label className="form-label">{label}</label>
            <br/>
            <span className="erreur">{erreur}</span>
            <select className="form-select" id={label} onChange={handleChange} name={name}>
                <option value={value}>{nom}</option>
                {data.map(f => (<option value={f.id} key={f.nom_fourniseur}>{f.nom_fourniseur}</option>))}
            </select>
        </div>
        }
        {error && <div className="alert alert-danger" role="alert">{error.toString()}</div>}
    </div>
}
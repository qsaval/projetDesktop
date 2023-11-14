import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useFetch} from "./hooks/Fetch";
import {Liste} from "./Liste";

const Categorie = () => {
    const [state, setState] = useState(0)
    const {loading, data, error} = useFetch('http://127.0.0.1:8000/lireCategorie.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')

    const handleChange = (e) =>{
        if(e.target.value != 'selectionner un categorie'){
            setState(e.target.value)
        }
    }
    return (
        <div>
            <div className="d-flex justify-content-between mb-5">
                <h1>Liste des bd</h1>
                <Link to="/bd/ajout" className="btn btn-primary">Ajouter</Link>
            </div>
            {loading && <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            {data && <div>
                <select className="form-select" onChange={handleChange} name={name}>
                    <option value="0">selectionner un categorie</option>
                    {data.map(c => (<option value={c.id} key={c.nom_categorie}>{c.nom_categorie}</option>))}
                </select>
            </div>
            }
            {error && <div className="alert alert-danger" role="alert">{error.toString()}</div>}
            <Liste value={state}/>
        </div>
    );
};

export default Categorie;
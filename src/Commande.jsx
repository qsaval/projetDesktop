import React, {useState} from 'react';
import {useFetch} from "./hooks/Fetch";
import {CommandeUser} from "./component/CommandeUser"

export function Commande() {
    const {loading, data, error} = useFetch('http://127.0.0.1:8000/lireUser.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')
    const [user, setUser] = useState(0)

    const handleChange = (e) => {
        setUser(e.target.value)
        console.log(user)
    }

    return (<div className="container">
        <h1>Liste des commande</h1>
        {loading && <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>}
        {data &&
            <select className="form-select mt-4" onChange={handleChange}>
                <option value="0">selectioner un utilisateur</option>
                {data.map(u => (<option value={u.id} key={u.nom_user}>{u.nom_user} {u.prenom_user}</option>))}
            </select>
        }
        {error && <div className="alert alert-danger" role="alert">{error.toString()}</div>}
        <div className="mt-4">
            <CommandeUser id={user}/>
        </div>
    </div>)
}
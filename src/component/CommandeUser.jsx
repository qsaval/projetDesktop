import {ListeProduit} from './ListeProduit'
import {useEffect, useState} from "react";


export function CommandeUser({id}){

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setErrror] = useState(null)
    useEffect(() =>{
        fetch('http://127.0.0.1:8000/lireCommandeUser.php?id=' + id + '&key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')
            .then(r=> r.json())
            .then(data => setData(data))
            .catch((e) => setErrror(e))
            .finally(() => setLoading(false))
    },[id])

    return <div>
        {loading && <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>}
        {data && <div>
            <table className="table table-bordered border-dark">
                <thead>
                <tr>
                    <th scope="col">Date de la commande</th>
                    <th scope="col">Commande</th>
                    <th scope="col">Etat</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Ville</th>
                    <th scope="col">Code Postal</th>
                </tr>
                </thead>
                <tbody>
                {data.map(c => (<tr key={c.id}>
                    <td>{c.date_commande}</td>
                    <td><ListeProduit value={c.id}/></td>
                    <td>{c.etat_commande}</td>
                    <td>{c.adresse_facture}</td>
                    <td>{c.ville_facture}</td>
                    <td>{c.cp_facture}</td>

                </tr>))}
                </tbody>
            </table>
        </div>}
        {error && <div className="alert alert-danger" role="alert">{error.toString()}</div>}
    </div>
}
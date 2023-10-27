import {useFetch} from "../hooks/Fetch";
import {Link} from "react-router-dom";

export function ChiffreFournisseur(){
    const {loading, data, error} = useFetch('http://127.0.0.1:8000/lireFournisseur.php')
    return <div>
        <h2>Chiffre d'Affaire par fournisseur</h2>
        {loading && <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>}
        {data && <div>
            <table className="table table-bordered border-dark">
                <thead>
                <tr>
                    <th scope="col">Nom du Fourniseur</th>
                    <th scope="col">Chiffre d'affaire</th>
                </tr>
                </thead>
                <tbody>
                {data.map(four => (<tr key={four.nom_fourniseur}>
                    <td>{four.nom_fourniseur}</td>
                    <td>{four.chiffre}€</td>
                </tr>))}
                </tbody>
            </table>
        </div>}
        {error && <div className="alert alert-danger" role="alert">{error.toString()}</div>}
    </div>
}
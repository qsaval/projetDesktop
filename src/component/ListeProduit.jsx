import React, {useState} from 'react';
import {useFetch} from "../hooks/Fetch";

const ListeProduit = ({value}) => {
    const {loading, data, error} = useFetch('http://127.0.0.1:8000/lireUser.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')
    const [produit, setProduit] = useState()


    return (
        <div>
            {loading && <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            {data && <div>
                <table className="table table-bordered border-dark">
                    <thead>
                    <tr>
                        <th scope="col">Titre</th>
                        <th scope="col">Prix unitaire</th>
                        <th scope="col">Quantite</th>
                        <th scope="col">Prix</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(l => (<tr key={l.id}>
                        <td>{l.titre}</td>
                        <td>{l.prix_commander}</td>
                        <td>{l.nb_commander}</td>
                        <td>{l.prix_total}</td>
                    </tr>))}
                    </tbody>
                </table>
            </div>}
            {error && <div className="alert alert-danger" role="alert">{error.toString()}</div>}
        </div>
    );
};

export default ListeProduit;
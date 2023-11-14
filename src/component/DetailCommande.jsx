import React from 'react';
import {useFetch} from "../hooks/Fetch";

const DetailCommande = ({value}) => {
    const {loading, data, error} = useFetch('http://127.0.0.1:8000/lireProduit.php?id='+value+'&key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')
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
                    {data.map(bd => (<tr key={bd.id}>
                        <td>{bd.titre}</td>
                        <td>{bd.prix_commander}</td>
                        <td>{bd.nb_commander}</td>
                        <td>{bd.prix_total}</td>
                    </tr>))}
                    </tbody>
                </table>
            </div>}
            {error && <div className="alert alert-danger" role="alert">{error.toString()}</div>}
        </div>
    );
};

export default DetailCommande;
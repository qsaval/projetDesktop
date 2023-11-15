import React, {useEffect, useState} from 'react';
import {useFetch} from "../hooks/Fetch";
import {length} from "localforage";

const DetailCommande = ({value}) => {
    const {loading, data, error} = useFetch('http://127.0.0.1:8000/lireProduit.php?id='+value+'&key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')
    const [total, setTotal] = useState(0)
    let prix = 0

    if (data != null){
        for (var i = 0; i < data.length; i++){
            prix = prix + Number(data[i].prix_total)
        }
    }
    const arrondi = prix.toFixed(2)
    useEffect(() => {
        setTotal(arrondi)
    }, []);

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
                Total de la commande: {total}€
            </div>}
            {error && <div className="alert alert-danger" role="alert">{error.toString()}</div>}
        </div>
    );
};

export default DetailCommande;
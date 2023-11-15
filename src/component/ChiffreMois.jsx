import {useEffect, useState} from "react";

export function ChiffreMois({annee}){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setErrror] = useState(null)
    useEffect(() =>{
        fetch('http://127.0.0.1:8000/lireMois.php?annee=' + annee + '&key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')
            .then(r=> r.json())
            .then(data => setData(data))
            .catch((e) => setErrror(e))
            .finally(() => setLoading(false))
    },[annee])

    return <div>
        {loading && <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>}
        {data && <div>
            {data.length != 0 ? (<table className="table table-bordered border-dark">
                <thead>
                <tr>
                    <th scope="col">Mois</th>
                    <th scope="col">Chiffre d'affaire</th>
                </tr>
                </thead>
                <tbody>
                {data.map(m => (<tr key={m.mois}>
                        <td>{m.mois}</td>
                        <td>{m.chiffreAffaire}€</td>
                </tr>))}
                </tbody>
            </table>) : (<></>)}
        </div>}

        {error && <div className="alert alert-danger" role="alert">{error.toString()}</div>}
    </div>
}
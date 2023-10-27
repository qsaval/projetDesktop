import {useFetch} from "./hooks/Fetch";
import {ChiffreMois} from "./component/ChiffreMois";
import {ChiffreFournisseur} from "./component/ChiffreFournisseur";
import {useState} from "react";

export function Chiffre() {
    const {loading, data, error} = useFetch('http://127.0.0.1:8000/lireAnnee.php')
    const [annee, setAnnee] = useState(2200)

    const handleChange = (e) => {
        setAnnee(e.target.value)
    }

    return (<div className="container">
        <h1 className="mt-3 mb-5">Chiffre Affaire</h1>
        <div className="row">
            <div className="col-6">
                <h2>Chiffre d'affaire par année</h2>
                {loading && <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}
                {data &&
                    <select className="form-select mt-4" onChange={handleChange}>
                        <option>selectioner une annee</option>
                        {data.map(a => (<option value={a.Annee} key={a.Annee}>{a.Annee}</option>))}
                    </select>
                }
                {error && <div className="alert alert-danger" role="alert">{error.toString()}</div>}
                <div className="mt-4">
                    <ChiffreMois annee={annee}/>
                </div>

            </div>
            <div className="col-6"><ChiffreFournisseur/></div>
        </div>

    </div>)
}
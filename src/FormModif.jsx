import {useFetch} from "./hooks/Fetch";
import {Input} from "./component/Input";
import {InputDate} from "./component/InputDate";
import {Textaera} from "./component/Textaera";
import {SelectFournisseur} from "./component/SelectFournisseur";
import {Link, useNavigate, useParams} from "react-router-dom";
import {SelectCategorie} from "./component/SelectCategorie";
import InputDecimal from "@/component/InputDecimal";
import InputNumber from "@/component/InputNumber";
import {InputFile} from "@/component/InputFile";

export function FormModif(){
    const {id} = useParams()
    const navigate = useNavigate()
    const {loading, data, error} = useFetch('http://127.0.0.1:8000/lire1bd.php?id=' + id + '&key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')

    const handleSubmit = (e) => {
        let bd = {
            id: new FormData(e.target).get('id'),
            titre: new FormData(e.target).get('titre'),
            image: new FormData(e.target).get('image').name,
            auteur: new FormData(e.target).get('auteur'),
            editeur: new FormData(e.target).get('editeur'),
            date_edition: new FormData(e.target).get('date'),
            resume: new FormData(e.target).get('resume'),
            prix: new FormData(e.target).get('prix'),
            stock: parseInt(new FormData(e.target).get('stock')),
            categorie_id: parseInt(new FormData(e.target).get('categorie')),
            fournisseur_id: parseInt(new FormData(e.target).get('fournisseur'))
        }

        fetch('http://127.0.0.1:8000/modifBd.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9', {
            method: "PUT",
            body: JSON.stringify(bd)
        })
            .then(r=> r.json())
            .then(data => console.log(data))
        navigate('/bd')
    }
    return (
        <div className="container">
            <h1 className="mb-5">Formulaire de modification</h1>
            {loading && <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            {data && <form onSubmit={handleSubmit} id="modif" method="post">
                <input type="hidden" name="id" value={data.id}/>
                <Input label="titre" name="titre" type="text" value={data.titre}/>
                <InputFile label="image" name="image"  type="text" value={data.image_bd}/>
                <Input label="auteur" name="auteur" type="text" value={data.auteur}/>
                <Input label="editeur" name="editeur" type="text" value={data.editeur}/>
                <InputDate label="date d'edition" name="date" value={data.date_edition}/>
                <Textaera label="resume" name="resume" value={data.resume}/>
                <InputDecimal label="prix" name="prix" type="text" value={data.prix}/>
                <InputNumber label="stock" name="stock" type="text" value={data.stock}/>
                <SelectCategorie label="categorie" name="categorie" value={data.categorie_id} nom={data.nom_categorie}/>
                <SelectFournisseur label="fourniseur" name="fournisseur" value={data.fournisseur_id} nom={data.nom_fourniseur}/>
                <div className="d-flex my-5">
                    <button type="submit" className="btn btn-primary me-3">Modifier</button>
                    <Link to="/bd" className="btn btn-primary">Retour</Link>
                </div>

            </form>}
            {error && <div className="alert alert-danger" role="alert">{error.toString()}</div>}
        </div>
    )
}


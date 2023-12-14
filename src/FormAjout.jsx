import {Input} from "./component/Input";
import {InputDate} from "./component/InputDate";
import {Textaera} from "./component/Textaera";
import {SelectFournisseur} from "./component/SelectFournisseur";
import {Link, useNavigate} from "react-router-dom";
import {SelectCategorie} from "./component/SelectCategorie";
import InputDecimal from "@/component/InputDecimal";
import InputNumber from "@/component/InputNumber";
import {InputFile} from "@/component/InputFile";


export function FormAjout(){
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        let bd = {
            titre: new FormData(e.target).get('titre'),
            image: new FormData(e.target).get('image').name,
            auteur: new FormData(e.target).get('auteur'),
            editeur: new FormData(e.target).get('editeur'),
            date_edition: new FormData(e.target).get('date'),
            resume: new FormData(e.target).get('resume'),
            prix: new FormData(e.target).get('prix'),
            stock: parseInt(new FormData(e.target).get('stock')),
            fournisseur_id: parseInt(new FormData(e.target).get('fournisseur')),
            categorie_id: parseInt(new FormData(e.target).get('categorie'))
        }

        fetch('http://127.0.0.1:8000/creerBd.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9', {
            method: "POST",
            body: JSON.stringify(bd)
        }).then(r => r.json()).then(s => console.log(s)).catch(e => console.log(e))
        navigate('/bd')
    }

    return (
        <div className="container">
            <h1 className="mb-5">Formulaire d'ajout</h1>
            <form onSubmit={handleSubmit} id="ajout" method="post">
                <Input label="titre" name="titre" value=""/>
                <InputFile label="image" name="image" value=""/>
                <Input label="auteur" name="auteur" value=""/>
                <Input label="editeur" name="editeur" value=""/>
                <InputDate label="date d'edition" name="date" value=""/>
                <Textaera label="resume" name="resume" value=""/>
                <InputDecimal label="prix" name="prix" value=""/>
                <InputNumber label="stock" name="stock" value=""/>
                <SelectCategorie label="categorie" name="categorie" value="0" nom="selectioner une categorie"/>
                <SelectFournisseur label="fourniseur" name="fournisseur" value="0" nom="selectioner un fournisseur"/>
                <div className="d-flex my-5">
                    <button type="submit" className="btn btn-primary me-3">Ajouter</button>
                    <Link to="/bd" className="btn btn-primary">Retour</Link>
                </div>

            </form>
        </div>
    )
}

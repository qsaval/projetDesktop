import {Input} from "./component/Input";
import {InputDate} from "./component/InputDate";
import {Textaera} from "./component/Textaera";
import {Select} from "./component/Select";
import {Link, useNavigate} from "react-router-dom";


export function FormAjout(){
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        let bd = {
            titre: new FormData(e.target).get('titre'),
            image: new FormData(e.target).get('image'),
            auteur: new FormData(e.target).get('auteur'),
            editeur: new FormData(e.target).get('editeur'),
            date_edition: new FormData(e.target).get('date'),
            resume: new FormData(e.target).get('resume'),
            prix: new FormData(e.target).get('prix'),
            stock: parseInt(new FormData(e.target).get('stock')),
            fournisseur_id: parseInt(new FormData(e.target).get('fournisseur'))
        }

        fetch('http://127.0.0.1:8000/creerBd.php', {
            method: "POST",
            body: JSON.stringify(bd)
        }).then(r => r.json()).then(r => console.log(r))
        navigate('/bd')
    }

    return (
        <div className="container">
            <h1 className="mb-5">Formulaire d'ajout</h1>
            <form onSubmit={handleSubmit} method="post">
                <Input label="titre" name="titre" type="text" value=""/>
                <Input label="image" name="image" type="text" value=""/>
                <Input label="auteur" name="auteur" type="text" value=""/>
                <Input label="editeur" name="editeur" type="text" value=""/>
                <InputDate label="date d'edition" name="date" value=""/>
                <Textaera label="resume" name="resume" value=""/>
                <Input label="prix" name="prix" type="text" value=""/>
                <Input label="stock" name="stock" type="number" value=""/>
                <Select lebel="fourniseur" name="fournisseur" value="" nom="selectioner un fournisseur"/>
                <div className="d-flex my-5">
                    <button type="submit" className="btn btn-primary me-3">Ajouter</button>
                    <Link to="/bd" className="btn btn-primary">Retour</Link>
                </div>

            </form>
        </div>
    )
}

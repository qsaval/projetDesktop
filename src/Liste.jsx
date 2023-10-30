import {useFetch} from "./hooks/Fetch";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";


export function Liste(){
    const {loading, data, error} = useFetch('http://127.0.0.1:8001/lireBd.php')

    const handleClick = (e) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'vous voulez supprimer ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'oui',
            cancelButtonText: 'non',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                let id ={
                    id: e.target.id
                }

                fetch('http://127.0.0.1:8000/suppBd.php', {
                    method: 'DELETE',
                    body: JSON.stringify(id)
                })
                window.location.reload()

            }
        })
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between mb-5">
                <h1>Liste des bd</h1>
                <Link to="/bd/ajout" className="btn btn-primary">Ajouter</Link>
            </div>
            {loading && <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            {data && <div>
                <table className="table table-bordered border-dark">
                    <thead>
                        <tr>
                            <th scope="col">Titre</th>
                            <th scope="col">Image</th>
                            <th scope="col">Auteur</th>
                            <th scope="col">Editeur</th>
                            <th scope="col">Date d'edition</th>
                            <th scope="col">Resume</th>
                            <th scope="col">Prix</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Categorie</th>
                            <th scope="col">Fournisseur</th>
                            <th scope="col">Modifier</th>
                            <th scope="col">Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map(bd => (<tr key={bd.id}>
                        <td>{bd.titre}</td>
                        <td>{bd.image_bd}</td>
                        <td>{bd.auteur}</td>
                        <td>{bd.editeur}</td>
                        <td>{bd.date_edition}</td>
                        <td>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#"+bd.nom_categorie+bd.id}>
                                Resume
                            </button>

                            <div className="modal fade" id={bd.nom_categorie+bd.id}  aria-labelledby={bd.titre} aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h2 className="modal-title fs-5" id={bd.titre}>{bd.titre}</h2>
                                        </div>
                                        <div className="modal-body">
                                            {bd.resume}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </td>
                        <td>{bd.prix}</td>
                        <td>{bd.stock}</td>
                        <td>{bd.nom_categorie}</td>
                        <td>{bd.nom_fourniseur}</td>
                        <td><Link to={{pathname: '/bd/modif/' + bd.id}} className="btn btn-primary">Modifier</Link></td>
                        <td><button id={bd.id} className="btn btn-primary" onClick={handleClick}>Supprimer</button></td>
                    </tr>))}
                    </tbody>
                </table>
            </div>}
            {error && <div className="alert alert-danger" role="alert">{error.toString()}</div>}
        </div>
    )
}
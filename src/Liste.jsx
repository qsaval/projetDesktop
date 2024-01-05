import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {useEffect, useState} from "react";


export function Liste({value}){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('http://127.0.0.1:8000/lireBdCat.php?id='+value+'&key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')
            .then((r) => r.json())
            .then((data) => setData(data))
            .catch((e) => setError(e))
            .finally(setLoading(false))
    }, [value]);

    const handleClick = (e) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger me-3'
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

                fetch('http://127.0.0.1:8000/suppBd.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9', {
                    method: 'DELETE',
                    body: JSON.stringify(id)
                }).then(r => r.json()).then(s => console.log(s)).catch(e => console.log(e))

                const alert = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                })

                alert.fire({
                    title: "Supprimer!",
                    text: "la bd a ete supprimer avec succes.",
                    confirmButtonColor: 'rgb(0, 120, 255)',
                    buttonsStyling: false,
                    icon: "success",
                    backdrop: 'rgba(0, 109, 255, 0.4)'
                });
                fetch('http://127.0.0.1:8000/lireBdCat.php?id='+value+'&key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')
                    .then((r) => r.json())
                    .then((data) => setData(data))
                    .catch((e) => setError(e))
                    .finally(setLoading(false))

            }
        })
    }

    return (
        <div className="container mt-5">

            {loading && <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            {data && <div>
                {data.length != 0 ? (<table className="table table-bordered border-dark">
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
                            <th scope="col">Fournisseur</th>
                            <th scope="col">Modifier</th>
                            <th scope="col">Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map(bd => (<tr key={bd.id}>
                        <td>{bd.titre}</td>
                        <td><img src={`http://127.0.0.1:8001/image/${bd.image_bd}`} className="image" alt={bd.image_bd}/></td>
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
                        <td>{bd.nom_fourniseur}</td>
                        <td><Link to={{pathname: '/bd/modif/' + bd.id}} className="btn btn-primary">Modifier</Link></td>
                        <td><button id={bd.id} className="btn btn-primary" onClick={handleClick}>Supprimer</button></td>
                    </tr>))}
                    </tbody>
                </table>):(<></>)}
            </div>}
            {error && <div className="alert alert-danger" role="alert">{error.toString()}</div>}
        </div>
    )
}
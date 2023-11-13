import {Liste} from "./Liste";
import {FormModif} from "./FormModif";
import {Chiffre} from "./Chiffre";
import {FormAjout} from "./FormAjout";
import {Commande} from "./Commande"
import {createBrowserRouter, NavLink, Outlet, RouterProvider, useRouteError} from "react-router-dom";

const router = createBrowserRouter([
    {
        path:'/',
        element: <Root/>,
        errorElement: <PageError/>,
        children: [
            {
              path: '',
              element: <Chiffre/>
            },
            {
                path: 'bd',
                element: <div className="row">
                    <main className="col-9">
                        <Outlet/>
                    </main>
                </div>,
                children: [
                    {
                        path: '',
                        element: <Liste/>
                    },
                    {
                        path: 'modif/:id',
                        element: <FormModif/>
                    },
                    {
                        path: 'ajout',
                        element: <FormAjout/>
                    }
                ]

            },
            {
                path: '/commande',
                element: <Commande/>
            },
        ]
    }
])

function PageError(){
    const error = useRouteError()
    return <>
        <h1>Une erreur est survenue</h1>
        <p>
            {error?.error?.toString() ?? error?.toString()}
        </p>
    </>
}

function Root(){
    return <div className="row">
        <aside className="col-2">
            <div className="d-flex justify-content-center">
                <nav>
                    <h1 className="my-4">BD CDA</h1>
                    <ul>
                        <li><NavLink to="/">Acceuil</NavLink></li>
                        <li><NavLink to="/bd">Liste des Bd</NavLink></li>
                        <li><NavLink to="/commande">Liste des commande</NavLink></li>
                    </ul>
                </nav>
            </div>
        </aside>
        <main className=" col-9 mt-4">
            <Outlet/>
        </main>
    </div>
}

function App() {

    return (<RouterProvider router={router}/>)
}
export default App

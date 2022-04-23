import { Navigate, useRoutes } from "react-router-dom"
import Cart from "../views/Cart";
import Home from "../views/Home";
import Token from "../views/Token";
import { appRoutes } from "./routeConstants/appRoutes";

const AppRoutes = () => {

    const routes = useRoutes([
        {
            path: appRoutes.HOME,
            element: <Home />,
            children: [
                {
                    path: "",
                    element: <Navigate to={appRoutes.CART} />
                },
                {
                    path: appRoutes.CART,
                    element: <Cart />
                },
                {
                    path: appRoutes.TOKEN,
                    element: <Token />
                },
            ]
        },
        {
            path: "*",
            element: <Navigate to={appRoutes.HOME} />
        }
    ])

    return routes;
}

export default AppRoutes
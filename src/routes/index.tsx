import { Navigate, useRoutes } from "react-router-dom"
import Cart from "../views/Cart";
import Home from "../views/Home";
import { appRoutes } from "./routeConstants/appRoutes";
import Coupon from "../views/Coupon";

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
                    path: appRoutes.COUPON,
                    element: <Coupon />
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
import { Router } from "express"
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoute } from "../modules/auth/auth.route";


export const router = Router();


const routeConfiguration = [

    {
        path: "/users",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoute
    }

];

routeConfiguration.forEach(route => {
    router.use(route.path, route.route)
})
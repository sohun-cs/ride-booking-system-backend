import { Router } from "express"
import { UserRoutes } from "../modules/user/user.routes";


export const router = Router();


const routeConfiguration = [

    {
        path: "/users",
        route: UserRoutes
    }

];

routeConfiguration.forEach(route => {
    router.use(route.path, route.route)
})
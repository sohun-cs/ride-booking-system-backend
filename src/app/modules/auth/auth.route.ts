import { Router } from "express";
import { AuthControllers } from "./aiuth.controller";


const router = Router();

router.post("/login", AuthControllers.credentialLogin);

export const AuthRoute = router;
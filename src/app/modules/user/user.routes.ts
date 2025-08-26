import { Router } from "express";
import { validationReq } from "../../middleware/z.validation.req";
import { createZodValidationSchema } from "./user.validate";
import { UserControllers } from "./user.controller";


const router = Router();

router.post("/register", validationReq(createZodValidationSchema), UserControllers.createUser);
router.get("/all-users", UserControllers.getAllUsers);


export const UserRoutes = router;
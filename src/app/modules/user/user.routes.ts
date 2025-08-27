import { Router } from "express";
import { validationReq } from "../../middleware/z.validation.req";
import { createZodValidationSchema, updateZodValidationSchema } from "./user.validate";
import { UserControllers } from "./user.controller";
import { CheckAuth } from "../../middleware/check.auth";
import { Role } from "./user.interface";


const router = Router();

router.post("/register", validationReq(createZodValidationSchema), UserControllers.createUser);
router.get("/all-users", CheckAuth(Role.Admin, Role.SuperAdmin), UserControllers.getAllUsers);
router.patch("/:id", CheckAuth(...Object.values(Role)), validationReq(updateZodValidationSchema), UserControllers.updateUser)


export const UserRoutes = router;
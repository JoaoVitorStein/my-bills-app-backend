import express, { Request, Response } from "express";
import { createAccount, getAccountById } from "./account-service";
import Account, { AccountType } from "./types";
import { checkSchema } from "express-validator";
import validationMiddleware from "../common/middlewares/validator-middleware";

const router = express.Router();

router.post(
    "/",
    checkSchema({
        type: {
            in: ["body"],
            custom: {
                options: value => {
                    return value in AccountType;
                }
            }
        },
        userId: {
            in: ["body"],
            notEmpty: true
        },
        name: {
            in: ["body"],
            notEmpty: true
        }
    }),
    validationMiddleware,
    async (req: Request, res: Response) => {
        try {
            const account: Account = req.body;
            const response = await createAccount(account);
            await res.send({ ...response });
        } catch (ex) {
            res.status(ex.httpCode || 500);
            res.send({ errorMessage: ex.message });
        }
    }
);

router.get(
    "/:id",
    checkSchema({
        id: {
            in: ["params"],
            notEmpty: true
        }
    }),
    validationMiddleware,
    async (req: Request, res: Response) => {
        try {
            const response = await getAccountById(req.params.id);
            await res.send({ ...response });
        } catch (ex) {
            res.status(ex.httpCode || 500);
            res.send({ errorMessage: ex.message });
        }
    }
);

export default router;

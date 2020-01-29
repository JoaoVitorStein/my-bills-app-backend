import express, { Request, Response } from "express";
import { createAccount } from "./account-service";
import Account, { AccountType } from "./types";
import { checkSchema } from "express-validator";
import validationMiddleware from "../common/middlewares/validator-middleware";

const router = express.Router();

router.use(validationMiddleware);

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
            throw new Error("fodase");
            const account: Account = req.body;
            const response = await createAccount(account);
            await res.send({ created: response });
        } catch (ex) {
            res.status(ex.httpCode || 500);
            res.send({ errorMessage: ex.message });
        }
    }
);

export default router;

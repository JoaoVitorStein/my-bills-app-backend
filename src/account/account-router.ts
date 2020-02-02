import express, { Request, Response } from "express";
import * as AccountService from "./account-service";
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
            const response = await AccountService.createAccount(account);
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
            const response = await AccountService.getAccountById(req.params.id);
            await res.send({ ...response });
        } catch (ex) {
            res.status(ex.httpCode || 500);
            res.send({ errorMessage: ex.message });
        }
    }
);

router.put(
    "/:id",
    checkSchema({
        id: {
            in: ["params"],
            notEmpty: true
        },
        type: {
            in: ["body"],
            custom: {
                options: value => {
                    return !value || value in AccountType;
                }
            }
        }
    }),
    validationMiddleware,
    async (req: Request, res: Response) => {
        try {
            const response = await AccountService.updateAccount(
                req.params.id,
                req.body
            );
            await res.send({ ...response });
        } catch (ex) {
            res.status(ex.httpCode || 500);
            res.send({ errorMessage: ex.message });
        }
    }
);

export default router;

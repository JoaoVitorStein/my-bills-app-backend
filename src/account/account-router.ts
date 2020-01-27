import express, { Request, Response } from "express";
import { createAccount } from "./account-service";
import Account from "./account-dto";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const account: Account = req.body;
        await createAccount(account);
        await res.send({ success: true });
    } catch (ex) {
        res.status(ex.httpCode || 500);
        res.send({ errorMessage: ex.message });
    }
});

export default router;

import accountRouter from "@account/account-router";
import express from "express";

const router = express.Router();

router.use("/account", accountRouter);

export default router;

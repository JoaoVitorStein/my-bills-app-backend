import { validationResult } from "express-validator";

export default async function(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    res.status(400).json({ errors: errors.array() });
}

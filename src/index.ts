import express from "express";
import bodyParser from "body-parser";
import "module-alias/register";
import router from "./router";
import migrationRunner from "./migrations/migration-runner";

const app = express();

app.use(express.json());
app.use(router);
app.use(bodyParser());

async function startServer() {
    try {
        migrationRunner();
        app.listen(3000, () => {
            console.log("Application is running");
        });
    } catch (ex) {
        throw ex;
    }
}

startServer();

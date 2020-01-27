import Client from "../common/dynamo-db/dynamo-db-client";
import Migrations from "./migrations";
import migrationControlTable from "./specs/migrations-control-table.json";
import uuid from "uuid";
import { ScanInput } from "aws-sdk/clients/dynamodb";

async function waitForTableBeActive() {
    const table = await Client.describeTable({
        TableName: migrationControlTable.TableName
    }).promise();

    if (table.Table.TableStatus !== "ACTIVE") {
        await waitForTableBeActive();
    } else {
        return;
    }
}

async function createMigrationTable() {
    console.log("Creating migration control table");

    await Client.createTable(migrationControlTable).promise();

    await waitForTableBeActive();

    console.log("Migration controll table is Active");
}

async function getLastMigration(): Promise<number> {
    try {
        const migrationTableName = migrationControlTable.TableName;

        const createdTables = await Client.listTables().promise();
        // If the migration table isn't created, it should run every migration
        if (!createdTables.TableNames.includes(migrationTableName)) {
            await createMigrationTable();
            return 0;
        }
        const scanInput: ScanInput = {
            TableName: migrationTableName,
            AttributesToGet: ["migrationSequence"]
        };
        const executedMigrations = await Client.scan(scanInput).promise();
        const lastExecutedMigration = executedMigrations.Items.map(
            item => +item.migrationSequence.N
        ).sort((a, b) => b - a)[0];

        return lastExecutedMigration || 0;
    } catch (ex) {
        throw ex;
    }
}

export default async function() {
    try {
        const lastMigrationIndex = await getLastMigration();
        const migrationsToRun = Migrations.splice(lastMigrationIndex);
        await migrationsToRun.forEach(async migrate => {
            await migrate();
            const migrationToInsert = {
                TableName: migrationControlTable.TableName,
                Item: {
                    migrationId: {
                        S: uuid()
                    },
                    migrationSequence: {
                        N: (lastMigrationIndex + 1).toString()
                    },
                    dateWhen: {
                        S: new Date().toISOString()
                    }
                }
            };
            await Client.putItem(migrationToInsert).promise();
        });
    } catch (ex) {
        throw ex;
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const uuid_1 = require("uuid");
const REGION = process.env.AWS_REGION ?? "us-east-1";
const TABLE = process.env.TABLE_NAME ?? "TodoTable";
const client = new client_dynamodb_1.DynamoDBClient({ region: REGION });
const ddb = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const handler = async (event) => {
    try {
        const method = (event.httpMethod || "GET").toUpperCase();
        if (method === "GET") {
            const resp = await ddb.send(new lib_dynamodb_1.ScanCommand({ TableName: TABLE }));
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(resp.Items ?? [])
            };
        }
        if (method === "POST") {
            if (!event.body)
                return { statusCode: 400, body: JSON.stringify({ message: "body required" }) };
            const body = JSON.parse(event.body);
            if (!body.titulo || typeof body.titulo !== "string")
                return { statusCode: 400, body: JSON.stringify({ message: "titulo required" }) };
            const item = { id: (0, uuid_1.v4)(), titulo: body.titulo, completada: false, createdAt: new Date().toISOString() };
            await ddb.send(new lib_dynamodb_1.PutCommand({ TableName: TABLE, Item: item }));
            return { statusCode: 201, headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) };
        }
        return { statusCode: 405, body: JSON.stringify({ message: "Method not allowed" }) };
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : "internal error";
        return { statusCode: 500, body: JSON.stringify({ message: msg }) };
    }
};
exports.handler = handler;

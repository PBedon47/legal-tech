"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const uuid_1 = require("uuid");
// Configuración del cliente DynamoDB
const client = new client_dynamodb_1.DynamoDBClient({
    region: "us-west-2",
    endpoint: "http://localhost:8000", // Usa este endpoint si estás con DynamoDB local
});
const ddb = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const TABLE_NAME = "tec-practicantes-todo";
// Handler principal para Lambda
const handler = async (event) => {
    try {
        const method = event.httpMethod;
        // Método GET → listar tareas
        if (method === "GET") {
            const data = await ddb.send(new lib_dynamodb_1.ScanCommand({ TableName: TABLE_NAME }));
            return {
                statusCode: 200,
                body: JSON.stringify(data.Items ?? []),
            };
        }
        // Método POST → agregar nueva tarea
        if (method === "POST") {
            if (!event.body) {
                return { statusCode: 400, body: JSON.stringify({ error: "Body vacío" }) };
            }
            const body = JSON.parse(event.body);
            if (!body.titulo || typeof body.titulo !== "string") {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: "El campo 'titulo' es obligatorio y debe ser string" }),
                };
            }
            const newItem = {
                id: (0, uuid_1.v4)(),
                titulo: body.titulo,
                completada: false,
            };
            await ddb.send(new lib_dynamodb_1.PutCommand({ TableName: TABLE_NAME, Item: newItem }));
            return {
                statusCode: 200,
                body: JSON.stringify(newItem),
            };
        }
        // Si llega otro método no permitido
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Método no permitido" }),
        };
    }
    catch (error) {
        console.error("Error en Lambda:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error interno del servidor" }),
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=handler.js.map
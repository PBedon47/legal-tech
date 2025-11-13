"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_lambda_1 = require("aws-lambda");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const uuid_1 = require("uuid");
const client = new client_dynamodb_1.DynamoDBClient({ region: 'us-east-1' }); // Cambia la región si usas otra
const TABLE_NAME = 'tec-practicantes-todo'; // Nombre de tu tabla DynamoDB
const handler = async (event) => {
    try {
        if (event.httpMethod === 'GET') {
            const data = await client.send(new client_dynamodb_1.ScanCommand({ TableName: TABLE_NAME }));
            const items = data.Items?.map(item => ({
                id: item.id.S,
                titulo: item.titulo.S,
                completada: item.completada.BOOL
            }));
            return {
                statusCode: 200,
                body: JSON.stringify(items || []),
            };
        }
        if (event.httpMethod === 'POST') {
            if (!event.body) {
                return { statusCode: 400, body: JSON.stringify({ error: 'Cuerpo vacío' }) };
            }
            const body = JSON.parse(event.body);
            if (!body.titulo || typeof body.titulo !== 'string') {
                return { statusCode: 400, body: JSON.stringify({ error: 'El título es obligatorio y debe ser string' }) };
            }
            const newItem = {
                id: { S: (0, uuid_1.v4)() },
                titulo: { S: body.titulo },
                completada: { BOOL: false },
            };
            await client.send(new client_dynamodb_1.PutItemCommand({
                TableName: TABLE_NAME,
                Item: newItem,
            }));
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Tarea creada con éxito', id: newItem.id.S }),
            };
        }
        return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
    }
    catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Error interno del servidor' }) };
    }
};
exports.handler = handler;
//# sourceMappingURL=handler.js.map
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

// Configuración del cliente DynamoDB
const client = new DynamoDBClient({
  region: "us-west-2",
  endpoint: "http://localhost:8000", // Usa este endpoint si estás con DynamoDB local
});

const ddb = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "tec-practicantes-todo";

// Handler principal para Lambda
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const method = event.httpMethod;

    // Método GET → listar tareas
    if (method === "GET") {
      const data = await ddb.send(new ScanCommand({ TableName: TABLE_NAME }));
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
        id: uuidv4(),
        titulo: body.titulo,
        completada: false,
      };

      await ddb.send(new PutCommand({ TableName: TABLE_NAME, Item: newItem }));

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
  } catch (error) {
    console.error("Error en Lambda:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno del servidor" }),
    };
  }
};

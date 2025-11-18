import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const REGION = process.env.AWS_REGION ?? "us-east-1";
const TABLE = process.env.TABLE_NAME ?? "TodoTable";

const client = new DynamoDBClient({ region: REGION });
const ddb = DynamoDBDocumentClient.from(client);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const method = (event.httpMethod || "GET").toUpperCase();

    if (method === "GET") {
      const resp = await ddb.send(new ScanCommand({ TableName: TABLE }));
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resp.Items ?? [])
      };
    }

    if (method === "POST") {
      if (!event.body) return { statusCode: 400, body: JSON.stringify({ message: "body required" }) };
      const body = JSON.parse(event.body);
      if (!body.titulo || typeof body.titulo !== "string") return { statusCode: 400, body: JSON.stringify({ message: "titulo required" }) };

      const item = { id: uuidv4(), titulo: body.titulo, completada: false, createdAt: new Date().toISOString() };
      await ddb.send(new PutCommand({ TableName: TABLE, Item: item }));

      return { statusCode: 201, headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) };
    }

    return { statusCode: 405, body: JSON.stringify({ message: "Method not allowed" }) };

  } catch (err: any) {
    const msg = err instanceof Error ? err.message : "internal error";
    return { statusCode: 500, body: JSON.stringify({ message: msg }) };
  }
};

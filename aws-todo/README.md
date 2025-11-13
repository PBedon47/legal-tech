#  AWS Todo - Función Lambda  

##  Descripción  
Este proyecto implementa una **función AWS Lambda en TypeScript** que actúa como un **endpoint REST** para gestionar tareas almacenadas en **DynamoDB**.  
La función soporta los métodos **GET** y **POST**, y puede ejecutarse tanto en **AWS** como de forma **local** con DynamoDB Local.

---

##  Despliegue de la tabla en DynamoDB  

###  Opción 1: Desde la consola de AWS  
1. Ve a **DynamoDB → Crear tabla**  
2. Nombre de la tabla: `tec-practicantes-todo`  
3. Clave primaria: `id` (tipo *String*)  
4. Haz clic en **Crear tabla**  

###  Opción 2: Desde la terminal (AWS CLI o DynamoDB Local)  
aws dynamodb create-table \
  --table-name tec-practicantes-todo \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000

---

##  Despliegue de la función Lambda  

# Compila el proyecto
npx tsc

# Crea un archivo ZIP con el código compilado
zip -r function.zip dist

# En la consola de AWS Lambda:
1. Crear una nueva función → “Desde archivo .zip”
2. Subir function.zip
3. Establecer el handler en:
   dist/handler.handler
4. Configurar variable de entorno:
    TABLE_NAME = tec-practicantes-todo

---

##  Integración con API Gateway  

1. Crear una API REST
2. Agregar los métodos:
    GET  → lista las tareas desde DynamoDB
    POST → agrega una nueva tarea con 'titulo' y 'completada = false'
3. Vincular ambos métodos a la función Lambda
4. Implementar la API y copiar el endpoint generado

---

##  Resultado final  

#  Conexión al SDK de AWS y DynamoDB  
#  Métodos GET y POST funcionando correctamente  
#  Validación de 'titulo' y generación automática de 'id'  
#  Respuestas HTTP: 200 (éxito) / 400 (error de validación o lectura)  
#  Instrucciones claras para despliegue en AWS o local

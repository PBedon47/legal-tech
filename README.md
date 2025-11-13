# legal-tech
# PARTE 1 - CONSTRUCCIÓN DE UN COMPONENTE Y CONSUMO DE API
Para esta primera parte creé una pequeña aplicación con Next.js 14 y TypeScript que muestra una lista de libros obtenidos desde la API pública de Gutendex.
Desarrollé un componente llamado BooksList, que se encarga de hacer la petición a la API usando fetch y manejar los estados con los hooks useState y useEffect.
Mientras los datos se cargan, la app muestra un mensaje de “Cargando libros…”, y si ocurre algún error, se muestra un mensaje informativo.
Cuando la información llega correctamente, se listan los diez primeros títulos junto con el nombre del primer autor.
Usé interfaces TypeScript para definir el formato de los datos y asegurar un código más claro y seguro.
Además, separé la lógica en componentes para mantener el proyecto ordenado y fácil de mantener.
En resumen, la aplicación cumple con los criterios de estructura, uso de hooks, tipado correcto y manejo adecuado de estados.

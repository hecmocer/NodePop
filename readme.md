# Instrucciones de uso
Para instalar dependencias, en la carpeta NodePop ejecutar: 'npm install'
Esto creará la carpeta node_modules con express, mongodb y mongoose entre otros

# Como arrancarlo
En la carpeta NodePop ejecutar: 'nodemon'
Abrir un navegador e ir a 'http://localhost:3000/'


# Como iniciar la base de datos
Ejecutar el exe 'mongod_NodePop' o bien si no lo tenemos ejecutar 'mongod --dbpath "C:\Program Files\MongoDB\Server\3.2\data\NodePopdb" --directoryperdb'

# Para resetear los datos dentro de la base de datos:
Ejecutar npm run installDB

# Rutas
api/v1/ - carga el índice del api con una documentación mínima
api/v1/ads - carga los anuncios con parámetros de búsqueda por defecto (POST, PUT, DELETE implementados)
api/v1/users - carga un mensaje de error y mediante el método POST añade usuarios
api/v1/tags - muestra todos los tags existentes con links a su búsqueda

### Custom shop

Esto es una practica utilizando, nextjs, typescript, mongo compass y docker

# Next.js CustomShop App
Para correr localmente, se necesita la base de datos

```
docker-compose up -d

```

* El -d, siginifica __detached__


## Configurar las variables de entorno
Renombrar el archivo __.env.template__a__.env__
* MongoDB URL Local:
```
MONGO_URL=MONGO://localhost:27017/productsdb
```

* Reconstruir los modulos de node y levantar Next

```
yarn install
yarn dev

```


## Llenar la base de datos con informacion de pruebas (crea el modelo)

Llamara:
```
https://localhost:3000/api/seed
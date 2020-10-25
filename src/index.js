const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const cookieParser = require('cookie-parser')

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));

app.use(cookieParser());

app.use(express.json());
app.use(routes);
/* 
    Métodos HTTP:

    GET: Buscar uma informação do back-end
    POST: Criar uma informação no back-end
    PUT: Alterar uma informação no back-end
    DELETE: Deletar uma informação no back-end
*/

/* 
    Tipos de parametros:

    Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
    Route Params: Parâmetros utilizados para identificar recursos
    Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
*/

/* 
    SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
    NoSQL: MongoDB, CouchDB, etc
*/

/* 
    Driver: SELECT * FROM users
    Query Builder: table('users').select('*').where()
*/



app.listen(3333);


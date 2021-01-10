const express = require('express');

const app = express();

app.use(express.json());

/*
  Tipos de Parâmetros:

  * Query Params: Filtros e paginação
  * Route Params: identificar recursos (Atualizar/Deletar)
  * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
*/

// GET: Buscar informações do back-end
app.get('/projects', (request, response) => {
  const { title, owner} = request.query;      //query params

console.log(title);
console.log(owner);

  return response.json([
    'Projeto 1',
    'Projeto 2',
  ]);
})


// POST: Criar uma informação no back-end
app.post('/projects', (request, response) => {
  const { title, owner } = request.body;                  //request body
  console.log(title);
  console.log(owner);

  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ]);
})

// PUT: Alterar uma informação no back-end
app.put('/projects/:id', (request, response) => {
  const { id } = request.params;            //route params
  console.log(id)
  return response.json([
    'Projeto 4',
    'Projeto 2',
    'Projeto 3',
  ]);
})

// DELETE: Deletar uma informação no back-end
app.delete('/projects/:id', (request, response) => {
  return response.json([
    'Projeto 2',
    'Projeto 3',
  ]);
})

app.listen(3333, () => {
  console.log('🚀 Backend started!')
})
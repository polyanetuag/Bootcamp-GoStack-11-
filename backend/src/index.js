const express = require('express');
const { uuid, isUuid} = require('uuidv4');

const app = express();

app.use(express.json());

/*
  Tipos de Parâmetros:

  * Query Params: Filtros e paginação
  * Route Params: identificar recursos (Atualizar/Deletar)
  * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
*/

/*
Middleware:
  Interceptador de requisições que podem interromper a requisição ou alterar dados da requisição 

*/

const projects = [];

function logRequests(request, response, next) {           //middleware
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel)

  next();        //responsável por prosseguir com as requisições

  console.timeEnd(logLabel)
}

function validateProjectId(request, response, nex) {
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project ID.'})     //caso ocorra o erro, o progama terminará aqui.
  }
  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId)       // aplicando o middleware com parte de um caminho

// GET: Buscar informações do back-end
app.get('/projects', (request, response) => {
  const { title} = request.query;      //query params - filtro

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects

  return response.json(results);
})

// POST: Criar uma informação no back-end
app.post('/projects', (request, response) => {
  const { title, owner } = request.body;                  //request body

  const project = { id:uuid(), title, owner};

  projects.push(project);

  return response.json(project);      // exibido o projeto recém criado
})

// PUT: Alterar uma informação no back-end
app.put('/projects/:id', (request, response) => {
  const { id } = request.params;            //route params
  const { title, owner } = request.body;  
  
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.'})
  }

  const project = {
    id,
    title,
    owner,
  }

  projects[projectIndex] = project;

  return response.json(project);      // retorna o projeto atualizado
})

// DELETE: Deletar uma informação no back-end
app.delete('/projects/:id',  (request, response) => {
  const { id } = request.params

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.'})
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
})

app.listen(3333, () => {
  console.log('🚀 Backend started!')
})
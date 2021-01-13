const express = require('express');
const { uuid} = require('uuidv4');

const app = express();

app.use(express.json());

/*
  Tipos de Parâmetros:

  * Query Params: Filtros e paginação
  * Route Params: identificar recursos (Atualizar/Deletar)
  * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
*/

const projects = [];

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
app.delete('/projects/:id', (request, response) => {
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
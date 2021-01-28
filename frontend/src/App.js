import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

/* Conceitos para entender o react
  Componente
  Propriedade
  Estado e Imutabilidade
*/

function App() {                // primeiro componente
  const [projects, setProjects] = useState([ ]);       // utilizando estados

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  /*
  UseState retorna um array com 2 posições 
    1. Variável com o seu valor inicial
    2.Função para atualizarmos esse valor
  */

  async function handleAddProject() {
    //setProjects([...projects, `Novo Projeto ${Date.now()}`])            // conceito de imutabilidade

    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Polyane Tuag"
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (                      // fragments
    <>                         
      < Header title="Projects" />

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
  </>
  );
}

export default App;
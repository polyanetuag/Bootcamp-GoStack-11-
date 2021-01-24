import React, { useState } from 'react';

import Header from './components/Header';

/* Conceitos para entender o react
  Componente
  Propriedade
  Estado e Imutabilidade
*/

function App() {                // primeiro componente
  const [projects, setProjects] = useState(['Desenvolvimento de app', 'Front-end web']);       // utilizando estados
  /*
  UseState retorna um array com 2 posições 
  
  1. Variável com o seu valor inicial
  2.Função para atualizarmos esse valor
  */

  function handleAddProject() {
    //projects.push(`Novo Projeto ${Date.now()}`)                       o push não respeita a imutabilidade

    setProjects([...projects, `Novo Projeto ${Date.now()}`])            // conceito de imutabilidade
  }

  return (                      // fragments
    <>                         
      < Header title="Projects" />

      <ul>
        {projects.map(project => <li key={project}>{project}</li>)}
      </ul>

      <button type="button" onClick={}>Adicionar projeto </button>n
  </>
  );
}

export default App;
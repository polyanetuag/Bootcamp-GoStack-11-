import React from 'react';

import Header from './components/Header';

/* Conceitos para entender o react
  Componente
  Propriedade
  Estado
*/

function App() {                // primeiro componente
  return (                      // fragments
    <>                         
      <Header title="Homepage">
        <ul>
          <li>Homepage</li>
          <li>Projects</li>
        </ul>
      </Header>
      <Header title="Projects">
      <ul>
          <li>Homepage</li>
          <li>Projects</li>
          <li>Login</li>
        </ul>
      </Header>
  </>
  );
}

export default App;
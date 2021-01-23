import react from 'react';

export default function Header({ title, children }) {       //desestruturação da propriedade; children: acessar o conteudo do header
  return (
    <header>
      <h1>{title}</h1>

      {children} 
    </header>
  );
}
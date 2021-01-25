import React from 'react';

export default function Header({ title }) {       //desestruturação da propriedade; 
  return (
    <header>
      <h1>{title}</h1>

    </header>
  );
}
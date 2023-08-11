import React, { useState } from 'react';
import FlamesInput from './FlamesInput';
import FlamesResult from './FlamesResult';
import { flamesAlgorithm } from '../utils/flamesAlgorithm';
import '../styles/FlamesGame.css';

const FlamesGame: React.FC = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');

  const handleName1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName1(event.target.value);
  };

  const handleName2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName2(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(flamesAlgorithm(name1, name2));
  };

  return (
    <div className="flames-game">
      <FlamesInput
        name1={name1}
        name2={name2}
        onName1Change={handleName1Change}
        onName2Change={handleName2Change}
        onSubmit={handleSubmit}
      />
      <FlamesResult result={result} />
    </div>
  );
};

export default FlamesGame;
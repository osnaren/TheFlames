import React, { useState } from 'react';

interface Props {
  onSubmit: (name1: string, name2: string) => void;
}

const FlamesInput: React.FC<Props> = ({ onSubmit }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(name1, name2);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name1">Name 1:</label>
      <input
        id="name1"
        type="text"
        value={name1}
        onChange={(e) => setName1(e.target.value)}
      />
      <label htmlFor="name2">Name 2:</label>
      <input
        id="name2"
        type="text"
        value={name2}
        onChange={(e) => setName2(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FlamesInput;
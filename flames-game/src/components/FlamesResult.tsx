import React from 'react';

interface FlamesResultProps {
  result: string;
}

const FlamesResult: React.FC<FlamesResultProps> = ({ result }) => {
  return (
    <div id="result">
      <h2>Result:</h2>
      <p>{result}</p>
    </div>
  );
};

export default FlamesResult;
const flamesAlgorithm = (name1: string, name2: string): string => {
  const flames = ['Friends', 'Lovers', 'Affectionate', 'Marriage', 'Enemies', 'Siblings'];
  let combinedName = name1 + name2;
  let uniqueChars = Array.from(new Set(combinedName));

  uniqueChars.forEach((char) => {
    combinedName = combinedName.replace(new RegExp(char, 'g'), '');
  });

  const count = combinedName.length;
  let index = count % flames.length - 1;

  while (flames.length > 1) {
    index = (index + count) % flames.length;
    flames.splice(index, 1);
  }

  return flames[0];
};

export default flamesAlgorithm;
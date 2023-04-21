const math = require('mathjs');

function cramerRule(x) {
  if (x.length !== x[0].length - 1) {
    throw new Error('Input matrix must have n rows and n+1 columns');
  }
  const n = x.length;
  const a = [];
  const b = [];
  for (let i = 0; i < n; i++) {
    a[i] = [];
    for (let j = 0; j < n; j++) {
      a[i][j] = x[i][j];
    }
    b[i] = x[i][n];
  }
  const detA = math.det(a);
  if (detA === 0) {
    throw new Error('System of equations has no unique solution');
  }
  const result = [];
  for (let i = 0; i < n; i++) {
    const ai = [];
    for (let j = 0; j < n; j++) {
      ai[j] = a[j].slice();
    }
    for (let j = 0; j < n; j++) {
      ai[j][i] = b[j];
    }
    result[i] = math.det(ai) / detA;
  }
  return result;
}



const x = [[1,2,3], [4,5,6]];
const result = cramerRule(x);
console.log(result); // output: [-1, 2, -1]


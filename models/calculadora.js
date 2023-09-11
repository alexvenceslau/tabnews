function calcBasico(numero1, numero2, operacao) {
  numero1 = parseInt(numero1);
  numero2 = parseInt(numero2);

  if (isNaN(numero1) || isNaN(numero1)) {
    return "Erro";
  }
  if (typeof numero1 !== "number" || typeof numero2 !== "number") {
    return "Erro";
  }

  const operacoes = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => {
      if (b === 0) {
        return "Erro";
      }
      return a / b;
    },
  };

  const operacaoFunc = operacoes[operacao];

  if (operacaoFunc) {
    return operacaoFunc(numero1, numero2);
  }
}

exports.calcBasico = calcBasico;

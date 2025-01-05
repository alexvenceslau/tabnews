class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

function salvarUsuario(input) {
  if (!input) {
    throw new ReferenceError("É necessário informar um input");
  }

  if (!input.name) {
    throw new ValidationError("Preencha o campo nome");
  }
  if (!input.username) {
    throw new ValidationError("Preencha o campo username");
  }
  if (!input.age) {
    throw new ValidationError("Preencha a idade");
  }

  user.save(input);
}
try {
  salvarUsuario({});
} catch (error) {
  if (error instanceof ReferenceError) {
    throw error;
  }
  if (error instanceof ValidationError) {
    console.log(error);
    return;
  }

  console.log("Erro desconhecido");
  console.log(error.stack);
}

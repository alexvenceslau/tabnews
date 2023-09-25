function status(request, response) {
  response.status(200).json({ chave: "açentuação" });
}

export default status;

// functions/services.js
const { connectToDB } = require('./utils/db');
const { Servico } = require('./utils/models');

exports.handler = async (event, context) => {
  await connectToDB();
  const method = event.httpMethod;

  try {
    if (method === 'GET') {
      // Listar todos serviços
      const servicos = await Servico.find();
      return {
        statusCode: 200,
        body: JSON.stringify(servicos),
      };
    } else if (method === 'POST') {
      // Criar novo serviço
      const dados = JSON.parse(event.body);
      const novoServico = await Servico.create(dados);
      return {
        statusCode: 201,
        body: JSON.stringify(novoServico),
      };
    }
    // Aqui você pode implementar PUT, DELETE, etc.
    else {
      return {
        statusCode: 405,
        body: 'Método não suportado.',
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

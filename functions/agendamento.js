// functions/agendamento.js
const { connectToDB } = require('./utils/db');
const { Agendamento, Config } = require('./utils/models');

exports.handler = async (event, context) => {
  await connectToDB();
  const method = event.httpMethod;

  if (method === 'POST') {
    try {
      const dados = JSON.parse(event.body);
      const { nomeCliente, telefoneCliente, data, hora, servico } = dados;

      // Verifica se já existe agendamento nesse dia/hora
      const jaExistente = await Agendamento.findOne({ data, hora });
      if (jaExistente) {
        return {
          statusCode: 409,
          body: JSON.stringify({ message: 'Horário indisponível.' }),
        };
      }

      // Cria agendamento
      const novoAgendamento = await Agendamento.create({
        nomeCliente,
        telefoneCliente,
        data,
        hora,
        servico,
      });

      // Pega configuração para o redirecionamento
      const config = await Config.findOne();
      let whatsappNumber = config ? config.whatsappRedirect : '';

      // Monta URL de WhatsApp
      const mensagem = encodeURIComponent(
        `Olá! Quero confirmar meu agendamento para ${data} às ${hora}, serviço: ${servico}.`
      );
      const redirectUrl = `https://wa.me/${whatsappNumber}?text=${mensagem}`;

      return {
        statusCode: 200,
        body: JSON.stringify({ redirectUrl, agendamento: novoAgendamento }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  return {
    statusCode: 405,
    body: 'Método não suportado.',
  };
};

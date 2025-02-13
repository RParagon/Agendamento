// functions/agendamento.js
const { connectToDB } = require('./utils/db');
const { Agendamento, Config } = require('./utils/models');

exports.handler = async (event, context) => {
  const method = event.httpMethod;

  await connectToDB();

  if (method === 'POST') {
    try {
      const dados = JSON.parse(event.body);
      const { nomeCliente, telefoneCliente, data, hora, servico } = dados;

      // Verificar se já existe agendamento para o mesmo dia/hora
      const jaExistente = await Agendamento.findOne({ data, hora });
      if (jaExistente) {
        return {
          statusCode: 409, // Conflito
          body: JSON.stringify({
            message: 'Horário indisponível. Selecione outro horário.',
          }),
        };
      }

      // Criar agendamento
      const novoAgendamento = await Agendamento.create({
        nomeCliente,
        telefoneCliente,
        data,
        hora,
        servico,
      });

      // Buscar configuração para redirecionar ao WhatsApp
      const config = await Config.findOne();
      let whatsappRedirect = config ? config.whatsappRedirect : '';

      // Montar a URL de redirecionamento (WhatsApp)
      // Exemplo: https://wa.me/SEU_NUMERO?text=MENSAGEM...
      const mensagem = encodeURIComponent(
        `Olá! Quero confirmar meu agendamento para ${data} às ${hora}, serviço: ${servico}.`
      );
      const redirectUrl = `https://wa.me/${whatsappRedirect}?text=${mensagem}`;

      // Retornar URL para o front-end redirecionar
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

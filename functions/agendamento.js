const { createBooking } = require('./services');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, phone, email, service, date } = data;
    if (!name || !phone || !email || !service || !date) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Missing required fields' }) };
    }

    // Cria o agendamento no "banco de dados"
    const booking = await createBooking(data);

    // Gera a URL do WhatsApp para confirmação
    const message = `Olá ${name}, seu agendamento para ${service} em ${date} foi confirmado.`;
    const whatsappNumber = process.env.YOUR_PHONE_NUMBER || '5511999999999';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return {
      statusCode: 200,
      body: JSON.stringify({ booking, whatsappUrl })
    };
  } catch (error) {
    console.error('Erro em agendamento:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
    };
  }
};

function generateWhatsAppLink(appointment) {
  const baseUrl = 'https://wa.me/';
  const whatsappNumber = process.env.WHATSAPP_NUMBER || '5511999999999';
  
  const message = `Olá, gostaria de confirmar meu agendamento:
Nome: ${appointment.name}
Serviço: ${appointment.service}
Data: ${appointment.date.toLocaleDateString()}`;

  const encodedMessage = encodeURIComponent(message);
  return `${baseUrl}${whatsappNumber}?text=${encodedMessage}`;
}

module.exports = { generateWhatsAppLink };

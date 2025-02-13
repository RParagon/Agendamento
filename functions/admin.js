const { getAllBookings } = require('./services');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

exports.handler = async (event, context) => {
  // Apenas permite método GET
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Validação simples do token de autorização
  const token = event.headers.authorization;
  if (!token || token !== ADMIN_TOKEN) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    };
  }

  try {
    const bookings = await getAllBookings();
    return {
      statusCode: 200,
      body: JSON.stringify({ bookings })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
    };
  }
};

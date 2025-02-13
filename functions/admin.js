const clientPromise = require('./utils/db');
const jwt = require('jsonwebtoken');

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'supersecret';

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método não permitido' })
    };
  }

  const token = event.headers.authorization;
  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Não autorizado' })
    };
  }

  try {
    jwt.verify(token, ADMIN_SECRET);
  } catch (err) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Acesso negado' })
    };
  }

  try {
    const client = await clientPromise;
    const db = client.db('agendamentoDB');
    const appointments = await db.collection('appointments').find().toArray();

    return {
      statusCode: 200,
      body: JSON.stringify({ appointments })
    };
  } catch (error) {
    console.error('Erro ao obter agendamentos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno do servidor' })
    };
  }
};

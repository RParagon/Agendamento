// functions/admin.js
const { connectToDB } = require('./utils/db');
const { Config } = require('./utils/models');

exports.handler = async (event, context) => {
  await connectToDB();
  const method = event.httpMethod;

  try {
    if (method === 'GET') {
      const config = await Config.findOne();
      return {
        statusCode: 200,
        body: JSON.stringify(config),
      };
    } else if (method === 'POST' || method === 'PUT') {
      const data = JSON.parse(event.body);
      let config = await Config.findOne();
      if (!config) {
        config = await Config.create(data);
      } else {
        Object.assign(config, data);
        await config.save();
      }
      return {
        statusCode: 200,
        body: JSON.stringify(config),
      };
    } else {
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

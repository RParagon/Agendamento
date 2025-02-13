// functions/utils/models.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServicoSchema = new Schema({
  nome: String,
  descricao: String,
  preco: Number
});

const AgendamentoSchema = new Schema({
  nomeCliente: String,
  telefoneCliente: String,
  data: String,
  hora: String,
  servico: String
});

const ConfigSchema = new Schema({
  whatsappRedirect: String
});

const Servico = mongoose.model('Servico', ServicoSchema);
const Agendamento = mongoose.model('Agendamento', AgendamentoSchema);
const Config = mongoose.model('Config', ConfigSchema);

module.exports = { Servico, Agendamento, Config };

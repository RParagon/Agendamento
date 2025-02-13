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
  data: String,  // Ex: "2025-02-28"
  hora: String,  // Ex: "14:00"
  servico: String,
  // e quaisquer outras infos
});

const ConfigSchema = new Schema({
  whatsappRedirect: String
  // etc...
});

const Servico = mongoose.model('Servico', ServicoSchema);
const Agendamento = mongoose.model('Agendamento', AgendamentoSchema);
const Config = mongoose.model('Config', ConfigSchema);

module.exports = { Servico, Agendamento, Config };

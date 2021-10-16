const { Schema, model, Types } = require("mongoose");

const ClienteSchema = new Schema({
  nome: { type: String, required: true, trim: true },
  cpf: { type: Number, required: true },
  rg: { type: Number, required: true },
  endereco: { type: String, required: true },
  num: { type: Number, required: true },
  complemento: { type: String, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  tel: { type: Number, required: true },
  cel1: { type: Number, required: true },
  cel2: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  userLogadoId: { type: Types.ObjectId, ref: "Cliente", required: true },
});

const ClienteModel = model("Cliente", ClienteSchema);

module.exports = ClienteModel;

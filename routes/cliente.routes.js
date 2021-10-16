const { ObjectId } = require("mongoose").Types;
const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

const ClienteModel = require("../models/cliente/Cliente.models");

//create post , novo cliente
router.post(
  "/cliente",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const result = await ClienteModel.create({
        ...req.body,
        userLogadoId: req.currentUser._id,
      });
      return res.status(201).json(result);
    } catch (err) {
      return next(err);
    }
  }
);

//get listar todos clientes cadastrados
router.get("/cliente", async (req, res, next) => {
  try {
    const result = await ClienteModel.find({
      ...req.body,
    });
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

//patch listar clientes cadastrados por id
router.get("/cliente/:id", async (req, res, next) => {
  try {
    const result = await ClienteModel.findOne({
      _id: ObjectId(req.params.id),
      ...req.body,
    });

    if (!result) {
      return res.status(404).json({ msg: "Cliente não encontrado" });
    }
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

//patch alterar clientes cadastrados por id
router.patch("/cliente/:id", async (req, res, next) => {
  try {
    const result = await ClienteModel.findOneAndUpdate(
      { _id: ObjectId(req.params.id) },
      { $set: { ...req.body } },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ msg: "Cliente não encontrado" });
    }
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

//delete clientes cadastrados por id
router.delete("/cliente/:id", async (req, res, next) => {
  try {
    const result = await ClienteModel.deleteOne({
      _id: ObjectId(req.params.id),
    });
    if (result.deletedCount < 1) {
      return res.status(404).json({ msg: "Cliente não encontrado" });
    }

    return res.status(200).json({});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

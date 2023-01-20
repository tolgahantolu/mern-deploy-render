const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  title: String,
});

const todoModel = model("todo", todoSchema);
module.exports = todoModel;

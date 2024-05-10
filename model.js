const mongoose = require("mongoose");

const nike = new mongoose.Schema({
  nameCros: String,
  shoesSize: Number,
  clientname: String,
  phone: Number,
});

const Nike = mongoose.model("Shoes", nike);

module.exports = Nike;

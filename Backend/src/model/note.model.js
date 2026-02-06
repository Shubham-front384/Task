const mongoose = require("mongoose");

const studentDetailSchema = new mongoose.Schema({
  fullName: String,
  rollNo: Number,
  classRoom: String,
  address: String,
}, { timestamps: true });

const studentDetailModel = mongoose.model("studentDetails", studentDetailSchema);

module.exports = studentDetailModel;

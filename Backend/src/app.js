const express = require("express");
const studentDetailModel = require("./model/note.model");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static("./public"));

app.use('*name', (req, res) => {
  res.sendFile(path.join(__dirname, '..','/public/index.html'));
});

app.post("/api/student", async (req, res) => {
  const { fullName, classRoom, rollNo, address } = req.body;

  const studentInfo = await studentDetailModel.create({
    fullName,
    classRoom,
    rollNo,
    address
  });

  res.status(201).json({
    msg: "Student Detail Inserted Successfully",
    studentInfo
  });
});

app.patch("/api/student/:id", async (req, res) => {
  const { id } = req.params;
  const { fullName, classRoom, address, rollNo } = req.body;

  const updateStudentData = {};

  if (fullName !== undefined) updateStudentData.fullName = fullName;
  if (classRoom !== undefined) updateStudentData.classRoom = classRoom;
  if (address !== undefined) updateStudentData.address = address;
  if (rollNo !== undefined) updateStudentData.rollNo = rollNo;

  const studentInfo = await studentDetailModel.findByIdAndUpdate(id, updateStudentData, { new: true });

  res.status(200).json({
    msg: "Student Data Updated Successfully",
    studentInfo
  });
});

app.get("/api/student", async (req, res) => {
  const studentInfo = await studentDetailModel.find();

  res.status(200).json({
    msg: "Student Data Fetched!",
    studentInfo
  });
});

app.delete("/api/student/:id", async (req, res) => {
  const { id } = req.params;

  const studentInfo = await studentDetailModel.findByIdAndDelete(id);

  res.status(200).json({
    msg: "Student Data Deleted Successfully",
    studentInfo
  });
});

module.exports = app;

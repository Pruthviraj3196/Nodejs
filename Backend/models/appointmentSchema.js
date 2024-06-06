const mongoose = require("mongoose");
const validator = require('validator');

const  appointmentSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: [true, "First Name Is Required!"],
        minLength: [3, "First Name Must Contain At Least 3 Characters!"],
    },
    lastname: {
        type: String,
        required: [true, "Last Name Is Required!"],
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
    },
    email: {
        type: String,
        required: [true, "Email Is Required!"],
        validate: [validator.isEmail, "Provide A Valid Email!"],
    },
    phone: {
        type: String,
        required: [true, "Phone Is Required!"],
        minLength: [9, "Phone Number Must Contain Exact 11 Digits!"],
        maxLength: [9, "Phone Number Must Contain Exact 11 Digits!"],
    },
    nic: {
        type: String,
        required: [true, "NIC Is Required!"],
        minLength: [9, "NIC Must Contain Only 13 Digits!"],
        maxLength: [9, "NIC Must Contain Only 13 Digits!"],
    },
    dob: {
        type: Date,
        required: [true, "DOB Is Required!"],
    },
    gender: {
        type: String,
        required: [true, "Gender Is Required!"],
        enum: ["Male", "Female"],
    },
    appointment_date: {
        type: String,
        required: [true, "Appointment Date Is Required!"],
    },
    department: {
        type: String,
        required: [true, "Department Name Is Required!"],
    },
    doctor: {
        firstname: {
          type: String,
          required: [true, "Doctor Name Is Required!"],
        },
        lastname: {
          type: String,
          required: [true, "Doctor Name Is Required!"],
        },
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        required: [true, "Address Is Required!"],
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Doctor Id Is Invalid!"],
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Patient Id Is Required!"],
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
});

const appointmentModel = mongoose.model("Appointment", appointmentSchema);

module.exports = appointmentModel;
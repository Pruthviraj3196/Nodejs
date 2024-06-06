const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const {ErrorHandler} = require("../middlewares/error");
const appointmentModel = require("../models/appointmentSchema");
const userModel = require("../models/userSchema");

const  postAppointment = catchAsyncErrors(async(req, res, next) => {
    const {firstname, lastname, email, phone, nic, dob, gender, appointment_date, department,  doctor_firstName, doctor_lastName, hasVisited, address} = req.body;
    if(!firstname || !lastname || !email || !phone || !nic || !dob || !gender || !appointment_date || !department || !doctor_firstName || !doctor_lastName || !address){
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    };
    const isConflict = await userModel.find({
        firstname: doctor_firstName,
        lastname: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department,
    });

    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found", 404));
    };

    if (isConflict.length > 1) {
        return next(
          new ErrorHandler(
            "Doctors Conflict! Please Contact Through Email Or Phone!",
            400
          )
        );
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await appointmentModel.create({firstname,lastname, email, phone, nic, dob, gender, appointment_date, department, doctor:{firstname:doctor_firstName, lastname:doctor_lastName,}, hasVisited, address, doctorId, patientId});
    res.status(200).json({
        success: true,
        appointment,
        message: "Appointment Send!",
    });

});

const getAllAppointments  = catchAsyncErrors(async(req, res, next) => {
    const appointments = await appointmentModel.find();
    res.status(200).json({
        success: true,
        appointments,
    });
});

const updateAppointmentStatus = catchAsyncErrors(async(req, res, next) => {
    const { id } = req.params;
    let appointment = await appointmentModel.findById(id);
    if (!appointment){
        return next(new ErrorHandler("Appointment not found!", 404));
    };
    appointment = await appointmentModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Appointment Status Updated!",
        appointment,
    });
});

const deleteAppointment = catchAsyncErrors(async(req, res, next) => {
    const { id } = req.params;
    const appointment = await appointmentModel.findById(id);
    if (!appointment){
        return next(new ErrorHandler("Appointment Not Found!", 404));
    };
    await appointment.deleteOne();
    res.status(200).json({
        success: true,
        message: "Appointment Deleted!",
    });
});

const appointmentinfo = {
    postAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    deleteAppointment,
}

module.exports = appointmentinfo;
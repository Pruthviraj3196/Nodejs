const userModel = require("../models/userSchema");
const catchAsyncErrors = require("./catchAsyncErrors");
const { ErrorHandler } = require("./error");
const jwt = require('jsonwebtoken');

const  isAdminAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin is not Authenticated"), 400);
    }

    const decoded  = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await userModel.findById(decoded.id);
    if (req.user.role !== "Admin"){
        return next(new ErrorHandler(`${req.user.role} Not authorised for this resourses!`, 400))
    }
    next();
});

const  isPatientAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("Patient is not Authenticated"), 400);
    }

    const decoded  = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await userModel.findById(decoded.id);
    if (req.user.role !== "Patient"){
        return next(new ErrorHandler(`${req.user.role} Not authorised for this resourses!`, 400))
    }
    next();
})

module.exports = {
    isAdminAuthenticated,
    isPatientAuthenticated,
};
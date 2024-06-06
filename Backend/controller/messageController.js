const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const messageModel = require("../models/messageSchema");
const {ErrorHandler} = require("../middlewares/error");

const sendmessage = catchAsyncErrors(async (req, res, next) => {
    const {firstname, lastname, email, phone, message} = req.body;

    if(!firstname || !lastname || !email || !phone || !message){
       return next(new ErrorHandler("please fill full form!", 400));
    }
    await messageModel.create({firstname, lastname, email, phone, message});
    res.status(200).json({
        success: true, 
        message: "message send Successfully!",
    })
});

const getAllMessages = catchAsyncErrors(async(req, res, next) => {
    const messages = await messageModel.find();
    res.status(200).json({
        success: true,
        messages,
    })
});

const meassageinfo = {
    sendmessage,
    getAllMessages,
};

module.exports = meassageinfo;
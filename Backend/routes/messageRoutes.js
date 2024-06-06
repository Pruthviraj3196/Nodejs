const express = require("express");
const meassageinfo = require("../controller/messageController");
const { isAdminAuthenticated } = require("../middlewares/auth");


const router = express.Router();

router.post("/send", meassageinfo.sendmessage);
router.get("/getallmessage", isAdminAuthenticated, meassageinfo.getAllMessages);

module.exports = router;


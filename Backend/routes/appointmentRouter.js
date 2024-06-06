const express = require("express");
const appointmentinfo = require("../controller/appointmentController");
const { isPatientAuthenticated, isAdminAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/post", isPatientAuthenticated, appointmentinfo.postAppointment);
router.get("/getallappointment", isAdminAuthenticated, appointmentinfo.getAllAppointments);
router.put("/upadte/:id", isAdminAuthenticated, appointmentinfo.updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, appointmentinfo.deleteAppointment);


module.exports = router;
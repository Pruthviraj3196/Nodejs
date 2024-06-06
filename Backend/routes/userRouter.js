const express = require("express");
const userinfo = require("../controller/userController");
const { isAdminAuthenticated, isPatientAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/patient/register", userinfo.patientRegister);
router.post("/login", userinfo.login);
router.post("/admin/addnew", isAdminAuthenticated, userinfo.addNewAdmin);
router.get("/doctors", userinfo.getAllDoctors);
router.get("/patient/me", isPatientAuthenticated, userinfo.getUserDetails);
router.get("/admin/me", isAdminAuthenticated, userinfo.getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, userinfo.logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, userinfo.logoutPatient);
router.post("/doctor/addnew", isAdminAuthenticated, userinfo.addNewDoctor);

module.exports = router;
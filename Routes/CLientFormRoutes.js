const express = require('express');
const router = express.Router();
const registrationController = require('../Controller/ClientFromController');
const {clientUpload} = require('../Middleware/upload');



router.post('/add',clientUpload, registrationController.addRegistration);
router.put('/update/:id', registrationController.updateRegistration)
router.post('/transfer',registrationController.transferClientForms);
router.get('/getAll', registrationController.getAllRegistrations);
router.get('/get-transferred/:transferredTo', registrationController.getRegistrationsByTransferredTo);
router.get('/getbyId/:id', registrationController.getRegistrationById);
router.get('/getbyleadId/:leadId', registrationController.getRegistrationByLeadId);
router.post('/apply-interview', registrationController.ApplyInterview);

router.get("/get-by-interview/:InterviewManagerId",registrationController.getLeadsByInterviewManager);

router.put("/mark-interview/:id", registrationController.markInterview);
module.exports = router;

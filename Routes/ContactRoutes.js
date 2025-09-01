const express = require('express');
const router = express.Router();
const ContactsController = require('../Controller/ContactsController');


router.post('/upload-leads', ContactsController.uploadLeads);
router.get('/get-leads', ContactsController.getLeads);
router.get('/get-passport-holder-leads/:assignedToId', ContactsController.getPassportHolderLeads);
router.post('/assign-leads', ContactsController.assignLeads);
router.post('/deassign-leads', ContactsController.deassignLeads);
router.put('/form-filled/:id', ContactsController.updateFormFilled);
router.put('/update-lead-status/:id', ContactsController.updateLeadStatus);
router.get('/get-assigned-leads/:assignedToId', ContactsController.getLeadsByAssignedTo);
router.get('/getbyId/:id',ContactsController.getContactById );
router.get('/get-transferredTo-leads/:id', ContactsController.getLeadsByTransferredTo);

module.exports = router;
    
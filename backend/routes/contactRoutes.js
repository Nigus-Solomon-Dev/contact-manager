const express = require('express');
const auth = require('../middleware/auth');
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');
const router = express.Router();

router.get('/', auth, getContacts);
router.post('/', auth, createContact);
router.put('/:id', auth, updateContact);
router.delete('/:id', auth, deleteContact);

module.exports = router;
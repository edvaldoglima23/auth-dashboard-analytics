const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/', salesController.getAll);
router.post('/', salesController.create);
router.put('/:id', salesController.update);
router.delete('/:id', salesController.remove);
router.get('/metrics', salesController.metrics);

module.exports = router; 
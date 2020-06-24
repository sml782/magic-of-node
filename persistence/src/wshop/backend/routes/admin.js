const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');

router.get('/products', admin.list);

router.put('/product', admin.add);

router.delete('/product', admin.delete);

module.exports = router;

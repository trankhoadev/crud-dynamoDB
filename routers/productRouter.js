const router = require("express").Router();
/* import controller */
let productCtrl = require('../controllers/productController')

router.get('/', productCtrl.getAllProduct);

module.exports = router;
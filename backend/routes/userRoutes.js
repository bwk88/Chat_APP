const express = require('express');
const { allUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware')

const { registerUser, authUser } = require("../controllers/userController")

const router = express.Router();


router.route("/").post(registerUser).get(protect,allUsers);
router.post('/login',authUser);

module.exports = router;
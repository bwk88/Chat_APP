const express = require('express');
const { protect } = require('../middleware/authMiddleware')
const { accessChat } = require("../controllers/chatController")
const { fetchChats } = require("../controllers/chatController")
const { createGroupChat } = require("../controllers/chatController")
const { renameGroup } = require("../controllers/chatController")
const { addToGroup } = require("../controllers/chatController");
const { removeFromGroup } = require("../controllers/chatController");
const router = express.Router();

router.route("/").post(protect,accessChat) //chat creation
router.route("/").get(protect,fetchChats);
router.route("/group").post(protect,createGroupChat);
router.route("/rename").put(protect,renameGroup);
router.route("/groupadd").put(protect,addToGroup);
router.route("/groupremove").put(protect,removeFromGroup);

module.exports = router;
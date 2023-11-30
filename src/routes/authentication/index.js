const express = require("express");
const {
  createCookieToken,
  logout,
} = require("../../api/petCategory/authintication/controllers");
const router = express.Router();

router.post("/jwt", createCookieToken);
//if user logout
router.post("/logout", logout);
module.exports = router;

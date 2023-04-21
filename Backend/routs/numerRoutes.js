const express = require("express");
const {GetNumer, Root} = require("../controller/numerControler");

const router = express.Router();
router.get('/Root',Root);
const testRouter = express.Router();
testRouter.get('/',GetNumer);

module.exports = {router, testRouter};
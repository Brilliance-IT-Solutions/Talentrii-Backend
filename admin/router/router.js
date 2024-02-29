const express = require('express');
const adminRouter = express.Router();
const authenticate = require('../../server/middleware/authenticate')

const loginDB = require("../controllerDB/signInDB")
const GetAllUsersDB = require("../controllerDB/GetAllUsersDB")
const GetLastSevenDaysUser = require("../controllerDB/GetUserCountLastSevenDay")


adminRouter.post("/login", loginDB.loginDB)
adminRouter.get("/getAllUsers", authenticate, GetAllUsersDB.getAllUserDataDB)
adminRouter.get("/getLastDaysUser", authenticate, GetLastSevenDaysUser.getUserCountLastSevenDays)

module.exports = adminRouter;
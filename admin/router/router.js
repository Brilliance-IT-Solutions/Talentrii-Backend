const express = require('express');
const adminRouter = express.Router();
const authenticate = require('../../server/middleware/authenticate')

const loginDB = require("../controllerDB/signInDB")
const GetAllUsersDB = require("../controllerDB/GetAllUsersDB")
const GetLastSevenDaysUser = require("../controllerDB/GetUserCountLastSevenDay")
const updateUserStatusDB = require("../controllerDB/UpdateUserStatusDB")
const deleteUserDB = require("../controllerDB/deteleUserDB")
const serachUserDB = require("../controllerDB/searchUserDB")

adminRouter.post("/login", loginDB.loginDB)
adminRouter.get("/getAllUsers", authenticate, GetAllUsersDB.getAllUserDataDB)
adminRouter.get("/getLastDaysUser", authenticate, GetLastSevenDaysUser.getUserCountLastSevenDays)
adminRouter.post("/updateUserStatus", authenticate, updateUserStatusDB.updateUserStatusDB)
adminRouter.delete("/deleteUser", authenticate, deleteUserDB.deleteUserDB)
adminRouter.get("/searchUser", authenticate, serachUserDB.searchUserDB)

module.exports = adminRouter;
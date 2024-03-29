const express = require('express');
const adminRouter = express.Router();
const authenticate = require('../../server/middleware/authenticate')

const loginDB = require("../controllerDB/signInDB")
const GetAllUsersDB = require("../controllerDB/GetAllUsersDB")
const getUserCountByDate = require("../controllerDB/GetUserCountByDate")
const updateUserStatusDB = require("../controllerDB/UpdateUserStatusDB")
const deleteUserDB = require("../controllerDB/deteleUserDB")
const serachUserDB = require("../controllerDB/searchUserDB")

adminRouter.post("/login", loginDB.loginDB)
adminRouter.get("/getAllUsers", authenticate, GetAllUsersDB.getAllUserDataDB)
adminRouter.get("/getLastDaysUser", authenticate, getUserCountByDate.getUserCountByDate)
adminRouter.put("/updateUserStatus/:id", authenticate, updateUserStatusDB.updateUserStatusDB)
adminRouter.delete("/deleteUser/:id", authenticate, deleteUserDB.deleteUserDB)
adminRouter.get("/searchUser", authenticate, serachUserDB.searchUserDB)

module.exports = adminRouter;
const jsonResponse = require("../../server/utility/jsonResponse")
const statusCode = require('http-status-codes')
const sqlConnect = require("../../server/database/connection")
const {dataTypeEnum,procedureEnumAdmin,errorEnumAdmin} = require("../../server/database/databaseEnums")
const genericFunc = require("../../server/utility/genericFunctions")
const { updateUserStatus } = require("../schemas/UsersSchema")


const updateUserStatusDB = () =>{
    return{
         updateUserStatusDB : (req,res,next)=>{
             const successFn = (result) =>{
                jsonResponse.successHandler(res,next,result)
             }

             const errFn = (result,statusCode) =>{
                jsonResponse.errorHandler(res,next,result,statusCode)
             }

             req.body.userId = req.user.id
             if(genericFunc.validator(req.body,updateUserStatus,errFn)== true) 
             return;

             const inputObject = [
                genericFunc.inputparams("userId", dataTypeEnum.int,req.user.id),
                genericFunc.inputparams("id", dataTypeEnum.int,req.params.id),
                genericFunc.inputparams("status", dataTypeEnum.int,req.body.status),
                genericFunc.inputparams("statusReason", dataTypeEnum.varChar,req.body.statusReason ? req.body.statusReason : null),

             ]
             sqlConnect.connectDb(req,errFn,procedureEnumAdmin.proc_admin_update_status,inputObject,errorEnumAdmin.proc_admin_update_status,
                function(result){
                    if(result.length > 0){
                        if(result[0]){
                            let data = result[0]
                            if(data[0].message === "user status updated successfully"){
                                const response ={
                                    "message":data[0].message,
                                    "data":data[0]
                                }
                                successFn(response)
                            }else{
                                const response ={
                                    "message":data[0].message || "couldn't update user status",
                                   
                                }
                                errFn(response)
                            }
                        }
                    }

                })
         }

        }
}

module.exports = updateUserStatusDB();
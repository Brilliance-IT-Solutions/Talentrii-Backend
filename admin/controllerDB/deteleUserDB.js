const jsonResponse = require("../../server/utility/jsonResponse")
const statusCode = require('http-status-codes')
const sqlConnect = require("../../server/database/connection")
const {dataTypeEnum,procedureEnumAdmin,errorEnumAdmin} = require("../../server/database/databaseEnums")
const genericFunc = require("../../server/utility/genericFunctions")
const { updateUserStatus } = require("../schemas/UsersSchema")


const deleteUserDB = () =>{
    return{
        deleteUserDB : (req,res,next)=>{
             const successFn = (result) =>{
                jsonResponse.successHandler(res,next,result)
             }

             const errFn = (result,statusCode) =>{
                jsonResponse.errorHandler(res,next,result,statusCode)
             }

             const inputObject = [
                genericFunc.inputparams("userId", dataTypeEnum.int,req.user.id),
                genericFunc.inputparams("id", dataTypeEnum.int,req.body.id),

             ]
             sqlConnect.connectDb(req,errFn,procedureEnumAdmin.proc_admin_delete_user,inputObject,errorEnumAdmin.proc_admin_delete_user,
                function(result){
                    if(result.length > 0){
                        if(result[0]){
                            let data = result[0]
                            if(data[0].message === "user deleted successfully"){
                                const response ={
                                    "message":data[0].message,
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

module.exports = deleteUserDB();
const jsonResponse = require("../../utility/jsonResponse")
const sqlConnect = require("../../database/connection")
const {dataTypeEnum,procedureEnum,errorEnum} = require("../../database/databaseEnums")
const genericFunctions = require("../../utility/genericFunctions")
const statusCode = require("http-status-codes")
const {editChallengeSchema} = require("../../schemas/createChallengeSchema")

const editChallengeDB = () =>{
    return{
        editChallengeDB : async(req,res,next) =>{
            const successFn = (result)=>{
               jsonResponse.successHandler(res,next,result) 
            }

            const errFn = (err,statusCode)=>{
                jsonResponse.errorHandler(res,next,err,statusCode)
            }

            req.body.userId = req.user.id
            if(genericFunctions.validator(req.body,editChallengeSchema,errFn) == true)
            return;

            const inputObject = [
                genericFunctions.inputparams("userId",dataTypeEnum.int,req.user.id),
                genericFunctions.inputparams("challengeId",dataTypeEnum.int,req.body.challengeId),
                genericFunctions.inputparams("title",dataTypeEnum.varChar,req.body.title ? req.body.title : null),
                genericFunctions.inputparams("description",dataTypeEnum.varChar,req.body.description ? req.body.description : null)
            ]

            sqlConnect.connectDb(req,errFn,procedureEnum.proc_update_Challenge,inputObject,errorEnum.proc_update_Challenge,function (result){
                if(result){
                    if(result.length > 0){
                        if(result[0][0].message === "Challange Updated"){
                            const response ={
                                "message" : result[0][0].message,
                                data:result[0][0]
                            }
                            successFn(response)
                        }else{
                            const response = {
                                "message" : result[0][0].message,
                            }
                            errFn(response,statusCode.StatusCodes.NOT_FOUND)
                        }
                    }
                }
            })
        }
    }
}

module.exports = editChallengeDB();
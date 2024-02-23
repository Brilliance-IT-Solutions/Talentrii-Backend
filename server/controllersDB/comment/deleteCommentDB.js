const { dataTypeEnum, procedureEnum, errorEnum } = require('../../database/databaseEnums');
const genericFunctions = require('../../utility/genericFunctions');
const jsonResopnse = require("../../utility/jsonResponse")
const sqlConnect = require("../../database/connection")
const statusCode = require("http-status-codes");
const {deleteCommentByIdSchema} = require("../../schemas/commentSchema")

const deleteCommentDB = () =>{
    return {
        deleteCommentDB : async(req,res,next)=>{
            const successFn = (result) =>{
                jsonResopnse.successHandler(res,next,result)
            }

            const errFn = (err,statusCode) =>{
                jsonResopnse.errorHandler(res,next,err,statusCode)

            }

            req.query.userId = req.user.id
            if(genericFunctions.validator(req.query,deleteCommentByIdSchema,errFn)==true)
            return;

            const inputObject = [
                genericFunctions.inputparams("userId", dataTypeEnum.int ,req.user.id),
                genericFunctions.inputparams("id",dataTypeEnum.int,req.query.id)
            ]

             sqlConnect.connectDb(req, errFn, procedureEnum.proc_delete_comments, inputObject, errorEnum.proc_delete_comments, function (result) {
                if(result){
                    if(result.length >0){
                       if(result[0][0].message === "comment deleted successfully"){
                          const response ={
                            "message" : result[0][0].message
                          }
                          successFn(response)
                       }else{
                        const response ={
                            "message" : result[0][0].message
                          }
                          errFn(response, statusCode.StatusCodes.UNAUTHORIZED)
                       }
                    }
                }
            })

        }
    };
}

module.exports = deleteCommentDB();
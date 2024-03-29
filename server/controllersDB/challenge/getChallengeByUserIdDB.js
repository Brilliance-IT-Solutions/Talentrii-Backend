const StatusCodes=require("http-status-codes")

const {dataTypeEnum,procedureEnum, errorEnum} = require("../../database/databaseEnums")
const sqlConnect = require("../../database/connection")

const genericFunctions =require("../../utility/genericFunctions")

const jsonResponse = require("../../utility/jsonResponse")
const {getChallengeByUserIdSchema} = require("../../schemas/createChallengeSchema")
const getChallengeByUserIdDB = () =>{
    return {
        getChallengeByUserIdDB : async (req,res,next)=>{
            const page = req.query.page;
            const pageSize = req.query.pageSize;
            const startIdx = (page - 1) * pageSize;
            const successFn = (result)=>{
               jsonResponse.successHandler(res,next,result)
            }
            const errFn = (err,statusCode) =>{
                jsonResponse.errorHandler(res,next,err,statusCode)
            }

             if(genericFunctions.validator(req.query,getChallengeByUserIdSchema,errFn)===true)
             return;

            const inputObject =[
                genericFunctions.inputparams("userId",dataTypeEnum.varChar,req.query.userId),
                genericFunctions.inputparams("type",dataTypeEnum.varChar,req.query.type),
                genericFunctions.inputparams("startIdx", dataTypeEnum.varChar, startIdx),
                genericFunctions.inputparams("pageSize", dataTypeEnum.varChar, pageSize),

            ]

            sqlConnect.connectDb(req,errFn,procedureEnum.proc_get_challengesByUserId,inputObject,errorEnum.proc_get_challengesByUserId,
                async function(result){
                    if(result.length > 0){
                        if(result[0]){
                            let data = result[0]
                            if(data.length > 0 && (data[0].message = "Challenge Success")){
                                const media = await genericFunctions.addMediaInChallenges(result[0])
                                let response={
                                    "message":"Challenge Succeed",
                                    "data":media,
                                     pagination:{totalCount:data[0].total_count,startIdx:startIdx,pageSize:pageSize}
                                }
                                successFn(response)
                            }else{
                                let response={
                                    "message":"No challenge found",
                                    "data":[]
                                }
                                successFn(response)
                            }
                        }
                    }else{
                        errFn(result,StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
                    }
                })


        }
    }

    
}

module.exports= getChallengeByUserIdDB();
const StatusCodes=require("http-status-codes")

const {dataTypeEnum,procedureEnum, errorEnum} = require("../../database/databaseEnums")
const sqlConnect = require("../../database/connection")

const genericFunctions =require("../../utility/genericFunctions")

const jsonResponse = require("../../utility/jsonResponse")
const {userIdSchema} = require("../../schemas/userIdSchema")
const getChallengeByUserIdDB = () =>{
    return {
        getChallengeByUserIdDB : async (req,res,next)=>{
            const successFn = (result)=>{
               jsonResponse.successHandler(res,next,result)
            }
            const errFn = (err,statusCode) =>{
                jsonResponse.errorHandler(res,next,err,statusCode)
            }

             if(genericFunctions.validator(req.query,userIdSchema,errFn)===true)
             return;

            const inputObject =[
                genericFunctions.inputparams("userId",dataTypeEnum.varChar,req.query.userId)
            ]

            sqlConnect.connectDb(req,errFn,procedureEnum.proc_getChallenges_By_UserId,inputObject,errorEnum.proc_getChallenges_By_UserId,
                async function(result){
                    if(result.length > 0){
                        if(result[0]){
                            let data = result[0]
                            if(data && data[0] && data[0].length > 0 && (data[0].message = "Challenge Success")){
                                const resultdata = await groupChallenges(result[0])
                                let response={
                                    "message":"Challenge Succeed",
                                    "data":resultdata
                                }
                                successFn(response)
                            }else{
                                const resultdata = await groupChallenges(result[0])
                                let response={
                                    "message":"Challenge Succeed",
                                    "data":resultdata
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

async function groupChallenges(arr) {
    const today = new Date().toString().slice(0, 10); 
    const groupedChallenges = {}; 
    for (const obj of arr) {
      const category = obj.category;
      const startDate = obj.startDate?.toString().slice(0, 10);
      const targetKey = startDate === today ? "upcomingChallenge" : "pastChallenge";
      groupedChallenges[category] ??= { upcomingChallenge: [], pastChallenge: [] }; 
      groupedChallenges[category][targetKey].push(obj);
    }
    return groupedChallenges;
  }

module.exports= getChallengeByUserIdDB();
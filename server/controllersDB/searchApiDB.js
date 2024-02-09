const genericFunctions = require("../utility/genericFunctions")
const jsonResponse = require("../utility/jsonResponse")
const {dataTypeEnum,procedureEnum,errorEnum} = require("../database/databaseEnums")
const sqlConnect = require("../database/connection")
const StatusCodes = require("http-status-codes");
const { searchSchema } = require("../schemas/searchSchema");

const searchApiDB = () =>{
    return{searchApiDB : async  (req,res,next) =>{
        const successFn = (response) =>{
            jsonResponse.successHandler(res,next,response)
        }
        const errFn = (err,statusCode) =>{
            jsonResponse.errorHandler(res,next,err,statusCode)
        }

        req.query.userId = req.user.id
        if(genericFunctions.validator(req.query,searchSchema,errFn)===true) 
        return;
        
        const inputObject = [
            genericFunctions.inputparams("userId",dataTypeEnum.varChar,req.user.id),
            genericFunctions.inputparams("searchTerm",dataTypeEnum.varChar,req.query.searchTerm)
        ]

        sqlConnect.connectDb(req,errFn,procedureEnum.proc_search_challenge,inputObject,errorEnum.proc_search_challenge,
            async function (result){
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
module.exports = searchApiDB();
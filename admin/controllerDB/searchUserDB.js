const genericFunctions = require("../../server/utility/genericFunctions")
const jsonResponse = require("../../server/utility/jsonResponse")
const {dataTypeEnum,procedureEnumAdmin,errorEnumAdmin} = require("../../server/database/databaseEnums")
const sqlConnect = require("../../server/database/connection")
const StatusCodes = require("http-status-codes");
const { searchSchema } = require("../../server/schemas/searchSchema");

const searchUserDB = () =>{
    return{
        searchUserDB : async  (req,res,next) =>{
        const successFn = (response) =>{
            jsonResponse.successHandler(res,next,response)
        }
        const errFn = (err,statusCode) =>{
            jsonResponse.errorHandler(res,next,err,statusCode)
        }

      
        const inputObject = [
            genericFunctions.inputparams("userId",dataTypeEnum.varChar,req.user.id),
            genericFunctions.inputparams("search",dataTypeEnum.varChar,req.query.search)
        ]

        sqlConnect.connectDb(req,errFn,procedureEnumAdmin.proc_admin_get_searchResult,inputObject,errorEnumAdmin.proc_admin_get_searchResult,
            async function (result){
                if(result.length > 0){
                    if(result[0]){
                        let data = result[0]
                        if(data[0] && data.length > 0  && (data[0].message = "search Success")){
                            let response={
                                "message":"Success",
                                "data":data
                            }
                            successFn(response)
                        }else{
                            let response={
                                "message":"No search result found",
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


module.exports = searchUserDB();
const sqlConnect = require('../../database/connection');
const genericFunc = require('../../utility/genericFunctions');
const jsonResponse = require('../../utility/jsonResponse')
const { dataTypeEnum, procedureEnum, errorEnum } = require('../../database/databaseEnums');
const statusCode = require("http-status-codes")
const schema = require("../../schemas/followUserSchema")

const FollowUserDB = () => {
    return {
        FollowUserDB: async (req, res, next) => {
            const successFn = (result) => {
                jsonResponse.successHandler(res, next, result)
            }
            const errFn = (err,statusCode) => {
                jsonResponse.errorHandler(res, next, err,statusCode)
            }

            if(genericFunc.validator(req.body,schema,errFn) == true)
            return;

            const inputObject = [
                genericFunc.inputparams("ByUser", dataTypeEnum.int, req.user.id),
                genericFunc.inputparams("toUser", dataTypeEnum.int, req.body.toUser),
                genericFunc.inputparams("isFollow", dataTypeEnum.varChar, req.body.isFollow),
            ]

            sqlConnect.connectDb(req, errFn, procedureEnum.proc_Follow_User, inputObject, errorEnum.proc_Follow_User, function (result) {
                if (result) {
                    if (result[0]) {
                        let data = result[0]
                        if (data[0].message === 'Success') {
                            response = {
                                'message': data.message,
                                'data': result[0]
                            }
                            successFn(response);
                        } else {
                            errFn(result[0],statusCode.StatusCodes.BAD_REQUEST);
                        }
                    }
                }else{
                    errFn(result[0],statusCode.StatusCodes.BAD_REQUEST)
                }
                
            })
        }
    }
}
module.exports = FollowUserDB();
const sqlConnect = require('../database/connection');
const genericFunc = require('../utility/genericFunctions');
const jsonResponse = require('../utility/jsonResponse')
const { dataTypeEnum, procedureEnum, errorEnum } = require('../database/databaseEnums');
const statusCode = require("http-status-codes")

const FollowUserDB = () => {
    return {
        FollowUserDB: async (req, res, next) => {
            const successFn = (result) => {
                jsonResponse.successHandler(res, next, result)
            }
            const errFn = (err,statusCode) => {
                jsonResponse.errorHandler(res, next, err,statusCode)
            }

            const inputObject = [
                genericFunc.inputparams("requestedByUser", dataTypeEnum.varChar, req.user.id),
                genericFunc.inputparams("toUser", dataTypeEnum.varChar, req.body.toUser),
                genericFunc.inputparams("isFollow", dataTypeEnum.varChar, req.body.isFollow),
            ]

            sqlConnect.connectDb(req, errFn, procedureEnum.proc_Follow_User, inputObject, errorEnum.proc_Follow_User, function (result) {
                if (result.length > 0) {
                    if (result[0]) {
                        let data = result[0]
                        if (data[0].message === 'Success') {
                            response = {
                                'message': data.message,
                                'data': result[0]
                            }
                            successFn(response);
                        } else {
                            response = {
                                'message': data.message
                            }
                            errFn(response,statusCode.StatusCodes.BAD_REQUEST);
                        }
                    }
                }
            })
        }
    }
}
module.exports = FollowUserDB();
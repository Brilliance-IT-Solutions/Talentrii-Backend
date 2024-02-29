const sqlConnect = require('../../database/connection');
const genericFunc = require('../../utility/genericFunctions');
const jsonResponse = require('../../utility/jsonResponse')
const { dataTypeEnum, procedureEnum, errorEnum } = require('../../database/databaseEnums');
const statusCode = require("http-status-codes");
const { savedSchema } = require('../../schemas/savedSchema');

const challengeSavedDB = () => {
    return {
        challengeSavedDB: async (req, res, next) => {
            const successFn = (result) => {
                jsonResponse.successHandler(res, next, result)
            }
            const errFn = (err,statusCode) => {
                jsonResponse.errorHandler(res, next, err,statusCode)
            }

            if(genericFunc.validator(req.body,savedSchema,errFn)==true) return;

            const inputObject = [
                genericFunc.inputparams("userId", dataTypeEnum.int, req.user.id),
                genericFunc.inputparams("challengeId", dataTypeEnum.int, req.body.challengeId),
                genericFunc.inputparams("saved", dataTypeEnum.bit, req.body.saved)               
            ]

            sqlConnect.connectDb(req, errFn, procedureEnum.proc_post_saveChallenge, inputObject, errorEnum.proc_post_saveChallenge, function (result) {
                if (result) {
                    if (result[0][0]) {
                        let data = result[0][0]
                        if (data.message === 'Saved Success' || data.message === 'updated saved') {
                            response = {
                                'message': data.message,
                                'data': data
                            }
                            successFn(response);
                        } else {
                            response = {
                                'message': data.message
                            }
                            errFn(response,statusCode.StatusCodes.BAD_REQUEST);
                        }
                    }
                }else{
                    errFn(result[0],statusCode.StatusCodes.BAD_REQUEST);
                }
            })
        }
    }
}
module.exports = challengeSavedDB();
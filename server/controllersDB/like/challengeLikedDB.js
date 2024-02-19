const sqlConnect = require('../../database/connection');
const genericFunc = require('../../utility/genericFunctions');
const jsonResponse = require('../../utility/jsonResponse')
const { dataTypeEnum, procedureEnum, errorEnum } = require('../../database/databaseEnums');
const statusCode = require("http-status-codes");
const { likeSchema } = require('../../schemas/likeSchema');

const challengeLikedDB = () => {
    return {
        challengeLikedDB: async (req, res, next) => {
            const successFn = (result) => {
                jsonResponse.successHandler(res, next, result)
            }
            const errFn = (err,statusCode) => {
                jsonResponse.errorHandler(res, next, err,statusCode)
            }

            if(genericFunc.validator(req.body,likeSchema,errFn)==true) return;

            const inputObject = [
                genericFunc.inputparams("userId", dataTypeEnum.int, req.user.id),
                genericFunc.inputparams("challengeId", dataTypeEnum.int, req.body.challengeId),
                genericFunc.inputparams("status", dataTypeEnum.varChar, req.body.status)               
            ]

            sqlConnect.connectDb(req, errFn, procedureEnum.proc_like_challange, inputObject, errorEnum.proc_like_challange, function (result) {
                if (result) {
                    if (result[0][0]) {
                        let data = result[0][0]
                        if (data.message === 'Liked Success' || data.message === 'updated media likes') {
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
module.exports = challengeLikedDB();
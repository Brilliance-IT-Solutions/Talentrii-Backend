const sqlConnect = require('../../database/connection');
const genericFunc = require('../../utility/genericFunctions');
const jsonResponse = require('../../utility/jsonResponse')
const { dataTypeEnum, procedureEnum, errorEnum } = require('../../database/databaseEnums');
const statusCode = require("http-status-codes");
const { addCommentsByChallengeIdSchema } = require('../../schemas/commentSchema');

const challengeCommentedDB = () => {
    return {
        challengeCommentedDB: async (req, res, next) => {
            const successFn = (result) => {
                jsonResponse.successHandler(res, next, result)
            }
            const errFn = (err,statusCode) => {
                jsonResponse.errorHandler(res, next, err,statusCode)
            }   
            req.body.userId = req.user.id
            if(genericFunc.validator(req.body,addCommentsByChallengeIdSchema,errFn)=== true)
            return;

            const inputObject = [
                genericFunc.inputparams("userId", dataTypeEnum.int, req.user.id),
                genericFunc.inputparams("challengeId", dataTypeEnum.int, req.body.challengeId),
                genericFunc.inputparams("comments", dataTypeEnum.varChar, req.body.comments)               
            ]

            sqlConnect.connectDb(req, errFn, procedureEnum.proc_comment_challange, inputObject, errorEnum.proc_comment_challange, function (result) {
                if (result.length > 0) {
                    if (result[0][0]) {
                        let data = result[0][0]
                        if (data.message === 'Comment Success') {
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
                }
            })
        }
    }
}
module.exports = challengeCommentedDB();
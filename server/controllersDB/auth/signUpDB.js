const sqlConnect = require('../../database/connection');
const genericFunc = require('../../utility/genericFunctions');
const jsonResponse = require('../../utility/jsonResponse')
const { dataTypeEnum, procedureEnum, errorEnum } = require('../../database/databaseEnums');
const {signUpSchema} = require("../../schemas/userSchema");
const statusCode = require("http-status-codes");
const constants = require('../../utility/constants');
const signUpDB = () => {
    return {
        signUpDB: async (req, res, next) => {
            const successFn = (result) => {
                jsonResponse.successHandler(res, next, result)
            }
            const errFn = (err) => {
                jsonResponse.errorHandler(res, next, err)
            }
            if(genericFunc.validator(req.body,signUpSchema,errFn) == true)
            return;

            const inputObject = [
                genericFunc.inputparams('firstName', dataTypeEnum.varChar, req.body.firstName),
                genericFunc.inputparams('emailId', dataTypeEnum.varChar, req.body.emailId),
                genericFunc.inputparams('passsword', dataTypeEnum.varChar, req.body.password ? genericFunc.encrypt(req.body.password):''),
                genericFunc.inputparams('authProvider', dataTypeEnum.varChar, req.body.authProvider),
                genericFunc.inputparams('profileImage', dataTypeEnum.varChar, req.body.profileImage ? req.body.profileImage : constants.defaultImage),
            ]

            sqlConnect.connectDb(req, errFn, procedureEnum.proc_post_signUp, inputObject, errorEnum.proc_post_signUp, function (result) {
                let data = result[0][0]
                if (data.message === 'Sign Up Success') {
                    response = {
                        'message': data.message,
                        'token': genericFunc.generateTokenLink(data),
                        'data': data
                    }
                    successFn(response);
                } else {
                    response = {
                        'message': data.message
                    }
                    errFn(response);
                }
            })
        }
    }
}
module.exports = signUpDB();
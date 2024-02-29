const sqlConnect = require('../../server/database/connection');
const genericFunc = require('../../server/utility/genericFunctions');
const jsonResponse = require('../../server/utility/jsonResponse')
const { dataTypeEnum, procedureEnumAdmin, errorEnumAdmin } = require('../../server/database/databaseEnums');
const statusCode = require("http-status-codes")
const {signInSchema} = require("../../server/schemas/userSchema")

const loginDB = () => {
    return {
        loginDB: async (req, res, next) => {
          try{
            const successFn = (result) => {
                jsonResponse.successHandler(res, next, result)
            }
            const errFn = (err,statusCode) => {
                jsonResponse.errorHandler(res, next, err,statusCode)
            }

            if(genericFunc.validator(req.body,signInSchema,errFn) == true)
            return;

            const inputObject = [
                genericFunc.inputparams('emailId', dataTypeEnum.varChar, req.body.emailId),
                genericFunc.inputparams('password', dataTypeEnum.varChar, req.body.password),
                genericFunc.inputparams('authProvider', dataTypeEnum.varChar, req.body.authProvider)
            ]


            sqlConnect.connectDb(req, errFn, procedureEnumAdmin.proc_admin_post_login, inputObject, errorEnumAdmin.proc_admin_post_login, function (result) {
                if (result.length > 0) {
                    if (result[0][0]) {
                        let data = result[0][0]
                        if (data.message === 'Login Success') {
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
                            errFn(response,statusCode.StatusCodes.BAD_REQUEST);
                        }
                    }
                }
            })
        }
        catch(error){
            errFn(error,statusCode.StatusCodes.BAD_REQUEST);
        }
    }
}
}
module.exports = loginDB();
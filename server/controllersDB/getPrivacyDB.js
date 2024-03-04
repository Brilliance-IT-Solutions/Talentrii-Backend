// const statusCode = require('http-status-codes')
// const sqlConnect = require('../database/connection');
// const genericFunc = require('../utility/genericFunctions');
// const jsonResponse = require('../utility/jsonResponse')
// const { dataTypeEnum, procedureEnum, errorEnum } = require('../database/databaseEnums');

// const getPrivacyDB = () => {
//     return {
//         getPrivacyDB: async (req, res, next) => {
//             const successFn = (result) => {
//                 jsonResponse.successHandler(res, next, result)
//             }
//             const errFn = (err,statusCode) => {
//                 jsonResponse.errorHandler(res, next, err,statusCode)
//             }

//             if (genericFunc.checkEmptyNull('userId', req.user.id, errFn) == true) return


//             const inputObject = [
//                 genericFunc.inputparams('userId', dataTypeEnum.varChar, req.user.id)
//             ]

//             sqlConnect.connectDb(req, errFn, procedureEnum.proc_getChallenge_Privacy, inputObject, errorEnum.proc_getChallenge_Privacy, async function (result) {
//                 if (result.length > 0) {
//                     if (result[0]) {
//                         let data = result[0]                     
//                         if (data[0]?.message === 'Success') {
                    
//                             response = {
//                                 'message': data.message,
//                                 // 'token': genericFunc.generateTokenLink(data),
//                                 'data': data
//                             }
//                             successFn(response);
//                         } else {
//                             response = {
//                                 'message': data.message
//                             }
//                             errFn(response,statusCode.StatusCodes.UNAUTHORIZED);
//                         }
//                     }
//                 }
//             })
//         }
//     }
// }


// module.exports = getPrivacyDB();
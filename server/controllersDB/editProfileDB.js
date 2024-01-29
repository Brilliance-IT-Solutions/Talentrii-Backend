const sqlConnect = require('../database/connection');
const genericFunc = require('../utility/genericFunctions');
const jsonResponse = require('../utility/jsonResponse')
const { dataTypeEnum, procedureEnum, errorEnum } = require('../database/databaseEnums');
const statusCode = require("http-status-codes")

const editProfileDB = () => {
    return {
        editProfileDB: async (req, res, next) => {
            const successFn = (result) => {
                jsonResponse.successHandler(res, next, result)
            }
            const errFn = (err,statusCode) => {
                jsonResponse.errorHandler(res, next, err,statusCode)
            }
            const inputObject = [
                genericFunc.inputparams('userId', dataTypeEnum.varChar, req.user.id),
                genericFunc.inputparams('firstName', dataTypeEnum.varChar, req.body?.firstName),
                genericFunc.inputparams('lastName', dataTypeEnum.varChar, req.body?.lastName),
                genericFunc.inputparams('userName', dataTypeEnum.varChar, req.body?.userName),
                genericFunc.inputparams('emailId', dataTypeEnum.varChar, req.body?.emailId),
                // genericFunc.inputparams('profileImage', dataTypeEnum.varChar, req.body?.profileImage),
                genericFunc.inputparams('contact', dataTypeEnum.varChar, req.body?.contact),
                genericFunc.inputparams('DOB', dataTypeEnum.varChar, req.body?.DOB)
            ]

            sqlConnect.connectDb(req, errFn, procedureEnum.proc_editProfile, inputObject, errorEnum.proc_editProfile, function (result) {
                if (result.length > 0) {
                    if (result[0][0]) {
                        let data = result[0][0]
                        if (data.message === 'profile updated successfully') {
                            let media = req.body.profileImage;
                            if (media.length > 0) {
                              media.forEach((element) => {
                                const inputObject2 = [
                                  genericFunc.inputparams(
                                    "userId",
                                    dataTypeEnum.varChar,
                                    req.user.id
                                  ),
                                  genericFunc.inputparams(
                                    "thumbnail_url",
                                    dataTypeEnum.varChar,
                                    element.thumbnailurl
                                  ),
                                  genericFunc.inputparams(
                                    "categoryId",
                                    dataTypeEnum.varChar,
                                    req.user.id
                                  ),
                                  genericFunc.inputparams(
                                    "original_url",
                                    dataTypeEnum.varChar,
                                    element.originalurl
                                  ),
                                  genericFunc.inputparams(
                                    "type",
                                    dataTypeEnum.varChar,
                                    element.type
                                  ),
                                  genericFunc.inputparams(
                                    "uploadCategory",
                                    dataTypeEnum.varChar,
                                    element.category
                                  ),
                                ];
          
                                sqlConnect.connectDb(
                                  req,
                                  errFn,
                                  procedureEnum.proc_upload_media,
                                  inputObject2,
                                  errorEnum.proc_upload_media,
                                  function (result) {
                                    if (result.length > 0) {
                                      if (result[0]) {
                                        let data = result[0];
                                        if (data[0].message === "Media uploaded") {
                                          response = {
                                            message: data[0].message,
                                            // 'token': genericFunc.generateTokenLink(data),
                                          };
                                        } else {
                                          response = {
                                            message: data[0].message,
                                          };
                                          errFn(
                                            response,
                                            statusCode.StatusCodes.UNSUPPORTED_MEDIA_TYPE
                                          );
                                        }
                                      }
                                    }
                                  }
                                );
                              });
                            }
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
module.exports = editProfileDB();
const sqlConnect = require('../../database/connection');
const genericFunc = require('../../utility/genericFunctions');
const jsonResponse = require('../../utility/jsonResponse')
const { dataTypeEnum, procedureEnum, errorEnum } = require('../../database/databaseEnums');
const statusCode = require("http-status-codes")
const {editProfileSchema} = require("../../schemas/userSchema")

const editProfileDB = () => {
    return {
        editProfileDB: async (req, res, next) => {
            const successFn = (result) => {
                jsonResponse.successHandler(res, next, result)
            }
            const errFn = (err,statusCode) => {
                jsonResponse.errorHandler(res, next, err,statusCode)
            }

            req.body.userId = req.user.id
            if(genericFunc.validator(req.body,editProfileSchema,errFn)== true)
            return;

            const inputObject = [
                genericFunc.inputparams('userId', dataTypeEnum.varChar, req.user.id),
                genericFunc.inputparams('firstName', dataTypeEnum.varChar, req.body?.firstName ?  req.body?.firstName : null),
                genericFunc.inputparams('lastName', dataTypeEnum.varChar, req.body?.lastName ? req.body?.lastName:null),
                genericFunc.inputparams('userName', dataTypeEnum.varChar, req.body?.userName ? req.body?.userName : null),
                genericFunc.inputparams('emailId', dataTypeEnum.varChar, req.body?.emailId ? req.body?.emailId : null),
                // genericFunc.inputparams('profileImage', dataTypeEnum.varChar, req.body?.profileImage),
                genericFunc.inputparams('contact', dataTypeEnum.varChar, req.body?.contact ? req.body?.contact : null),
                genericFunc.inputparams('DOB', dataTypeEnum.varChar, req.body?.DOB ? req.body?.DOB : null)
            ]

            sqlConnect.connectDb(req, errFn, procedureEnum.proc_editProfile, inputObject, errorEnum.proc_editProfile, function (result) {
                if (result.length > 0) {
                    if (result[0][0]) {
                        let data = result[0][0]
                        if (data.message === 'profile updated successfully') {
                            let media = req.body?.profileImage;
                            if (media?.length > 0) {
                              let count = 0;
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
                                    count++;
                                    if (count === media.length) {
                                    if (result.length > 0) {
                                      if (result[0]) {
                                        let dataMedia = result[0];
                                        if (dataMedia[0].message === "Media uploaded") {
                                          response = {
                                            message: data.message,
                                            "data":data
                                            
                                          };
                                          successFn(response);
                                        } else {
                                          response = {
                                            message: data.message,
                                          };
                                          errFn(
                                            response,
                                            statusCode.StatusCodes.UNSUPPORTED_MEDIA_TYPE
                                          );
                                        }
                                      }
                                    }
                                  }
                                  }
                                );
                              });
                            }else{

                              response = {
                                  'message': data.message,
                                  'data': data
                              }
                              successFn(response);
                            }
                        } 
                  
                    }
                }
            })
        }
    }
}
module.exports = editProfileDB();
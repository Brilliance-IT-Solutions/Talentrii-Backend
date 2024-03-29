const statusCode = require("http-status-codes");
const sqlConnect = require("../../database/connection");
const genericFunc = require("../../utility/genericFunctions");
const jsonResponse = require("../../utility/jsonResponse");
const {
  dataTypeEnum,
  procedureEnum,
  errorEnum,
} = require("../../database/databaseEnums");
const {createChallengeSchema} = require("../../schemas/createChallengeSchema");

const createChallangeDB = () => {
  return {
    createChallangeDB: async (req, res, next) => {
      const successFn = (result) => {
        jsonResponse.successHandler(res, next, result);
      };
      const errFn = (err, statusCode) => {
        jsonResponse.errorHandler(res, next, err, statusCode);
      };

      if(genericFunc.validator(req.body,createChallengeSchema,errFn) == true)
      return;
       
        const inputObject = [
          genericFunc.inputparams("userId", dataTypeEnum.varChar, req.user.id),
          genericFunc.inputparams(
            "title",
            dataTypeEnum.varChar,
            req.body.title
          ),
          genericFunc.inputparams(
            "description",
            dataTypeEnum.varChar,
            req.body.description
          ),
          // genericFunc.inputparams('url', dataTypeEnum.varChar, req.body.url),
          genericFunc.inputparams(
            "latitude",
            dataTypeEnum.decimal,
            req.body.latitude
          ),
          genericFunc.inputparams(
            "longitude",
            dataTypeEnum.decimal,
            req.body.longitude
          ),
          genericFunc.inputparams(
            "startDate",
            dataTypeEnum.date,
           req.body.startDate
          ),
          genericFunc.inputparams(
            "endDate",
            dataTypeEnum.date,
            req.body.endDate
          ),
          genericFunc.inputparams(
            "startTime",
            dataTypeEnum.date,
            req.body.startTime
          ),
          genericFunc.inputparams(
            "category",
            dataTypeEnum.varChar,
            req.body.category
          ),
          genericFunc.inputparams(
            "endTime",
            dataTypeEnum.date,
            req.body.endTime
          ),
          genericFunc.inputparams(
            "location",
            dataTypeEnum.varChar,
            req.body.location
          ),
          genericFunc.inputparams(
            "privacy",
            dataTypeEnum.varChar,
            req.body.privacy
          ),
          genericFunc.inputparams(
            "timerCounter",
            dataTypeEnum.varChar,
            req.body.timerCounter
          ),
          genericFunc.inputparams(
            "units",
            dataTypeEnum.varChar,
            req.body.units
          ),
          genericFunc.inputparams(
            "parentId",
            dataTypeEnum.int,
            req.body.parentId
          ),
        ];
        sqlConnect.connectDb(
          req,
          errFn,
          procedureEnum.proc_post_createChallange,
          inputObject,
          errorEnum.proc_post_createChallange,
          function (result) {
            if (result.length > 0) {
              if (result[0]) {
                let data = result[0];
                if (data[0].message === "Challange Created") {
                  let challengeId = result[1][0].challenge;
                  let media = req.body.url;
                  if (media.length > 0) {
                    let count = 0;
                    media.forEach((element) => {
                      const inputObject2 = [
                        genericFunc.inputparams(
                          "userId",
                          dataTypeEnum.int,
                          req.user.id
                        ),
                        genericFunc.inputparams(
                          "thumbnail_url",
                          dataTypeEnum.varChar,
                          element.thumbnailurl
                        ),
                        genericFunc.inputparams(
                          "categoryId",
                          dataTypeEnum.int,
                          challengeId
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
                        procedureEnum.proc_post_uploadMedia,
                        inputObject2,
                        errorEnum.proc_post_uploadMedia,
                        function (result) {
                          count++;
                          if (count === media.length) {
                          if (result.length > 0) {
                            if (result[0]) {
                              let dataMedia = result[0];
                              if (dataMedia[0].message === "Media uploaded") {
                                response = {
                                  message: data[0].message,
                                  "data" :  data[data.length - 1]
                                };
                                successFn(response);
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
                        }
                      );
                    });
                  }
                }
              }
            }
          }
        );
      }
  };
};
module.exports = createChallangeDB();

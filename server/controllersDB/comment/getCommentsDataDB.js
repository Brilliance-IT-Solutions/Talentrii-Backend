const statusCode = require("http-status-codes");
const sqlConnect = require("../../database/connection");
const genericFunc = require("../../utility/genericFunctions");
const jsonResponse = require("../../utility/jsonResponse");
const {
  dataTypeEnum,
  procedureEnum,
  errorEnum,
} = require("../../database/databaseEnums");
const { getCommentsByChallengeIdSchema } = require("../../schemas/commentSchema");

const getCommentsDataDB = () => {
  return {
    getCommentsDataDB: async (req, res, next) => {
      const page = req.query.page;
      const pageSize = req.query.pageSize;
      const startIdx = (page - 1) * pageSize;
      const successFn = (result) => {
        jsonResponse.successHandler(res, next, result);
      };
      const errFn = (err, statusCode) => {
        jsonResponse.errorHandler(res, next, err, statusCode);
      };

        req.query.userId = req.user.id
        if(genericFunc.validator(req.query,getCommentsByChallengeIdSchema,errFn)=== true)
        return;

      const inputObject = [
        genericFunc.inputparams("userId", dataTypeEnum.int, req.user.id),
        genericFunc.inputparams("challengeId", dataTypeEnum.int, req.query.challengeId),
        genericFunc.inputparams("startIdx", dataTypeEnum.varChar, startIdx),
        genericFunc.inputparams("pageSize", dataTypeEnum.varChar, pageSize),
      ];

      sqlConnect.connectDb(
        req,
        errFn,
        procedureEnum.proc_get_comments,
        inputObject,
        errorEnum.proc_get_comments,
        async function (result) {
          if (result.length > 0) {
            if (result[0]) {
              let data = result[0];
              if (data[0]?.message === "Success") {
               const response = {
                  "message": data.message,
                  data: result[0],
                  pagination:{totalCount:data[0].total_count,startIdx:startIdx,pageSize:pageSize}
                };

                successFn(response);
              } else {
                response = {
                  message: "No comments yet",
                };
                successFn(response);
              }
            }
          }
        }
      );
    },
  };
};

module.exports = getCommentsDataDB();

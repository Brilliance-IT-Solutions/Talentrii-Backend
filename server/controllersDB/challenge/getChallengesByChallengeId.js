const statusCode = require("http-status-codes");
const sqlConnect = require("../../database/connection");
const genericFunc = require("../../utility/genericFunctions");
const jsonResponse = require("../../utility/jsonResponse");
const {
  dataTypeEnum,
  procedureEnum,
  errorEnum,
} = require("../../database/databaseEnums");
const {getChallengeByChallengeIdSchema} = require("../../schemas/createChallengeSchema")

const getChallengeByChallengeId = () => {
  return {
    getChallengeByChallengeId: async (req, res, next) => {
      const successFn = (result) => {
        jsonResponse.successHandler(res, next, result);
      };
      const errFn = (err, statusCode) => {
        jsonResponse.errorHandler(res, next, err, statusCode);
      };

       req.query.userId = req.user.id
        if(genericFunc.validator(req.query,getChallengeByChallengeIdSchema,errFn) == true)
        return;

      const inputObject = [
        genericFunc.inputparams("userId", dataTypeEnum.varChar, req.user.id),
        genericFunc.inputparams("challengeId", dataTypeEnum.varChar, req.query.challengeId),
      ];

      sqlConnect.connectDb(
        req,
        errFn,
        procedureEnum.proc_get_challengeDetailByChallengeId,
        inputObject,
        errorEnum.proc_get_challengeDetailByChallengeId,
        async function (result) {
          if (result.length > 0) {
            if (result[0]) {
              let data = result[0]
              if (data[0]?.message === "Challenge Detail Success") {
                const response = {
                   message: data.message,
                   data: data[0]
                 };
                 successFn(response);
              } else {
                response = {
                  message: data.message,
                };
                errFn(response, statusCode.StatusCodes.UNAUTHORIZED);
              }
            }
          }
        }
      );
  }
  };
};

module.exports = getChallengeByChallengeId();

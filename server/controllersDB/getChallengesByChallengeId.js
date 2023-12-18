const statusCode = require("http-status-codes");
const sqlConnect = require("../database/connection");
const genericFunc = require("../utility/genericFunctions");
const jsonResponse = require("../utility/jsonResponse");
const {
  dataTypeEnum,
  procedureEnum,
  errorEnum,
} = require("../database/databaseEnums");

const getChallengeByChallengeId = () => {
  return {
    getChallengeByChallengeId: async (req, res, next) => {
        console.log(req.body)
      const successFn = (result) => {
        jsonResponse.successHandler(res, next, result);
      };
      const errFn = (err, statusCode) => {
        jsonResponse.errorHandler(res, next, err, statusCode);
      };

      if (genericFunc.checkEmptyNull("userId", req.user.id, errFn) == true)
        return;

      const inputObject = [
        genericFunc.inputparams("userId", dataTypeEnum.varChar, req.user.id),
        genericFunc.inputparams("challengeId", dataTypeEnum.varChar, req.body.challengeId),
      ];

      sqlConnect.connectDb(
        req,
        errFn,
        procedureEnum.proc_getChallenges_By_Id,
        inputObject,
        errorEnum.proc_getChallenges_By_Id,
        async function (result) {
          if (result.length > 0) {
            if (result[0] && result[1]) {
              let data = result[0];
              let data1 = result[1];

              if ((data[0]?.message === "Media Success") ||  (data1[0]?.message === "Comment Success")) {
                const newarray = await genericFunc.findDuplicates(result[0]);
                const newarray2 = await genericFunc.findDuplicates(result[1]);
              // Call the function
              const updatedNestedArray = genericFunc.includeCommentCount(newarray, newarray2);
 
              // Output the updated nestedArray
                const response = {
                   message: data.message,
                   data: updatedNestedArray,
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
    },
  };
};

module.exports = getChallengeByChallengeId();

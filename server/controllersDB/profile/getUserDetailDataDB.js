const statusCode = require("http-status-codes");
const sqlConnect = require("../../database/connection");
const genericFunc = require("../../utility/genericFunctions");
const jsonResponse = require("../../utility/jsonResponse");
const {
  dataTypeEnum,
  procedureEnum,
  errorEnum,
} = require("../../database/databaseEnums");
const { userIdSchema } = require("../../schemas/userIdSchema");

const getUserDetailDataDB = () => {
  return {
    getUserDetailDataDB: async (req, res, next) => {
      const successFn = (result) => {
        jsonResponse.successHandler(res, next, result);
      };
      const errFn = (err, statusCode) => {
        jsonResponse.errorHandler(res, next, err, statusCode);
      };

        if(genericFunc.validator(req.query,userIdSchema,errFn)== true)
        return;

      const inputObject = [
        genericFunc.inputparams("userId", dataTypeEnum.varChar, req.query.userId),
      ];

      sqlConnect.connectDb(
        req,
        errFn,
        procedureEnum.proc_getuser_detail,
        inputObject,
        errorEnum.proc_getuser_detail,
        async function (result) {
          if (result.length > 0) {
            if (result[0]) {
              let data = result[0];

              if ((data[0]?.message === "User Detail Success")) {

               const response = {
                  message: data.message,
                  data: data[0],
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



module.exports = getUserDetailDataDB();

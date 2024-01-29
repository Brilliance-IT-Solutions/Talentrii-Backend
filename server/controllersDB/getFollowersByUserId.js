const statusCode = require("http-status-codes");
const sqlConnect = require("../database/connection");
const genericFunc = require("../utility/genericFunctions");
const jsonResponse = require("../utility/jsonResponse");
const {
  dataTypeEnum,
  procedureEnum,
  errorEnum,
} = require("../database/databaseEnums");
const StatusCodes = require("http-status-codes");


const getFollowersByUserIdDataDB = () => {
  return {
    getFollowersByUserIdDataDB: async (req, res, next) => {
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 10;
      const type = req.query.type || "followers"
      const startIdx = (page - 1) * pageSize;
      const successFn = (result) => {
        jsonResponse.successHandler(res, next, result);
      };
      const errFn = (err, statusCode) => {
        jsonResponse.errorHandler(res, next, err, statusCode);
      };

      if (genericFunc.checkEmptyNull("userId", req.body.userId, errFn) == true)
        return;

      const inputObject = [
        genericFunc.inputparams(
          "userId",
          dataTypeEnum.varChar,
          req.body.userId
        ),
        genericFunc.inputparams("type", dataTypeEnum.varChar, type),
        genericFunc.inputparams("startIdx", dataTypeEnum.varChar, startIdx),
        genericFunc.inputparams("pageSize", dataTypeEnum.varChar, pageSize),
      ];

      sqlConnect.connectDb(
        req,
        errFn,
        procedureEnum.proc_getFollowers_By_UserId,
        inputObject,
        errorEnum.proc_getFollowers_By_UserId,
        async function (result) {
          if (result.length > 0) {
            if (result[0]) {
              let data = result[0];
              let data1 = result[1];
              if ((data[0].message = "Success")) {
                let response = {
                  message: "Success",
                  data: data1,
                  pagination: data[0],
                };
                successFn(response);
              } 
          } else {
            errFn(result, StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR);
          }
        }
      }
      )
    },
  };
};

module.exports = getFollowersByUserIdDataDB();

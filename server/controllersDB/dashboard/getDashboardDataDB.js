const statusCode = require("http-status-codes");
const sqlConnect = require("../../database/connection");
const genericFunc = require("../../utility/genericFunctions");
const jsonResponse = require("../../utility/jsonResponse");
const {
  dataTypeEnum,
  procedureEnum,
  errorEnum,
} = require("../../database/databaseEnums");
const { dashboardSchema } = require("../../schemas/getDashboardSchema");

const getDashboardDataDB = () => {
  return {
    getDashboardDataDB: async (req, res, next) => {
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
        if (genericFunc.validator(req.query, dashboardSchema, errFn) == true)
        return;

      const inputObject = [
        genericFunc.inputparams("userId", dataTypeEnum.varChar, req.user.id),
        genericFunc.inputparams("startIdx", dataTypeEnum.varChar, startIdx),
        genericFunc.inputparams("pageSize", dataTypeEnum.varChar, pageSize),
      ];

      sqlConnect.connectDb(
        req,
        errFn,
        procedureEnum.proc_get_dashboardData,
        inputObject,
        errorEnum.proc_get_dashboardData,
        async function (result) {
          if (result.length > 0) {
            if (result[0]) {
              let data = result[0];
              if (data[0].message === "Success") {
               const newarray = await genericFunc.MediaExtractor(result[0]);
               const response = {
                  message: data.message,
                  data: newarray,
                  pagination:{totalCount:data[0].totalCount,startIdx:startIdx,pageSize:pageSize}
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

module.exports = getDashboardDataDB();

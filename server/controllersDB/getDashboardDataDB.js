const statusCode = require("http-status-codes");
const sqlConnect = require("../database/connection");
const genericFunc = require("../utility/genericFunctions");
const jsonResponse = require("../utility/jsonResponse");
const {
  dataTypeEnum,
  procedureEnum,
  errorEnum,
} = require("../database/databaseEnums");

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

      if (genericFunc.checkEmptyNull("userId", req.user.id, errFn) == true)
        return;

      const inputObject = [
        genericFunc.inputparams("userId", dataTypeEnum.varChar, req.user.id),
        genericFunc.inputparams("startIdx", dataTypeEnum.varChar, startIdx),
        genericFunc.inputparams("pageSize", dataTypeEnum.varChar, pageSize),
      ];

      sqlConnect.connectDb(
        req,
        errFn,
        procedureEnum.proc_get_dashboard_data,
        inputObject,
        errorEnum.proc_get_dashboard_data,
        async function (result) {
          if (result.length > 0) {
            if (result[0]) {
              let data = result[0];
              let data2 = result[1];
              if (data2[0].message === "Success") {
               const newarray = await genericFunc.findDuplicates(result[1]);
              //  const newarray2 = await genericFunc.findDuplicates(result[1]);
            //  // Call the function
            //  const updatedNestedArray = genericFunc.includeCommentCount(newarray, newarray2);

             // Output the updated nestedArray
               const response = {
                  message: data.message,
                  data: newarray,
                  pagination:data[0]
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

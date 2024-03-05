const statusCode = require("http-status-codes");
const sqlConnect = require("../../server/database/connection");
const genericFunc = require("../../server/utility/genericFunctions");
const jsonResponse = require("../../server/utility/jsonResponse");
const {
  dataTypeEnum,
  procedureEnumAdmin,
  errorEnumAdmin,
} = require("../../server/database/databaseEnums");
const { getCountByDateSchema } = require("../schemas/UsersSchema");

const getUserCountByDate = () => {
  return {
    getUserCountByDate: async (req, res, next) => {
      const successFn = (result) => {
        jsonResponse.successHandler(res, next, result);
      };
      const errFn = (err, statusCode) => {
        jsonResponse.errorHandler(res, next, err, statusCode);
      };
       req.query.userId = req.user.id
        if(genericFunc.validator(req.query,getCountByDateSchema,errFn)== true)
        return;
      const inputObject = [
        genericFunc.inputparams("userId", dataTypeEnum.varChar, req.user.id),
        genericFunc.inputparams("startDate", dataTypeEnum.date, req.query.startDate),
        genericFunc.inputparams("endDate", dataTypeEnum.date, req.query.endDate),
      ];

      sqlConnect.connectDb(
        req,
        errFn,
        procedureEnumAdmin.proc_admin_get_countByUserDate,
        inputObject,
        errorEnumAdmin.proc_admin_get_countByUserDate,
        async function (result) {
          if (result.length > 0) {
            if (result[0]) {
              let data = result[0];

              if ((data[0]?.message === "User Success")) {

               const response = {
                  message: data.message,
                  data: data
                 
                };

                successFn(response);
              } else {
                response = {
                  message: data.message || 'No user Found',
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



module.exports = getUserCountByDate();

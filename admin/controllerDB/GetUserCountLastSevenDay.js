const statusCode = require("http-status-codes");
const sqlConnect = require("../../server/database/connection");
const genericFunc = require("../../server/utility/genericFunctions");
const jsonResponse = require("../../server/utility/jsonResponse");
const {
  dataTypeEnum,
  procedureEnumAdmin,
  errorEnumAdmin,
} = require("../../server/database/databaseEnums");
const { userIdSchema } = require("../../server/schemas/userIdSchema");

const getUserCountLastSevenDays = () => {
  return {
    getUserCountLastSevenDays: async (req, res, next) => {
      const successFn = (result) => {
        jsonResponse.successHandler(res, next, result);
      };
      const errFn = (err, statusCode) => {
        jsonResponse.errorHandler(res, next, err, statusCode);
      };
       req.query.userId = req.user.id
        if(genericFunc.validator(req.query,userIdSchema,errFn)== true)
        return;
      const inputObject = [
        genericFunc.inputparams("userId", dataTypeEnum.varChar, req.user.id),

      ];

      sqlConnect.connectDb(
        req,
        errFn,
        procedureEnumAdmin.proc_admin_get_lastSevenDayUser,
        inputObject,
        errorEnumAdmin.proc_admin_get_lastSevenDayUser,
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



module.exports = getUserCountLastSevenDays();

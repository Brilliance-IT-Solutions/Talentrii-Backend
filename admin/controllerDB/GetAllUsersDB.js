const statusCode = require("http-status-codes");
const sqlConnect = require("../../server/database/connection");
const genericFunc = require("../../server/utility/genericFunctions");
const jsonResponse = require("../../server/utility/jsonResponse");
const {
  dataTypeEnum,
  procedureEnumAdmin,
  errorEnumAdmin,
} = require("../../server/database/databaseEnums");
const { getAllUsersSchema } = require("../schemas/UsersSchema");

const getAllUserDataDB = () => {
  return {
    getAllUserDataDB: async (req, res, next) => {
        const page = req.query.page
        const pageSize = req.query.pageSize
        const startIdx = (page -1) * pageSize
      const successFn = (result) => {
        jsonResponse.successHandler(res, next, result);
      };
      const errFn = (err, statusCode) => {
        jsonResponse.errorHandler(res, next, err, statusCode);
      };

        if(genericFunc.validator(req.query,getAllUsersSchema,errFn)== true)
        return;

      const inputObject = [
        genericFunc.inputparams("userId", dataTypeEnum.varChar, req.query.userId),
        genericFunc.inputparams("startIdx", dataTypeEnum.varChar, startIdx),
        genericFunc.inputparams("pageSize", dataTypeEnum.varChar,pageSize),

      ];

      sqlConnect.connectDb(
        req,
        errFn,
        procedureEnumAdmin.proc_admin_get_allUser,
        inputObject,
        errorEnumAdmin.proc_admin_get_allUser,
        async function (result) {
          if (result.length > 0) {
            if (result[0]) {
              let data = result[0];

              if ((data[0]?.message === "Users Success")) {

               const response = {
                  message: data.message,
                  data: data,
                  pagination:{totalCount:data[0].totalCount,startIdx:startIdx,pageSize:pageSize}
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



module.exports = getAllUserDataDB();

const statusCode = require("http-status-codes");
const sqlConnect = require("../database/connection");
const genericFunc = require("../utility/genericFunctions");
const jsonResponse = require("../utility/jsonResponse");
const {
  dataTypeEnum,
  procedureEnum,
  errorEnum,
} = require("../database/databaseEnums");

const getMutualFriendsDataDB = () => {
  return {
    getMutualFriendsDataDB: async (req, res, next) => {
        console.log(req.body)
      const successFn = (result) => {
        jsonResponse.successHandler(res, next, result);
      };
      const errFn = (err, statusCode) => {
        jsonResponse.errorHandler(res, next, err, statusCode);
      };

      if (genericFunc.checkEmptyNull("userId", req.body.userId, errFn) == true)
        return;

      const inputObject = [
        genericFunc.inputparams("userId", dataTypeEnum.varChar, req.body.userId),
        genericFunc.inputparams("ids", dataTypeEnum.varChar, req.body.ids),
      ];

      sqlConnect.connectDb(
        req,
        errFn,
        procedureEnum.proc_mutualFriends,
        inputObject,
        errorEnum.proc_mutualFriends,
        async function (result) {
          if (result.length > 0) {
            if (result[0] && result[1]) {
              let data = result[0];
              let data1 = result[1];
             const resultResponse = await mutualFriends(data, data1)
             let response ={
              "message":"mutual Friends Success",
              "data":resultResponse
             }
                successFn(response);
              } else {
                response = {
                  message: data.message,
                };
                errFn(response, statusCode.StatusCodes.UNAUTHORIZED);
              }
            }
          })
        }
    }
};


async function  mutualFriends(loggedIn, Others){
  let mutualFriend = []
  loggedIn.forEach((item, index)=>{
    Others.forEach((data,i)=>{
      if(item.toUser === data.toUser){
        return mutualFriend.push(item)
      }else{
        return []
      }
    })
  })
  return mutualFriend
}
module.exports = getMutualFriendsDataDB();

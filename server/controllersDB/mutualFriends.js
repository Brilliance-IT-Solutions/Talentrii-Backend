const statusCode = require("http-status-codes");
const sqlConnect = require("../database/connection");
const genericFunc = require("../utility/genericFunctions");
const jsonResponse = require("../utility/jsonResponse");
const {
  dataTypeEnum,
  procedureEnum,
  errorEnum,
} = require("../database/databaseEnums");
const {userIdSchema} = require("../schemas/userIdSchema")


const getMutualFriendsDataDB = () => {
  return {
    getMutualFriendsDataDB: async (req, res, next) => {
      const successFn = (result) => {
        jsonResponse.successHandler(res, next, result);
      };
      const errFn = (err, statusCode) => {
        jsonResponse.errorHandler(res, next, err, statusCode);
      };

      if (genericFunc.checkEmptyNull("requestedByUserId", req.user.id, errFn) == true)
        return;

        if(genericFunc.validator(req.query,userIdSchema,errFn) == true)
        return;

      const inputObject = [
        genericFunc.inputparams("requestedByUserId", dataTypeEnum.varChar, req.user.id),
        genericFunc.inputparams("userId", dataTypeEnum.varChar, req.query.userId),
      ];

      sqlConnect.connectDb(
        req,
        errFn,
        procedureEnum.proc_mutualFriends,
        inputObject,
        errorEnum.proc_mutualFriends,
        async function (result) {
          if (result.length > 0) {
            if (result[0]) {
              let data = result[0];
               if(data && data.length > 0 && (data[0].message = "Mutual Friend Success")){
              //   let data = result[0];
              //   let data1 = result[1];
              //  const resultResponse = await mutualFriends(data, data1)
              //  let response ={
              //   "message":"mutual Friends Success",
              //   "data":resultResponse
              //  }

              // Map the array to create an array of strings
              const firstTwoImages = data.slice(0, 2);
              const firstTwoImage = firstTwoImages.map((obj) => ({
                key: obj.userProfile,
              }));
              // Display up to the first two objects
              const firstTwoObjects = data.slice(0, 2);
              const firstTwoStrings = firstTwoObjects.map(
                (obj) => `${obj.userName}`
              );

              // Display the count of remaining objects
              const remainingCount = Math.max(0, data.length - 2);
              const remainingString =
                remainingCount > 0 ? ` and ${remainingCount} others` : "";

              // Combine the strings
              const resultString = `${firstTwoStrings}${remainingString}`;

              let obj = {
                message: data[0].message,
                images: firstTwoImage,
                data: resultString ? `Followed By ${resultString}` : "",
              };

              successFn(obj);
            }else{
              response = {
                message: "No Mutual friends",
                data:[],
                images:[]
              };
              errFn(response, statusCode.StatusCodes.UNAUTHORIZED);
            }
            } else {
              response = {
                message: data.message,
              };
              errFn(response, statusCode.StatusCodes.UNAUTHORIZED);
            }
          }
        }
      );
    }
  };
};

async function mutualFriends(loggedIn, Others) {
  let mutualFriend = [];
  let users = [];
  loggedIn.forEach((item, index) => {
    Others.forEach((data, i) => {
      if (item.toUser === data.toUser) {
        const message = `${item.toUser}`;
        return mutualFriend.push(message);
      } else {
        return [];
      }
    });
  });
  return mutualFriend.length > 0 ? `Followed By ${mutualFriend}`: [];
}
module.exports = getMutualFriendsDataDB();
